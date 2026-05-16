import { useState } from 'react';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import CompaniesPage from './pages/CompaniesPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import Navbar from './components/Navbar';

export default function App() {
  const [view, setView] = useState('login');
  const [selectedCompany, setSelectedCompany] = useState(null); 
  
  const [user, setUser] = useState({
    nome: 'Karoll Reis',
    email: 'karoll@dev.com',
    cargo: 'DESENVOLVEDORA FRONT-END',
    telefone: '(85) 99999-9999',
    localizacao: 'Fortaleza, CE',
    sobre: 'Estudante de computação na UNIFOR.',
    habilidades: ['React', 'JavaScript', 'Tailwind CSS']
  });

  const handleLoginSuccess = (loginData) => {
    setUser((prev) => ({ ...prev, ...loginData }));
    setView('profile');
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Navbar Global */}
      {view !== 'login' && (
        <Navbar 
          activeView={view} 
          onChangeView={setView} 
          onLogout={() => setView('login')}
          userName={user.nome}
        />
      )}

      <div className="animate-in fade-in duration-500">
        {view === 'login' && <AuthPage onLoginSuccess={handleLoginSuccess} />}

        {/* Home / Perfil */}
        {(view === 'profile' || view === 'home') && (
          <ProfilePage userData={user} setUserData={setUser} onChangeView={setView} />
        )}

        {view === 'messages' && <MessagesPage userData={user} onChangeView={setView} />}

        {/* LISTA DE EMPRESAS */}
        {view === 'empresas' && (
          <CompaniesPage onSelectCompany={(company) => {
            setSelectedCompany(company);
            setView('company-profile');
          }} />
        )}

        {/* PERFIL DA EMPRESA (Voltando ao original) */}
        {view === 'company-profile' && (
          <CompanyProfilePage 
            company={selectedCompany} 
            onBack={() => setView('empresas')} 
          />
        )}

        {/* TELA DE VAGAS (Voltando ao placeholder original) */}
        {view === 'vagas' && (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400 text-center">
            <h2 className="text-2xl font-black uppercase tracking-widest text-slate-800">Página de Vagas</h2>
            <p className="font-medium mt-2">Em desenvolvimento pelo grupo UNIFOR...</p>
            <button 
              onClick={() => setView('profile')}
              className="mt-6 text-blue-600 font-bold hover:underline cursor-pointer"
            >
              Voltar para a Home
            </button>
          </div>
        )}
      </div>
    </main>
  );
}