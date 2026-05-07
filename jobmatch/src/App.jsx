import { useState } from 'react';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  // Define se o usuário está na 'login' ou no 'profile'
  const [view, setView] = useState('login');
  
  // Estado que armazena os dados reais preenchidos no cadastro
  const [user, setUser] = useState({
    nome: '',
    email: '',
    cargo: 'Desenvolvedor em busca de oportunidades',
    telefone: '',
    localizacao: 'Fortaleza, CE', // Foco geográfico do projeto
    sobre: '',
    habilidades: []
  });

  // Função disparada após o sucesso no login ou cadastro
  const handleLoginSuccess = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
    setView('profile');
  };

  return (
    <main className="antialiased text-slate-900">
      {view === 'login' ? (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <ProfilePage 
          userData={user} 
          setUserData={setUser} 
          onLogout={() => setView('login')} 
        />
      )}
    </main>
  );
}