import { useState } from 'react';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage'; 
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import CompaniesPage from './pages/CompaniesPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import JobsPage from './pages/JobsPage'; 
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
    setView('home'); 
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
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

        {view === 'home' && (
        <HomePage userName={user.nome} onChangeView={setView} />
        )}

        {/* SEPARADO: APENAS O PERFIL DO USUÁRIO */}
        {view === 'profile' && (
          <ProfilePage userData={user} setUserData={setUser} onChangeView={setView} />
        )}

        {/* MENSAGENS / CHAT */}
        {view === 'messages' && <MessagesPage userData={user} onChangeView={setView} />}

        {/* LISTA DE EMPRESAS */}
        {view === 'empresas' && (
          <CompaniesPage onSelectCompany={(company) => {
            setSelectedCompany(company);
            setView('company-profile');
          }} />
        )}

        {/* PERFIL DA EMPRESA SELECIONADA */}
        {view === 'company-profile' && (
          <CompanyProfilePage 
            company={selectedCompany} 
            onBack={() => setView('empresas')} 
          />
        )}

        {/* PÁGINA DE VAGAS */}
        {view === 'vagas' && (
          <JobsPage />
        )}
      </div>
    </main>
  );
}