import { 
  ArrowLeft, MapPin, Globe, Star, CheckCircle, 
  Users, Briefcase, Info, ChevronRight, Clock, 
  DollarSign, ShieldCheck 
} from 'lucide-react';

export default function CompanyProfilePage({ company, onBack }) {
  // Caso não receba os dados da empresa (segurança)
  if (!company) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-in slide-in-from-right duration-500">
      
      {/* HEADER DE NAVEGAÇÃO */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-all cursor-pointer group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            Voltar para Empresas
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ideal para começar</span>
            <ShieldCheck size={16} className="text-emerald-500" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-4 md:p-10 space-y-10">
        
        {/* BANNER PRINCIPAL (HERO) */}
        <div className="bg-[#0D1F3D] rounded-[48px] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 md:w-44 md:h-44 bg-white rounded-[40px] flex items-center justify-center text-[#0D1F3D] font-black text-6xl shadow-2xl border-8 border-white/5 uppercase">
                {company.initials}
              </div>
              
              <div className="text-center md:text-left space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
                    {company.name}
                  </h2>
                  {company.verified && (
                    <div className="bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
                      <CheckCircle size={24} fill="white" className="text-blue-500" />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/5 tracking-wider uppercase">
                    <MapPin size={16} className="text-blue-500" /> {company.location}
                  </span>
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/5 tracking-wider uppercase">
                    <Globe size={16} className="text-blue-500" /> {company.sector}
                  </span>
                </div>
              </div>
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all cursor-pointer">
              Seguir Empresa
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-10">
            <section className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3.5 bg-blue-50 rounded-2xl text-blue-600"><Info size={24}/></div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Cultura e Valores</h3>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium text-lg italic">
                "{company.description} Acreditamos que o segredo do sucesso está no desenvolvimento contínuo dos nossos talentos."
              </p>
            </section>

            <section className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-10 flex items-center gap-4">
                <div className="p-3.5 bg-emerald-50 rounded-2xl text-emerald-600"><Briefcase size={24}/></div>
                Vagas para Iniciantes
              </h3>

              <div className="grid gap-4">
                {[
                  { id: 1, title: "Estágio em Desenvolvimento", sal: "R$ 1.200 - 1.600", type: "6h diárias" },
                  { id: 2, title: "Jovem Aprendiz Adm", sal: "R$ 850 - 1.100", type: "4h diárias" },
                  { id: 3, title: "Auxiliar Júnior", sal: "R$ 2.400 - 3.200", type: "CLT" }
                ].map((vaga) => (
                  <div key={vaga.id} className="p-6 border border-slate-100 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1 space-y-2">
                      <h4 className="text-xl font-bold text-slate-800">{vaga.title}</h4>
                      <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                        <span className="flex items-center gap-1"><Clock size={14}/> {vaga.type}</span>
                        <span className="flex items-center gap-1 text-emerald-600"><DollarSign size={14}/> {vaga.sal}</span>
                      </div>
                    </div>
                    <button className="bg-slate-100 text-slate-400 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-not-allowed">
                      Ver Detalhes
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <section className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10 text-center">Snapshot</h3>
              <div className="space-y-10">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100"><Users size={26}/></div>
                  <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Equipe</p><p className="text-xl font-black text-slate-800">{company.employees}+</p></div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500"><Star size={26} fill="currentColor"/></div>
                  <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Avaliação</p><p className="text-xl font-black text-slate-800">{company.rating}</p></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}