import { Briefcase, MessageSquare, User, Home, Search, Building, Bell, LogOut } from 'lucide-react';

export default function Navbar({ activeView, onChangeView, onLogout, userName }) {
  const navItems = [
  { icon: <Home size={18} />, label: "Home", view: 'home' }, // Mude para 'home'
  { icon: <Search size={18} />, label: "Vagas", view: 'vagas' },
  { icon: <Building size={18} />, label: "Empresas", view: 'empresas' },
  { icon: <MessageSquare size={18} />, label: "Mensagens", view: 'messages' },
  { icon: <User size={18} />, label: "Meu Perfil", view: 'profile' }, // Mantenha 'profile'
    ];

  return (
    <nav className="bg-[#0D1F3D] text-white sticky top-0 z-50 shadow-xl font-sans">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onChangeView('profile')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Briefcase size={22} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tighter">JobMatch</span>
        </div>

        {/* LINKS DE NAVEGAÇÃO CENTRALIZADOS */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => item.view && onChangeView(item.view)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeView === item.view 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {/* PERFIL E NOTIFICAÇÕES */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onChangeView('messages')}
            className="relative cursor-pointer text-slate-400 hover:text-blue-400 transition-all"
          >
            <Bell size={22} />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0D1F3D]"></div>
          </button>
          
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-black leading-none">{userName || "Usuário"}</p>
              <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mt-1">Status: Online</p>
            </div>
            <button 
              onClick={onLogout} 
              className="p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer"
              title="Sair da Conta"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}