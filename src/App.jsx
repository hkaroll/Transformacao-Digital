import { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage'; 
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import CompaniesPage from './pages/CompaniesPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import JobsPage from './pages/JobsPage'; 
import Navbar from './components/Navbar';
import { getUsuarioLogado } from './services/api';

export default function App() {
  const [view, setView] = useState('login');
  const [user, setUser] = useState(null); // Começa como nulo
  const [selectedCompany, setSelectedCompany] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento inicial

  // Efeito para verificar o token ao carregar a aplicação
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      fetchUserData();
    } else {
      setIsLoading(false);
      setView('login');
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await getUsuarioLogado();
      setUser(userData);
      setView('home');
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      localStorage.removeItem('jwt_token'); // Token inválido, limpa
      setView('login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoading(true);
    fetchUserData();
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
    </main>
  );
}