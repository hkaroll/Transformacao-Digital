import { useState } from 'react';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import CompaniesPage from './pages/CompaniesPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import JobsPage from './pages/JobsPage'; // <--- Importação da nova página de Vagas
import Navbar from './components/Navbar';

export default function App() {
  const [view, setView] = useState('login');
  const [selectedCompany, setSelectedCompany] = useState(null); 
  
  // Dados do usuário logado (conectado ao seu perfil)
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
      
      {/* NAVBAR GLOBAL (Aparece em todas as telas pós-login) */}
      {view !== 'login' && (
        <Navbar 
          activeView={view} 
          onChangeView={setView} 
          onLogout={() => setView('login')}
          userName={user.nome}
        />
      )}

      {/* RENDERIZAÇÃO CONDICIONAL DAS TELAS */}
      <div className="animate-in fade-in duration-500">
        
        {/* 1. TELA DE LOGIN / CADASTRO */}
        {view === 'login' && (
          <AuthPage onLoginSuccess={handleLoginSuccess} />
        )}

        {/* 2. HOME / PERFIL DO USUÁRIO */}
        {(view === 'profile' || view === 'home') && (
          <ProfilePage userData={user} setUserData={setUser} onChangeView={setView} />
        )}

        {/* 3. PÁGINA DE MENSAGENS / CHAT */}
        {view === 'messages' && (
          <MessagesPage userData={user} onChangeView={setView} />
        )}

        {/* 4. LISTA DE EMPRESAS PARCEIRAS */}
        {view === 'empresas' && (
          <CompaniesPage onSelectCompany={(company) => {
            setSelectedCompany(company);
            setView('company-profile');
          }} />
        )}

        {/* 5. PERFIL DA EMPRESA SELECIONADA (Versão estável e limpa) */}
        {view === 'company-profile' && selectedCompany && (
          <CompanyProfilePage 
            company={selectedCompany} 
            onBack={() => setView('empresas')} 
          />
        )}

        {/* 6. PÁGINA DE VAGAS (Totalmente funcional com busca e filtros) */}
        {view === 'vagas' && (
          <JobsPage />
        )}

      </div>
    </main>
  );
}