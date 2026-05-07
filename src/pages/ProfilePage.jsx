import { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Target, Zap, Star, 
  CheckCircle, Briefcase, GraduationCap, Award, 
  FileText, ChevronRight, LogOut, Settings, Home, 
  Search, Building, MessageSquare, Bell, Pencil, Share, Save, X, Plus, Camera, LayoutGrid
} from 'lucide-react';

export default function ProfilePage({ userData, setUserData, onLogout }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempData, setTempData] = useState(userData);
  const [newSkill, setNewSkill] = useState('');

  // Função para salvar as alterações do Modal
  const handleSave = () => {
    setUserData(tempData);
    setIsEditModalOpen(false);
  };

  // Função para adicionar habilidades no Modal
  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !tempData.habilidades.includes(newSkill)) {
      setTempData({
        ...tempData,
        habilidades: [...tempData.habilidades, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 animate-in fade-in duration-700">
      
      {/* 1. SIDEBAR*/}
      <aside className="hidden lg:flex w-72 bg-[#0D1F3D] flex-col justify-between p-8 sticky top-0 h-screen border-r border-white/5">
        <div className="space-y-10">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Briefcase size={22} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">JobMatch</span>
          </div>

          <nav className="space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-4">Navegação</p>
            {[
              { icon: <LayoutGrid size={20} />, label: "Dashboard" },
              { icon: <Search size={20} />, label: "Vagas" },
              { icon: <Building size={20} />, label: "Empresas" },
              { icon: <MessageSquare size={20} />, label: "Mensagens" },
              { icon: <User size={20} />, label: "Meu Perfil", active: true },
            ].map((item, i) => (
              <button 
                key={i} 
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer group ${
                  item.active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Suporte</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">Dúvidas sobre o JobMatch? Entre em contato com nossa equipe UNIFOR.</p>
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 font-bold text-sm hover:text-red-400 transition-all cursor-pointer group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Sair da Conta
          </button>
        </div>
      </aside>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <main className="flex-1 lg:max-h-screen lg:overflow-y-auto">
        
        {/* Barra de Topo Superior */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Portal / <span className="text-slate-800 font-black">Meu Perfil Profissional</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <button 
              onClick={() => {setTempData(userData); setIsEditModalOpen(true);}} 
              className="bg-[#0D1F3D] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 cursor-pointer flex items-center gap-2"
            >
              <Pencil size={14}/> Editar Perfil
            </button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          
          {/* Card de Identidade*/}
          <div className="bg-[#0D1F3D] rounded-[48px] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="relative group">
                <div className="w-44 h-44 bg-white/5 rounded-[45px] backdrop-blur-xl border border-white/10 flex items-center justify-center p-2">
                   <div className="w-full h-full bg-slate-800 rounded-[38px] flex items-center justify-center overflow-hidden">
                      <User size={90} className="text-slate-600 mt-6" />
                   </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-500 p-3 rounded-2xl border-4 border-[#0D1F3D] shadow-xl">
                  <Star size={20} className="fill-white" />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left space-y-6">
                <div className="space-y-2">
                  <h2 className="text-5xl font-black tracking-tight">{userData.nome || "Novo Usuário"}</h2>
                  <p className="text-blue-400 font-bold text-xl uppercase tracking-wider">{userData.cargo}</p>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-2">
                  <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <MapPin size={16} className="text-blue-500" /> {userData.localizacao}
                  </span>
                  <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Mail size={16} className="text-blue-500" /> {userData.email}
                  </span>
                  <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Phone size={16} className="text-blue-500" /> {userData.telefone || "Telefone não cadastrado"}
                  </span>
                </div>

                {/* Força do Perfil */}
                <div className="max-w-md mx-auto lg:mx-0 space-y-3 pt-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Força do Perfil</span>
                    <span className="text-blue-400">85% Completo</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[85%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GRID DO CONTEÚDO PRINCIPAL */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Coluna Esquerda: Bio e Habilidades */}
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Resumo Profissional</h3>
                <p className="text-slate-600 leading-relaxed text-lg font-medium italic">
                  "{userData.sobre || "Sua biografia ainda não foi preenchida. Conte um pouco sobre sua formação e seus objetivos de carreira."}"
                </p>
              </section>

              <section className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Competências Chave</h3>
                  <Award size={20} className="text-slate-300" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {userData.habilidades.length > 0 ? (
                    userData.habilidades.map(skill => (
                      <div key={skill} className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl text-sm font-bold text-slate-700 flex items-center gap-2 hover:bg-blue-50 hover:border-blue-500 transition-all cursor-default">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {skill}
                      </div>
                    ))
                  ) : (
                    <div className="w-full py-8 text-center border-2 border-dashed border-slate-100 rounded-[30px]">
                      <p className="text-slate-400 text-sm font-medium">Nenhuma habilidade adicionada ainda.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Coluna Direita: Conquistas e Ações */}
            <div className="lg:col-span-4 space-y-8">
              <section className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Conquistas</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Target className="text-blue-600"/>, label: "Foco", color: "bg-blue-50" },
                    { icon: <Zap className="text-amber-600"/>, label: "Agilidade", color: "bg-amber-50" },
                    { icon: <CheckCircle className="text-emerald-600"/>, label: "Verificado", color: "bg-emerald-50" },
                    { icon: <Star className="text-indigo-600"/>, label: "Premium", color: "bg-indigo-50" }
                  ].map((badge, i) => (
                    <div key={i} className={`${badge.color} p-6 rounded-[30px] flex flex-col items-center gap-3 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-help border border-transparent hover:border-white`}>
                      {badge.icon}
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Ações Rápidas</h3>
                {[
                  { label: "Experiências", icon: <Briefcase size={20}/>, color: "bg-indigo-50 text-indigo-600" },
                  { label: "Educação", icon: <GraduationCap size={20}/>, color: "bg-sky-50 text-sky-600" },
                  { label: "Certificados", icon: <Award size={20}/>, color: "bg-rose-50 text-rose-600" },
                  { label: "Currículo", icon: <FileText size={20}/>, color: "bg-slate-100 text-slate-600" }
                ].map((action, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-5 rounded-[30px] hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`${action.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>{action.icon}</div>
                      <span className="font-bold text-slate-700 text-sm">{action.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </section>
            </div>
          </div>
        </div>

        {/* 3. MODAL DE EDIÇÃO */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0D1F3D]/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[50px] shadow-2xl flex flex-col">
              
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">Editar Perfil</h3>
                  <p className="text-slate-500 font-medium">Mantenha seus dados atualizados.</p>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="bg-slate-50 p-3 rounded-full text-slate-400 hover:text-red-500 transition-colors cursor-pointer"><X size={24}/></button>
              </div>

              <div className="p-10 space-y-10">
                {/* Inputs Básicos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nome Completo</label>
                    <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all" value={tempData.nome} onChange={e => setTempData({...tempData, nome: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Cargo Atual</label>
                    <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all" value={tempData.cargo} onChange={e => setTempData({...tempData, cargo: e.target.value})} />
                  </div>
                </div>

                {/* Contato e Localização */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Telefone (WhatsApp)</label>
                    <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all" value={tempData.telefone} onChange={e => setTempData({...tempData, telefone: e.target.value})} placeholder="(85) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Localização (Cidade, UF)</label>
                    <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all" value={tempData.localizacao} onChange={e => setTempData({...tempData, localizacao: e.target.value})} />
                  </div>
                </div>

                {/* Biografia */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Sobre Mim</label>
                  <textarea rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-[30px] p-6 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all" value={tempData.sobre} onChange={e => setTempData({...tempData, sobre: e.target.value})} placeholder="Fale sobre sua experiência profissional..." />
                </div>

                {/* Habilidades */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Hard Skills</label>
                  <form onSubmit={addSkill} className="flex gap-3">
                    <input type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Ex: React, Java, Figma..." className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500" />
                    <button type="submit" className="bg-[#0D1F3D] text-white px-6 rounded-2xl hover:bg-blue-600 transition-all cursor-pointer flex items-center justify-center"><Plus/></button>
                  </form>
                  <div className="flex flex-wrap gap-2">
                    {tempData.habilidades.map(skill => (
                      <div key={skill} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                        {skill} 
                        <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => setTempData({...tempData, habilidades: tempData.habilidades.filter(s => s !== skill)})}/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botões do Modal */}
              <div className="p-10 border-t border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 sticky bottom-0">
                <button onClick={() => setIsEditModalOpen(false)} className="flex-1 py-4 text-slate-400 font-bold uppercase tracking-widest hover:bg-white rounded-2xl transition-all cursor-pointer">Descartar</button>
                <button onClick={handleSave} className="flex-[2] bg-[#0D1F3D] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all cursor-pointer flex items-center justify-center gap-3">
                  <Save size={20}/> Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}