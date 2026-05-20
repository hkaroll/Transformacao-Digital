import { useState } from 'react';
import { 
  Briefcase, MapPin, Clock, DollarSign, Bookmark, 
  BookmarkCheck, ChevronRight, Rocket, Palette, Smartphone 
} from 'lucide-react';

export default function HomePage({ userName, onChangeView }) {
  const [savedJobs, setSavedJobs] = useState({ 1: false, 2: true, 3: false });

  const metrics = [
    { label: "Candidaturas enviadas", count: 12, bg: "bg-blue-50/50", text: "text-[#0D1F3D]" },
    { label: "Entrevistas agendadas", count: 5, bg: "bg-purple-50/50", text: "text-purple-700" },
    { label: "Vagas salvas", count: 23, bg: "bg-emerald-50/50", text: "text-emerald-700" },
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
      icon: <Rocket size={22} className="text-blue-600" aria-hidden="true" />,
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
      icon: <Palette size={22} className="text-amber-500" aria-hidden="true" />,
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
      icon: <Smartphone size={22} className="text-sky-500" aria-hidden="true" />,
      bgIcon: "bg-sky-50"
    }
  ];

  const toggleSaveJob = (id) => {
    setSavedJobs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-in fade-in duration-500">
      
      <div className="bg-[#0D1F3D] pt-10 pb-24 px-6 md:px-12 rounded-b-[40px] shadow-md relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto space-y-1 relative z-10">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Painel do Candidato</span>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Olá, {userName || 'Candidato'}!
          </h1>
          <p className="text-slate-300 text-sm font-medium">Encontre sua próxima oportunidade de carreira no mercado.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-10 -mt-12 space-y-10 relative z-20">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="region" aria-label="Resumo de atividades">
          {metrics.map((m, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between px-6 group"
            >
              <div className="space-y-0.5 text-left">
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider block">{m.label}</span>
                <span className={`text-2xl font-bold ${m.text}`}>{m.count}</span>
              </div>
              <div className={`w-10 h-10 ${m.bg} rounded-xl flex items-center justify-center text-slate-400 opacity-90`} aria-hidden="true">
                <Briefcase size={18} className={m.text} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5 max-w-4xl" role="region" aria-label="Vagas em Destaque">
          <div className="flex justify-between items-center px-1">
            <div className="space-y-0.5">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Vagas em Destaque</h2>
              <p className="text-xs text-slate-400 font-medium">Selecionadas com base no seu perfil de Desenvolvedora</p>
            </div>
            <button 
              onClick={() => onChangeView('vagas')}
              className="text-blue-600 font-bold text-xs uppercase tracking-wider hover:text-blue-700 flex items-center gap-1 cursor-pointer bg-blue-50/60 px-4 py-2 rounded-xl transition-all hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Ver todas <span className="sr-only">as vagas disponíveis</span> <ChevronRight size={14} aria-hidden="true" />
            </button>
          </div>


          <div className="grid grid-cols-1 gap-4" role="list">
            {featuredJobs.map((job) => (
              <div 
                key={job.id} 
                role="listitem"
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
                        <MapPin size={11} className="text-slate-400" aria-hidden="true" /> 
                        <span className="sr-only">Localização:</span> {job.location}
                      </span>
                      <span className="bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md text-[10px] font-medium">
                        <span className="sr-only">Tipo de contratação:</span> {job.contract}
                      </span>
                      <span className="text-emerald-600 font-bold text-xs flex items-center gap-0.5 ml-1">
                        <DollarSign size={13} aria-hidden="true" /> 
                        <span className="sr-only">Salário estimado:</span> {job.sal}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between h-auto sm:h-16 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <button 
                    onClick={() => toggleSaveJob(job.id)}
                    className="text-slate-300 hover:text-blue-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-0.5"
                    aria-label={savedJobs[job.id] ? `Remover vaga de ${job.title} dos salvos` : `Salvar vaga de ${job.title}`}
                  >
                    {savedJobs[job.id] ? (
                      <BookmarkCheck size={20} className="text-blue-600" fill="currentColor" aria-hidden="true" />
                    ) : (
                      <Bookmark size={20} aria-hidden="true" />
                    )}
                  </button>
                  
                  <span className="text-slate-400 font-medium text-[11px] flex items-center gap-1">
                    <Clock size={11} aria-hidden="true" /> {job.time}
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