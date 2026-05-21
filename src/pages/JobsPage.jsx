import { useState, useEffect } from 'react';
import { 
  Search, Briefcase, MapPin, Clock, DollarSign, 
  Building, CheckCircle, Monitor, TrendingUp, Laptop,
  Users, ChevronDown, ChevronUp, Info, Award, Heart 
} from 'lucide-react';
import { getVagas, getVagasCompativeis, seCandidatar } from '../services/api'; // Importa seCandidatar

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('recomendadas'); // 'recomendadas' ou 'todas'
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null); 
  const [applyingJobId, setApplyingJobId] = useState(null); // Estado para controlar o loading do botão de candidatura

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = viewMode === 'recomendadas' 
          ? await getVagasCompativeis() 
          : await getVagas();
        setJobs(data);
      } catch (err) {
        setError('Não foi possível carregar as vagas. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [viewMode]); // Refaz a busca quando o viewMode muda

  const toggleExpand = (id) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  const handleCandidatura = async (jobId) => {
    setApplyingJobId(jobId); // Ativa o loading para o botão específico
    try {
      await seCandidatar(jobId);
      alert('Candidatura enviada com sucesso!');
      // Opcional: Atualizar o estado da vaga para indicar que o usuário já se candidatou
    } catch (err) {
      alert(`Erro ao se candidatar: ${err.message}`);
    } finally {
      setApplyingJobId(null); // Desativa o loading
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.empresa.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <main className="max-w-7xl mx-auto p-4 md:p-10 space-y-10">
        
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-slate-800 uppercase">Oportunidades Disponíveis</h1>
          <p className="text-slate-500 font-medium italic">Encontre a porta de entrada ideal para o mercado de trabalho.</p>
        </div>

        <div className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-6 justify-between items-center" role="search" aria-label="Filtros e Busca">
          
          <div className="relative w-full lg:w-96 group">
            <label htmlFor="job-search" className="sr-only">Pesquisar vaga por cargo ou empresa</label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} aria-hidden="true" />
            <input 
              id="job-search"
              type="text" 
              placeholder="Pesquisar cargo ou empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-700 focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>

          <div aria-live="polite" className="sr-only">
            {filteredJobs.length} vagas encontradas para a listagem atual.
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto" role="group" aria-label="Filtrar listagem por categoria">
            <button
                type="button"
                onClick={() => setViewMode('recomendadas')}
                aria-pressed={viewMode === 'recomendadas'}
                className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  viewMode === 'recomendadas' 
                    ? 'bg-[#0D1F3D] text-white border-[#0D1F3D] shadow-md' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                Vagas Recomendadas
              </button>
              <button
                type="button"
                onClick={() => setViewMode('todas')}
                aria-pressed={viewMode === 'todas'}
                className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  viewMode === 'todas' 
                    ? 'bg-[#0D1F3D] text-white border-[#0D1F3D] shadow-md' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                Todas as Vagas
              </button>
          </div>
        </div>

        {/* Removido o bloco de "Setores com mais contratações" para simplificar */}

        {loading ? (
          <div className="text-center py-20">Carregando vagas...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" role="list" aria-label="Vagas em destaque">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;
                const isApplying = applyingJobId === job.id;
                
                return (
                  <div 
                    key={job.id} 
                    role="listitem"
                    className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between border-l-4 border-l-blue-500 h-fit"
                  >
                    <div>

                      <div className="flex justify-between items-start gap-4 mb-6">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-[#0D1F3D] text-white rounded-2xl flex items-center justify-center font-black text-xl uppercase shadow-md" aria-hidden="true">
                            {job.empresa.nome.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 line-clamp-1">
                              {job.titulo}
                            </h3>
                            <p className="text-blue-500 text-xs font-black uppercase tracking-widest flex items-center gap-1.5 mt-1">
                              <Building size={14} aria-hidden="true" /> {job.empresa.nome}
                            </p>
                          </div>
                        </div>
                        
                        {/* Tipo de vaga (se houver) */}
                        {/* <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                          job.type === 'Estágio' ? 'bg-blue-50 text-blue-600' :
                          job.type === 'Jovem Aprendiz' ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          <span className="sr-only">Tipo de oportunidade:</span> {job.type}
                        </span> */}
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-50 py-4 mb-6">
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-tighter">
                          <MapPin size={16} className="text-slate-300" aria-hidden="true" />
                          <span className="text-slate-600 line-clamp-1"><span className="sr-only">Localização:</span> {job.localizacao}</span>
                        </div>
                        {/* Carga horária não está na API */}
                        {/* <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-tighter">
                          <Clock size={16} className="text-slate-300" aria-hidden="true" />
                          <span className="text-slate-600"><span className="sr-only">Carga horária:</span> {job.hours}</span>
                        </div> */}
                      </div>

                      {isExpanded && (
                        <div 
                          id={`job-details-panel-${job.id}`}
                          role="region"
                          aria-label={`Detalhes estendidos sobre a vaga de ${job.titulo}`}
                          className="space-y-6 pt-2 pb-6 border-b border-slate-100 mb-6 animate-in fade-in duration-300"
                        >
                          {/* Status extra (candidatos, modelo de trabalho - não na API) */}
                          {/* <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-2">
                              <Users size={16} className="text-slate-400" aria-hidden="true" />
                              <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase">Candidatos</p>
                                <p className="text-xs font-bold text-slate-700">{job.candidates}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Laptop size={16} className="text-slate-400" aria-hidden="true" />
                              <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase">Modelo de Trabalho</p>
                                <p className="text-xs font-bold text-slate-700">{job.isRemote}</p>
                              </div>
                            </div>
                          </div> */}

                          {/* Sobre a vaga */}
                          <div className="space-y-1.5">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Info size={14} className="text-blue-500" aria-hidden="true" /> Sobre a Vaga
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium italic">"{job.descricao}"</p>
                          </div>

                          {/* Requisitos */}
                          <div className="space-y-2">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Award size={14} className="text-purple-500" aria-hidden="true" /> Requisitos Básicos
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium italic">{job.requisitos}</p>
                          </div>

                          {/* Benefícios (não na API) */}
                          {/* <div className="space-y-2">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Heart size={14} className="text-red-500" aria-hidden="true" /> Benefícios
                            </h4>
                            <div className="flex flex-wrap gap-1.5" role="list" aria-label="Lista de Benefícios">
                              {job.benefits.map((benefit, index) => (
                                <span key={index} role="listitem" className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div> */}

                        </div>
                      )}
                    </div>

                    {/* Rodapé do Card */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-2">
                      {/* Salário (não na API) */}
                      {/* <div className="space-y-0.5">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bolsa / Salário</p>
                        <p className="text-lg font-black text-emerald-600 flex items-center gap-1">
                          <DollarSign size={18} aria-hidden="true" /> <span className="sr-only">Remuneração estimada:</span> {job.sal}
                        </p>
                      </div> */}
                      
                      <div className="flex gap-2">
                        <button 
                          type="button"
                          onClick={() => toggleExpand(job.id)}
                          aria-expanded={isExpanded}
                          aria-controls={`job-details-panel-${job.id}`}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-4 rounded-2xl font-black text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                          {isExpanded ? (
                            <>Ocultar <span className="sr-only">especificações de {job.titulo}</span> <ChevronUp size={14} aria-hidden="true" /></>
                          ) : (
                            <>Ver Descrição <span className="sr-only">completa sobre {job.titulo}</span> <ChevronDown size={14} aria-hidden="true" /></>
                          )}
                        </button>

                        <button 
                          type="button"
                          onClick={() => handleCandidatura(job.id)}
                          disabled={isApplying}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isApplying ? 'Candidatando...' : 'Quero a Vaga'} <span className="sr-only">para o cargo de {job.titulo} na empresa {job.empresa.nome}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20">Nenhuma vaga encontrada.</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}