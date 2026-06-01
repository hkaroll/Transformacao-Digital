import { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, MessageSquare, User, Home, Search, 
  Building, Bell, LogOut, MessageCircle, Eye, CheckCircle2, X 
} from 'lucide-react';

export default function Navbar({ activeView, onChangeView, onLogout, userName }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const notificationRef = useRef(null);
  const bellButtonRef = useRef(null);

  const navItems = [
    { icon: <Home size={20} aria-hidden="true" />, label: "Home", view: 'home' }, 
    { icon: <Search size={20} aria-hidden="true" />, label: "Vagas", view: 'vagas' },
    { icon: <Building size={20} aria-hidden="true" />, label: "Empresas", view: 'empresas' },
    { icon: <MessageSquare size={20} aria-hidden="true" />, label: "Mensagens", view: 'messages' },
    { icon: <User size={20} aria-hidden="true" />, label: "Perfil", view: 'profile' }, 
  ];

  const notifications = [
    { id: 1, title: "Mensagem do Recrutador", desc: "Tech Ceará enviou uma mensagem sobre a vaga de Estágio.", time: "10m atrás", icon: <MessageCircle size={14} className="text-blue-500" aria-hidden="true" />, bgIcon: "bg-blue-50" },
    { id: 2, title: "Perfil Visualizado", desc: "Uma empresa de Tecnologia de Fortaleza viu seu perfil.", time: "2h atrás", icon: <Eye size={14} className="text-purple-500" aria-hidden="true" />, bgIcon: "bg-purple-50" },
    { id: 3, title: "Inscrição Confirmada", desc: "Sua candidatura para Designer UI/UX foi recebida.", time: "1d atrás", icon: <CheckCircle2 size={14} className="text-emerald-500" aria-hidden="true" />, bgIcon: "bg-emerald-50" }
  ];

  // Fecha o modal ao clicar fora ou apertar ESC
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape' && showNotifications) {
        setShowNotifications(false);
        bellButtonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNotifications]);

  const toggleNotifications = () => {
    const nextState = !showNotifications;
    setShowNotifications(nextState);
    if (nextState) {
      setAnnouncement("Painel de notificações aberto. Você possui 3 novas notificações.");
    } else {
      setAnnouncement("Painel de notificações fechado.");
    }
  };

  return (
    <>
      {/* Região Invisível para Leitores de Tela */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* NAVBAR SUPERIOR (Topo fixo) */}
      <nav className="bg-[#0D1F3D] text-white sticky top-0 z-50 shadow-xl font-sans" aria-label="Navegação Principal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">

          {/* Logo / Botão Home */}
          <button 
            className="flex items-center gap-3 group cursor-pointer text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded-xl p-1" 
            onClick={() => onChangeView('home')}
            aria-label="JobMatch - Ir para a página inicial"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Briefcase size={22} className="text-white" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <span className="text-2xl font-black tracking-tighter">JobMatch</span>
          </button>

          {/* MENU DESKTOP (Invisível no Mobile/Tablet) */}
          <div className="hidden lg:flex items-center gap-1" role="menubar" aria-label="Menu Desktop">
            {navItems.map((item) => (
              <button
                key={item.label}
                role="menuitem"
                onClick={() => {
                  if (item.view) onChangeView(item.view);
                  setShowNotifications(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 ${
                  activeView === item.view 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          {/* ÁREA DE NOTIFICAÇÕES E USUÁRIO */}
          <div className="flex items-center gap-4 sm:gap-6 relative" ref={notificationRef}>

            {/* Botão de Notificações */}
            <button 
              ref={bellButtonRef}
              onClick={toggleNotifications}
              aria-haspopup="dialog"
              aria-expanded={showNotifications}
              aria-label="Notificações. Você tem novas mensagens."
              className={`relative cursor-pointer transition-all p-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded-xl ${showNotifications ? 'text-blue-400 bg-white/5' : 'text-slate-400 hover:text-blue-400'}`}
            >
              <Bell size={22} aria-hidden="true" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0D1F3D]"></div>
            </button>
            
            {/* Modal de Notificações Adaptivo */}
            {showNotifications && (
              <div 
                className="absolute right-0 lg:right-36 top-14 w-[calc(100vw-2rem)] sm:w-80 bg-white border border-slate-200 shadow-2xl rounded-2xl py-2 text-slate-800 z-50 animate-in fade-in zoom-in-95 duration-200"
                role="dialog"
                aria-label="Painel de Notificações"
              >
                <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-2xl">
                  <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Notificações</h2>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-[9px] font-black uppercase">Novas</span>
                    <button 
                      onClick={() => { setShowNotifications(false); bellButtonRef.current?.focus(); }}
                      aria-label="Fechar painel de notificações"
                      className="p-1 text-slate-400 hover:text-red-500 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      <X size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                
                <div className="max-h-64 overflow-y-auto" role="list">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="px-4 py-3 flex gap-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 focus-visible:bg-slate-50 focus-visible:outline-none" role="listitem" tabIndex={0}>
                      <div className={`w-8 h-8 rounded-lg ${notif.bgIcon} flex items-center justify-center shrink-0 mt-0.5`}>
                        {notif.icon}
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-xs font-bold text-slate-800 leading-tight">{notif.title}</h3>
                          <span className="text-[9px] text-slate-400 whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug font-medium">{notif.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Bloco do Usuário e Logout */}
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black leading-none max-w-[100px] truncate">{userName || "Usuário"}</p>
                <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mt-1">Online</p>
              </div>
              <button 
                onClick={onLogout} 
                className="p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500"
                title="Sair da Conta"
                aria-label="Sair da Conta"
              >
                <LogOut size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* NAVEGAÇÃO MOBILE INFERIOR (Apenas visível em telas menores que LG) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0D1F3D] border-t border-white/10 z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] safe-bottom" role="navigation" aria-label="Navegação Móvel">
        <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-2">
          {navItems.map((item) => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (item.view) onChangeView(item.view);
                  setShowNotifications(false);
                }}
                aria-label={`Ir para a tela ${item.label}`}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center flex-1 h-full py-1 gap-0.5 transition-all focus-visible:outline-none focus-visible:bg-white/5 ${
                  isActive 
                    ? 'text-blue-400 font-black' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-blue-500/10 text-blue-400' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-[9px] font-bold tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}