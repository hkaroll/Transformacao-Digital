import { useState } from 'react';
import { 
  Briefcase, MapPin, Clock, DollarSign, Bookmark, 
  BookmarkCheck, ChevronRight, Rocket, Palette, Smartphone 
} from 'lucide-react';

// Adicionado o userName aqui nas propriedades recebidas
export default function HomePage({ userName, onChangeView }) {
  const [savedJobs, setSavedJobs] = useState({ 1: false, 2: true, 3: false });

  const metrics = [
    { label: "Candidaturas", count: 12, bg: "bg-blue-50/50", text: "text-[#0D1F3D]" },
    { label: "Entrevistas", count: 5, bg: "bg-purple-50/50", text: "text-purple-700" },
    { label: "Salvos", count: 23, bg: "bg-emerald-50/50", text: "text-emerald-700" },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: "Desenvolvedor Front-end Jr",
      company: "Tech Startup",
      location: "São Paulo, SP",
      contract: "CLT",
      sal: "R$ 3.000 - R$ 5.000",
      time: "2h atrás",
      icon: <Rocket size={22} className="text-blue-600" />,
      bgIcon: "bg-blue-50"
    },
    {
      id: 2,
      title: "Designer UI/UX Júnior",
      company: "Creative Agency",
      location: "Remoto",
      contract: "PJ",
      sal: "R$ 2.500 - R$ 4.000",
      time: "5h atrás",
      icon: <Palette size={22} className="text-amber-500" />,
      bgIcon: "bg-amber-50"
    },
    {
      id: 3,
      title: "Assistente de Marketing",
      company: "E-commerce Brasil",
      location: "Rio de Janeiro, RJ",
      contract: "CLT",
      sal: "R$ 2.000 - R$ 3.500",
      time: "1d atrás",
      icon: <Smartphone size={22} className="text-sky-500" />,
      bgIcon: "bg-sky-50"
    }
  ];

  const toggleSaveJob = (id) => {
    setSavedJobs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-in fade-in duration-500">
      
      {/* PAINEL SUPERIOR COMPACTADO */}
      <div className="bg-[#0D1F3D] pt-10 pb-24 px-6 md:px-12 rounded-b-[40px] shadow-md relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto space-y-1 relative z-10">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Painel do Candidato</span>
          {/* MUDANÇA AQUI: Renderiza o nome vindo do cadastro/login ou um nome padrão */}
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Olá, {userName || 'Candidato'}!
          </h1>
          <p className="text-slate-300 text-sm font-medium">Encontre sua próxima oportunidade de carreira no mercado.</p>
        </div>
      </div>

      {/* CONTEÚDO COM REPOSICIONAMENTO */}
      <main className="max-w-7xl mx-auto px-4 md:px-10 -mt-12 space-y-10 relative z-20">
        
        {/* CARDS DE MÉTRICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((m, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between px-6 group hover:border-blue-500/20 transition-all"
            >
              <div className="space-y-0.5 text-left">
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider block">{m.label}</span>
                <span className={`text-2xl font-bold ${m.text}`}>{m.count}</span>
              </div>
              <div className={`w-10 h-10 ${m.bg} rounded-xl flex items-center justify-center text-slate-400 opacity-90`}>
                <Briefcase size={18} className={m.text} />
              </div>
            </div>
          ))}
        </div>

        {/* SEÇÃO DE VAGAS EM DESTAQUE */}
        <div className="space-y-5 max-w-4xl">
          <div className="flex justify-between items-center px-1">
            <div className="space-y-0.5">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Vagas em Destaque</h2>
              <p className="text-xs text-slate-400 font-medium">Selecionadas com base no seu perfil de Desenvolvedora</p>
            </div>
            <button 
              onClick={() => onChangeView('vagas')}
              className="text-blue-600 font-bold text-xs uppercase tracking-wider hover:text-blue-700 flex items-center gap-1 cursor-pointer bg-blue-50/60 px-4 py-2 rounded-xl transition-all hover:bg-blue-100"
            >
              Ver todas <ChevronRight size={14} />
            </button>
          </div>

          {/* LISTAGEM DE CARDS */}
          <div className="grid grid-cols-1 gap-4">
            {featuredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 group"
              >
                <div className="flex gap-4 items-center">
                  <div className={`w-12 h-12 ${job.bgIcon} rounded-xl flex items-center justify-center shrink-0`}>
                    {job.icon}
                  </div>
                  
                  <div className="space-y-0.5">
                    <h3 className="text-base font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                      {job.company}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md text-[10px] font-medium flex items-center gap-1">
                        <MapPin size={11} className="text-slate-400" /> {job.location}
                      </span>
                      <span className="bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md text-[10px] font-medium">
                        {job.contract}
                      </span>
                      <span className="text-emerald-600 font-bold text-xs flex items-center gap-0.5 ml-1">
                        <DollarSign size={13} /> {job.sal}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between h-auto sm:h-16 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <button 
                    onClick={() => toggleSaveJob(job.id)}
                    className="text-slate-300 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {savedJobs[job.id] ? (
                      <BookmarkCheck size={20} className="text-blue-600" fill="currentColor" />
                    ) : (
                      <Bookmark size={20} />
                    )}
                  </button>
                  
                  <span className="text-slate-400 font-medium text-[11px] flex items-center gap-1">
                    <Clock size={11} /> {job.time}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}