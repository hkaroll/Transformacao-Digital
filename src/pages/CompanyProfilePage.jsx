import { 
  ArrowLeft, MapPin, Globe, Star, CheckCircle, 
  Users, Briefcase, Info, Clock, 
  DollarSign, ShieldCheck 
} from 'lucide-react';

export default function CompanyProfilePage({ company, onBack }) {
  if (!company) return null;

  const iniciais = (company.nome || 'EM').substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-in slide-in-from-right duration-500 font-sans text-slate-900">
      
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded-xl px-2 py-1"
            aria-label="Voltar para a listagem de empresas"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" /> 
            Voltar para Empresas
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:inline">Ideal para começar</span>
            <ShieldCheck size={16} className="text-emerald-500" aria-hidden="true" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-4 md:p-10 space-y-8 md:space-y-10">
        
        <div className="bg-[#0D1F3D] rounded-[48px] p-6 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
              
              <div 
                className="w-32 h-32 md:w-44 md:h-44 shrink-0 bg-white rounded-[40px] flex items-center justify-center text-[#0D1F3D] font-black text-5xl md:text-6xl shadow-2xl border-8 border-white/5 uppercase"
                role="img"
                aria-label={`Logotipo ou iniciais da empresa ${company.nome}`}
              >
                {iniciais}
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 md:gap-4">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
                    {company.nome}
                  </h2>
                  <div className="bg-blue-500 text-white p-1.5 rounded-full shadow-lg shrink-0" title="Empresa Verificada pelo JobMatch">
                    <CheckCircle size={20} fill="white" className="text-blue-500" aria-hidden="true" />
                    <span className="sr-only">Empresa Verificada</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2.5 md:gap-3" role="list" aria-label="Metadados da Organização">
                  <span role="listitem" className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-300 bg-white/5 px-4 md:px-5 py-2 md:py-2.5 rounded-2xl border border-white/5 tracking-wider uppercase">
                    <MapPin size={16} className="text-blue-500" aria-hidden="true" /> <span className="sr-only">Sede em:</span> {company.localizacao || 'Fortaleza, CE'}
                  </span>
                  <span role="listitem" className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-300 bg-white/5 px-4 md:px-5 py-2 md:py-2.5 rounded-2xl border border-white/5 tracking-wider uppercase">
                    <Globe size={16} className="text-blue-500" aria-hidden="true" /> <span className="sr-only">Setor econômico:</span> {company.setor || 'Tecnologia'}
                  </span>
                </div>
              </div>
            </div>
            
            <button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 md:px-10 py-4 md:py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400">
              Seguir Empresa
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
          
          <div className="lg:col-span-8 space-y-6 md:space-y-10">
            
            <section className="bg-white rounded-[40px] p-6 md:p-10 border border-slate-200 shadow-sm" aria-labelledby="cultura-heading">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="p-3.5 bg-blue-50 rounded-2xl text-blue-600" aria-hidden="true"><Info size={24}/></div>
                <h3 id="cultura-heading" className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Cultura e Valores</h3>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium text-base md:text-lg italic">
                "{company.descricao || 'Informações institucionais em homologação.'} Acreditamos que o segredo do sucesso está no desenvolvimento contínuo dos nossos talentos."
              </p>
            </section>

            <section className="bg-white rounded-[40px] p-6 md:p-10 border border-slate-200 shadow-sm" aria-labelledby="vagas-heading">
              <h3 id="vagas-heading" className="text-xl md:text-2xl font-black text-slate-800 tracking-tight mb-6 md:mb-10 flex items-center gap-4">
                <div className="p-3.5 bg-emerald-50 rounded-2xl text-emerald-600" aria-hidden="true"><Briefcase size={24}/></div>
                Vagas para Iniciantes
              </h3>

              <div className="grid gap-4" role="list" aria-label="Lista de oportunidades disponíveis nesta empresa">
                {[
                  { id: 1, title: "Estágio em Desenvolvimento", sal: "R$ 1.200 - 1.600", type: "6h diárias" },
                  { id: 2, title: "Jovem Aprendiz Adm", sal: "R$ 850 - 1.100", type: "4h diárias" },
                  { id: 3, title: "Auxiliar Júnior", sal: "R$ 2.400 - 3.200", type: "CLT" }
                ].map((vaga) => (
                  <article key={vaga.id} className="p-5 md:p-6 border border-slate-100 rounded-[32px] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 hover:border-slate-200 transition-colors focus-within:ring-2 focus-within:ring-blue-500" role="listitem">
                    <div className="flex-1 space-y-2">
                      <h4 className="text-lg md:text-xl font-bold text-slate-800">{vaga.title}</h4>
                      <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                        <span className="flex items-center gap-1"><Clock size={14} aria-hidden="true"/> {vaga.type}</span>
                        <span className="flex items-center gap-1 text-emerald-600"><DollarSign size={14} aria-hidden="true"/> {vaga.sal}</span>
                      </div>
                    </div>
                    <button 
                      className="w-full md:w-auto bg-slate-100 text-slate-400 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-not-allowed"
                      aria-label={`Ver Detalhes da vaga ${vaga.title} (Inscrições suspensas provisoriamente)`}
                      disabled
                    >
                      Ver Detalhes
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <section className="bg-white rounded-[40px] p-6 md:p-10 border border-slate-200 shadow-sm" aria-labelledby="snapshot-heading">
              <h3 id="snapshot-heading" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 md:mb-10 text-center">Snapshot</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 md:gap-10">
              
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100" aria-hidden="true"><Users size={24}/></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Equipe</p>
                    <p className="text-lg md:text-xl font-black text-slate-800">15-500</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500" aria-hidden="true"><Star size={24} fill="currentColor"/></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Avaliação</p>
                    <p className="text-lg md:text-xl font-black text-slate-800">4.8</p>
                  </div>
                </div>

              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}