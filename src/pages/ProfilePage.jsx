import { useState, useEffect, useRef } from 'react';
import { 
  User, Mail, Phone, MapPin, Target, Zap, Star, 
  CheckCircle, Briefcase, GraduationCap, Award, 
  FileText, ChevronRight, Pencil, Save, X, Plus
} from 'lucide-react';

export default function ProfilePage({ userData, setUserData, onChangeView }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempData, setTempData] = useState(userData);
  const [newSkill, setNewSkill] = useState('');
  const [announcement, setAnnouncement] = useState(''); // Estado para anúncios via leitor de tela

  // Referências para gerenciar o foco (Focus Trap e Acessibilidade do Modal)
  const modalRef = useRef(null);
  const editButtonRef = useRef(null);

  // Anuncia mudanças dinâmicas para o leitor de tela (Aria Live Region)
  const triggerAnnouncement = (text) => {
    setAnnouncement(text);
    setTimeout(() => setAnnouncement(''), 1000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserData(tempData);
    setIsEditModalOpen(false);
    triggerAnnouncement("Alterações de perfil salvas com sucesso.");
    // Devolve o foco para o botão que abriu o modal
    setTimeout(() => editButtonRef.current?.focus(), 50);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    // Devolve o foco para o botão que abriu o modal
    setTimeout(() => editButtonRef.current?.focus(), 50);
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !tempData.habilidades.includes(newSkill.trim())) {
      const updatedSkills = [...tempData.habilidades, newSkill.trim()];
      setTempData({
        ...tempData,
        habilidades: updatedSkills
      });
      triggerAnnouncement(`Competência ${newSkill.trim()} adicionada com sucesso.`);
      setNewSkill('');
    } else if (tempData.habilidades.includes(newSkill.trim())) {
      triggerAnnouncement(`A competência ${newSkill.trim()} já existe na sua lista.`);
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = tempData.habilidades.filter(s => s !== skillToRemove);
    setTempData({
      ...tempData,
      habilidades: updatedSkills
    });
    triggerAnnouncement(`Competência ${skillToRemove} removida.`);
  };

  // Gerencia o fechamento por tecla ESC e o trava-foco (Focus Trap) dentro do modal
  useEffect(() => {
    if (!isEditModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { // Tab apenas
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Coloca o foco no primeiro input do modal ao abrir
    const firstInput = modalRef.current?.querySelector('input');
    setTimeout(() => firstInput?.focus(), 100);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEditModalOpen]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 animate-in fade-in duration-700 pb-20">
      
      {/* Região de anúncio dinâmico para acessibilidade de leitores de tela (invisível na tela) */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <main className="w-full" aria-label="Perfil do Candidato">
        
        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">

          {/* Banner de Identificação */}
          <div className="bg-[#0D1F3D] rounded-[48px] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
            
            <button 
              ref={editButtonRef}
              onClick={() => {setTempData(userData); setIsEditModalOpen(true);}} 
              aria-haspopup="dialog"
              className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer z-20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            >
              <Pencil size={14} aria-hidden="true" /> Editar Perfil
            </button>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="relative group">
                <div className="w-44 h-44 bg-white/5 rounded-[45px] backdrop-blur-xl border border-white/10 flex items-center justify-center p-2">
                    <div className="w-full h-full bg-slate-800 rounded-[38px] flex items-center justify-center overflow-hidden">
                       <User size={90} className="text-slate-600 mt-6" aria-hidden="true" />
                    </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-500 p-3 rounded-2xl border-4 border-[#0D1F3D] shadow-xl">
                  <Star size={20} className="fill-white" aria-hidden="true" />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left space-y-6">
                <div className="space-y-2">
                  <h2 className="text-5xl font-black tracking-tight">{userData.nome || "Novo Usuário"}</h2>
                  <p className="text-blue-400 font-bold text-xl uppercase tracking-wider">{userData.cargo}</p>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-2" role="list" aria-label="Informações de contato">
                  <span role="listitem" className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <MapPin size={16} className="text-blue-500" aria-hidden="true" /> <span><span className="sr-only">Localização:</span> {userData.localizacao}</span>
                  </span>
                  <span role="listitem" className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Mail size={16} className="text-blue-500" aria-hidden="true" /> <span><span className="sr-only">E-mail:</span> {userData.email}</span>
                  </span>
                  <span role="listitem" className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Phone size={16} className="text-blue-500" aria-hidden="true" /> <span><span className="sr-only">Telefone:</span> {userData.telefone || "Telefone não cadastrado"}</span>
                  </span>
                </div>

                <div className="max-w-md mx-auto lg:mx-0 space-y-3 pt-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span id="profile-strength-label">Força do Perfil</span>
                    <span className="text-blue-400" aria-live="polite">85% Completo</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden" role="progressbar" aria-labelledby="profile-strength-label" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
                    <div className="h-full bg-blue-500 w-[85%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Conteúdo Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm hover:shadow-md transition-shadow" aria-labelledby="bio-heading">
                <h3 id="bio-heading" className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Resumo Profissional</h3>
                <p className="text-slate-600 leading-relaxed text-lg font-medium italic">
                  "{userData.sobre || "Sua biografia ainda não foi preenchida. Conte um pouco sobre sua formação e seus objetivos de carreira."}"
                </p>
              </section>

              <section className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm" aria-labelledby="skills-heading">
                <div className="flex justify-between items-center mb-8">
                  <h3 id="skills-heading" className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Competências Chave</h3>
                  <Award size={20} className="text-slate-300" aria-hidden="true" />
                </div>
                <div className="flex flex-wrap gap-3" role="list" aria-label="Lista de competências">
                  {userData.habilidades && userData.habilidades.length > 0 ? (
                    userData.habilidades.map(skill => (
                      <div key={skill} role="listitem" className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl text-sm font-bold text-slate-700 flex items-center gap-2 hover:bg-blue-50 hover:border-blue-500 transition-all cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" tabIndex={0}>
                        <div className="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true"></div>
                        {skill}
                      </div>
                    ))
                  ) : (
                    <div className="w-full py-8 text-center border-2 border-dashed border-slate-100 rounded-[30px]" role="status">
                      <p className="text-slate-400 text-sm font-medium">Nenhuma habilidade adicionada ainda.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <section className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm" aria-labelledby="badges-heading">
                <h3 id="badges-heading" className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Conquistas</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Target className="text-blue-600" aria-hidden="true" />, label: "Foco", color: "bg-blue-50" },
                    { icon: <Zap className="text-amber-600" aria-hidden="true" />, label: "Agilidade", color: "bg-amber-50" },
                    { icon: <CheckCircle className="text-emerald-600" aria-hidden="true" />, label: "Verificado", color: "bg-emerald-50" },
                    { icon: <Star className="text-indigo-600" aria-hidden="true" />, label: "Premium", color: "bg-indigo-50" }
                  ].map((badge, i) => (
                    <div 
                      key={i} 
                      className={`${badge.color} p-6 rounded-[30px] flex flex-col items-center gap-3 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-help border border-transparent hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:opacity-100 focus-visible:grayscale-0`} 
                      title={`Medalha de ${badge.label}`}
                      tabIndex={0}
                      aria-label={`Conquista: ${badge.label}`}
                    >
                      {badge.icon}
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm space-y-3" aria-labelledby="actions-heading">
                <h3 id="actions-heading" className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Ações Rápidas</h3>
                {[
                  { label: "Experiências", icon: <Briefcase size={20} aria-hidden="true" />, color: "bg-indigo-50 text-indigo-600" },
                  { label: "Educação", icon: <GraduationCap size={20} aria-hidden="true" />, color: "bg-sky-50 text-sky-600" },
                  { label: "Certificados", icon: <Award size={20} aria-hidden="true" />, color: "bg-rose-50 text-rose-600" },
                  { label: "Currículo", icon: <FileText size={20} aria-hidden="true" />, color: "bg-slate-100 text-slate-600" }
                ].map((action, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-5 rounded-[30px] hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500">
                    <div className="flex items-center gap-4">
                      <div className={`${action.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>{action.icon}</div>
                      <span className="font-bold text-slate-700 text-sm">{action.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                  </button>
                ))}
              </section>
            </div>
          </div>
        </div>

        {/* Modal de Edição (Acessível e Tratado sem quebrar foco) */}
        {isEditModalOpen && (
          <div 
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0D1F3D]/80 backdrop-blur-md animate-in fade-in duration-300"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[50px] shadow-2xl flex flex-col">
              
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h3 id="modal-title" className="text-3xl font-black text-slate-800 tracking-tight">Editar Perfil</h3>
                  <p className="text-slate-500 font-medium">Mantenha seus dados atualizados.</p>
                </div>
                <button 
                  onClick={handleCloseModal} 
                  aria-label="Fechar modal de edição"
                  className="bg-slate-50 p-3 rounded-full text-slate-400 hover:text-red-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              {/* Todo o conteúdo de formulário agora usa a tag semântica correspondente */}
              <form onSubmit={handleSave} className="flex flex-col flex-1">
                <div className="p-10 space-y-10 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="input-nome" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nome Completo</label>
                      <input id="input-nome" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all focus-visible:ring-4 focus-visible:ring-blue-500" value={tempData.nome || ''} onChange={e => setTempData({...tempData, nome: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="input-cargo" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Cargo Atual</label>
                      <input id="input-cargo" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all focus-visible:ring-4 focus-visible:ring-blue-500" value={tempData.cargo || ''} onChange={e => setTempData({...tempData, cargo: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="input-telefone" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Telefone (WhatsApp)</label>
                      <input id="input-telefone" type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all focus-visible:ring-4 focus-visible:ring-blue-500" value={tempData.telefone || ''} onChange={e => setTempData({...tempData, telefone: e.target.value})} placeholder="(85) 99999-9999" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="input-localizacao" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Localização (Cidade, UF)</label>
                      <input id="input-localizacao" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all focus-visible:ring-4 focus-visible:ring-blue-500" value={tempData.localizacao || ''} onChange={e => setTempData({...tempData, localizacao: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="input-sobre" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Sobre Mim</label>
                    <textarea id="input-sobre" rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-[30px] p-6 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all focus-visible:ring-4 focus-visible:ring-blue-500" value={tempData.sobre || ''} onChange={e => setTempData({...tempData, sobre: e.target.value})} placeholder="Fale sobre sua experiência profissional..." />
                  </div>

                  {/* Campo de Hard Skills com tratativas extras de acessibilidade */}
                  <div className="space-y-4">
                    <label htmlFor="input-skills" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Hard Skills</label>
                    <div className="flex gap-3">
                      <input 
                        id="input-skills" 
                        type="text" 
                        value={newSkill} 
                        onChange={e => setNewSkill(e.target.value)} 
                        placeholder="Ex: React, Java, Figma..." 
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus-visible:ring-4 focus-visible:ring-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addSkill(e);
                          }
                        }}
                      />
                      <button 
                        type="button" 
                        onClick={addSkill}
                        className="bg-[#0D1F3D] text-white px-6 rounded-2xl hover:bg-blue-600 transition-all cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500" 
                        aria-label="Adicionar competência digitada"
                      >
                        <Plus aria-hidden="true"/>
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Suas competências em edição">
                      {tempData.habilidades && tempData.habilidades.map(skill => (
                        <div key={skill} role="listitem" className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                          {skill} 
                          <button 
                            type="button" 
                            aria-label={`Remover competência ${skill}`}
                            className="cursor-pointer hover:text-red-500 text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-md p-0.5" 
                            onClick={() => removeSkill(skill)}
                          >
                            <X size={14} aria-hidden="true" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rodapé de Ações do Form */}
                <div className="p-10 border-t border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 sticky bottom-0">
                  <button type="button" onClick={handleCloseModal} className="flex-1 py-4 text-slate-400 font-bold uppercase tracking-widest hover:bg-white rounded-2xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300">Descartar</button>
                  <button type="submit" className="flex-[2] bg-[#0D1F3D] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all cursor-pointer flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500">
                    <Save size={20} aria-hidden="true" /> Salvar Alterações
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}