import { useState, useEffect, lazy, Suspense } from 'react';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';
import { getUsuarioLogado } from './services/api';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const MessagesPage = lazy(() => import('./pages/MessagesPage'));
const CompaniesPage = lazy(() => import('./pages/CompaniesPage'));
const CompanyProfilePage = lazy(() => import('./pages/CompanyProfilePage'));
const JobsPage = lazy(() => import('./pages/JobsPage'));

export default function App() {
  const [view, setView] = useState('login');
  const [user, setUser] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verificarSessaoEReceberDados = async () => {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        try {
          const userData = await getUsuarioLogado();
          setUser(userData);
          setView('home');
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          localStorage.removeItem('jwt_token'); 
          setView('login');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setView('login');
      }
    };

    verificarSessaoEReceberDados();
  }, []);

  const handleLoginSuccess = async () => {
    setIsLoading(true);
    try {
      const userData = await getUsuarioLogado();
      setUser(userData);
      setView('home');
    } catch (error) {
      console.error("Erro ao sincronizar login:", error);
      setView('login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
    setView('login');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {user && view !== 'login' && (
        <Navbar 
          activeView={view} 
          onChangeView={setView} 
          onLogout={handleLogout}
          userName={user.nome}
        />
      )}

      <Suspense fallback={
        <div className="w-full py-20 flex flex-col items-center justify-center font-sans">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">
              Otimizando Performance...
            </p>
          </div>
        </div>
      }>
        <div className="animate-in fade-in duration-500">
          {view === 'login' && <AuthPage onLoginSuccess={handleLoginSuccess} />}

          {user && view === 'home' && (
            <HomePage userName={user.nome} onChangeView={setView} />
          )}

          {user && view === 'profile' && (
            <ProfilePage userData={user} setUserData={setUser} onChangeView={setView} />
          )}

          {user && view === 'messages' && <MessagesPage userData={user} onChangeView={setView} />}

          {view === 'empresas' && (
            <CompaniesPage onSelectCompany={(company) => {
              setSelectedCompany(company);
              setView('company-profile');
            }} />
          )}

          {view === 'company-profile' && (
            <CompanyProfilePage 
              company={selectedCompany} 
              onBack={() => setView('empresas')} 
            />
          )}

          {view === 'vagas' && (
            <JobsPage />
          )}
        </div>
      </Suspense>
    </main>
  );
}