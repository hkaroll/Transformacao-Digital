import { useState } from 'react';
import { 
  Search, MapPin, Clock, DollarSign, 
  Building, ChevronDown, ChevronUp, Info, Award, Laptop
} from 'lucide-react';
import { seCandidatar } from '../services/api';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('recomendadas'); // 'recomendadas' ou 'todas'
  const [expandedJobId, setExpandedJobId] = useState(null); 
  const [applyingJobId, setApplyingJobId] = useState(null); 

  // MOCK SEGURO DE VAGAS FIXAS (Alinhado com a estrutura correta do JobMatch)
  const [jobs] = useState([
    {
      id: 1,
      titulo: "Estágio em Desenvolvimento Front-End",
      empresa: { nome: "Tech Ceará Inovações" },
      localizacao: "Fortaleza, CE",
      modalidade: "Híbrido",
      tipo: "Estágio (6h diárias)",
      salario: "R$ 1.400,00",
      descricao: "Auxiliar no desenvolvimento de interfaces modernas utilizando React e Tailwind CSS, participando de squads ágeis.",
      requisitos: "Estar cursando TI, Engenharia de Computação ou áreas afins; conhecimento básico em HTML, CSS e React.",
      recomendada: true
    },
    {
      id: 2,
      titulo: "Desenvolvedor Júnior Mobile (Kotlin)",
      empresa: { nome: "Sertão Dev" },
      localizacao: "Fortaleza, CE",
      modalidade: "Presencial",
      tipo: "Efetivo (CLT)",
      salario: "R$ 3.500,00",
      descricao: "Atuar na manutenção e criação de novas funcionalidades para aplicativos Android nativos, focando em arquitetura MVVM.",
      requisitos: "Conhecimento prático em Kotlin, Android Studio e consumo de APIs REST.",
      recomendada: true
    },
    {
      id: 3,
      titulo: "Jovem Aprendiz em Administração",
      empresa: { nome: "Jangada Bank" },
      localizacao: "Eusébio, CE",
      modalidade: "Presencial",
      tipo: "Jovem Aprendiz (4h diárias)",
      salario: "R$ 950,00",
      descricao: "Suporte na organização de documentos digitais, atendimento inicial e alimentação de planilhas de controle.",
      requisitos: "Ensino Médio em andamento ou concluído e conhecimento básico no Pacote Office.",
      recomendada: false
    },
    {
      id: 4,
      titulo: "Designer de Interface UI/UX Júnior",
      empresa: { nome: "Vanguard Studio" },
      localizacao: "Fortaleza, CE",
      modalidade: "Remoto",
      tipo: "Efetivo (CLT)",
      salario: "R$ 2.800,00",
      descricao: "Criação de wireframes, protótipos de alta fidelidade e fluxos de navegação focados em plataformas web e mobile.",
      requisitos: "Domínio de ferramentas de design (Figma) e portfólio demonstrando conceitos de UI/UX.",
      recomendada: false
    }
  ]);

  // Filtra as vagas baseado na aba ativa (Recomendadas ou Todas) e no input de busca
  const filteredJobs = jobs.filter(job => {
    const matchesTab = viewMode === 'todas' || job.recomendada;
    const matchesSearch = job.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.empresa.nome.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  const handleCandidatura = async (jobId) => {
    setApplyingJobId(jobId); 
    try {
      await seCandidatar(jobId);
      alert('Candidatura enviada com sucesso!');
    } catch (err) {
      alert(`Erro ao se candidatar: ${err.message || 'Serviço temporariamente indisponível'}`);
    } finally {
      setApplyingJobId(null); 
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans text-slate-900">
      <main className="max-w-7xl mx-auto p-4 md:p-10 space-y-10">
        
        {/* CABEÇALHO */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-slate-800 uppercase">Oportunidades Disponíveis</h1>
          <p className="text-slate-500 font-medium italic">Encontre a porta de entrada ideal para o mercado de trabalho.</p>
        </div>

        {/* FILTROS E PESQUISA */}
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
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-700 focus-visible:ring-2 focus-visible:ring-blue-500"
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

        {/* LISTA DE VAGAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" role="list" aria-label="Vagas em destaque">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const isExpanded = expandedJobId === job.id;
              const isApplying = applyingJobId === job.id;
              
              return (
                <div 
                  key={job.id} 
                  role="listitem"
                  className="bg-white border border-slate-200 rounded-[40px] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between border-l-4 border-l-blue-500 h-fit"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <div className="flex gap-4 min-w-0">
                        <div className="w-16 h-16 bg-[#0D1F3D] text-white rounded-2xl flex items-center justify-center font-black text-xl uppercase shadow-md shrink-0" aria-hidden="true">
                          {job.empresa.nome.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xl font-bold text-slate-800 truncate">
                            {job.titulo}
                          </h3>
                          <p className="text-blue-500 text-xs font-black uppercase tracking-widest flex items-center gap-1.5 mt-1 truncate">
                            <Building size={14} aria-hidden="true" /> {job.empresa.nome}
                          </p>
                        </div>
                      </div>
                      
                      <span className={`hidden sm:inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        job.tipo.includes('Estágio') ? 'bg-blue-50 text-blue-600' :
                        job.tipo.includes('Aprendiz') ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {job.modalidade}
                      </span>
                    </div>

                    {/* METADADOS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-b border-slate-50 py-4 mb-6">
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-tighter">
                        <MapPin size={16} className="text-slate-300" aria-hidden="true" />
                        <span className="text-slate-600 truncate"><span className="sr-only">Localização:</span> {job.localizacao}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-tighter">
                        <Clock size={16} className="text-slate-300" aria-hidden="true" />
                        <span className="text-slate-600 truncate"><span className="sr-only">Contrato:</span> {job.tipo}</span>
                      </div>
                    </div>

                    {/* PAINEL EXPANSÍVEL DE DETALHES */}
                    {isExpanded && (
                      <div 
                        id={`job-details-panel-${job.id}`}
                        role="region"
                        aria-label={`Detalhes estendidos sobre a vaga de ${job.titulo}`}
                        className="space-y-6 pt-2 pb-6 border-b border-slate-100 mb-6 animate-in fade-in duration-300"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2">
                            <Laptop size={16} className="text-slate-400" aria-hidden="true" />
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase">Regime</p>
                              <p className="text-xs font-bold text-slate-700">{job.modalidade}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-slate-400" aria-hidden="true" />
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase">Remuneração</p>
                              <p className="text-xs font-bold text-emerald-600">{job.salario}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Info size={14} className="text-blue-500" aria-hidden="true" /> Sobre a Vaga
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium italic">"{job.descricao}"</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Award size={14} className="text-purple-500" aria-hidden="true" /> Requisitos Básicos
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium italic">{job.requisitos}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* BOTÕES DE AÇÃO */}
                  <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 mt-4">
                    <button 
                      type="button"
                      onClick={() => toggleExpand(job.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`job-details-panel-${job.id}`}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {isExpanded ? 'Ocultar' : 'Ver Descrição'} {isExpanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
                    </button>

                    <button 
                      type="button"
                      onClick={() => handleCandidatura(job.id)}
                      disabled={isApplying}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isApplying ? 'Candidatando...' : 'Quero a Vaga'}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 text-slate-400 font-bold">Nenhuma vaga encontrada.</div>
          )}
        </div>
      </main>
    </div>
  );
}