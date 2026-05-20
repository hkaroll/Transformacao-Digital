import { useState, useEffect, useRef } from 'react';
import { Briefcase, MessageSquare, User, Home, Search, Building, Bell, LogOut, MessageCircle, Eye, CheckCircle2 } from 'lucide-react';

export default function Navbar({ activeView, onChangeView, onLogout, userName }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const navItems = [
    { icon: <Home size={18} />, label: "Home", view: 'home' }, 
    { icon: <Search size={18} />, label: "Vagas", view: 'vagas' },
    { icon: <Building size={18} />, label: "Empresas", view: 'empresas' },
    { icon: <MessageSquare size={18} />, label: "Mensagens", view: 'messages' },
    { icon: <User size={18} />, label: "Meu Perfil", view: 'profile' }, 
  ];

  const notifications = [
    { id: 1, title: "Mensagem do Recrutador", desc: "Tech Ceará enviou uma mensagem sobre a vaga de Estágio.", time: "10m atrás", icon: <MessageCircle size={14} className="text-blue-500" />, bgIcon: "bg-blue-50" },
    { id: 2, title: "Perfil Visualizado", desc: "Uma empresa de Tecnologia de Fortaleza viu seu perfil.", time: "2h atrás", icon: <Eye size={14} className="text-purple-500" />, bgIcon: "bg-purple-50" },
    { id: 3, title: "Inscrição Confirmada", desc: "Sua candidatura para Designer UI/UX foi recebida.", time: "1d atrás", icon: <CheckCircle2 size={14} className="text-emerald-500" />, bgIcon: "bg-emerald-50" }
  ];

  // Fecha as notificações se clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              onClick={() => {
                if (item.view) onChangeView(item.view);
                setShowNotifications(false);
              }}
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
        <div className="flex items-center gap-6 relative" ref={notificationRef}>
          
          {/* MUDANÇA: botão modificado apenas no onClick para abrir o painel */}
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative cursor-pointer transition-all ${showNotifications ? 'text-blue-400' : 'text-slate-400 hover:text-blue-400'}`}
          >
            <Bell size={22} />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0D1F3D]"></div>
          </button>
          
          {/* PAINEL FLUTUANTE ADICIONADO SEM AFETAR O NAVBAR */}
          {showNotifications && (
            <div className="absolute right-36 top-10 w-80 bg-white border border-slate-200 shadow-2xl rounded-2xl py-2 text-slate-800 z-50 animate-in fade-in duration-200">
              <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Notificações</span>
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-[9px] font-black uppercase">Novas</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="px-4 py-3 flex gap-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                    <div className={`w-8 h-8 rounded-lg ${notif.bgIcon} flex items-center justify-center shrink-0 mt-0.5`}>
                      {notif.icon}
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-slate-800 leading-tight">{notif.title}</h4>
                        <span className="text-[9px] text-slate-400 whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug font-medium">{notif.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
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