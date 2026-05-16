import { useState } from 'react';
import { 
  Search, Briefcase, MapPin, Clock, DollarSign, 
  Building, CheckCircle, Monitor, TrendingUp, Laptop,
  Users, ChevronDown, ChevronUp, Info, Award, Heart 
} from 'lucide-react';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [expandedJobId, setExpandedJobId] = useState(null); // Estado para controlar qual card está expandido

  // Banco de dados atualizado com todas as informações detalhadas por vaga
  const baseJobs = [
    { 
      id: 1, 
      title: "Estágio em Desenvolvimento Front-End", 
      company: "Tech Ceará", 
      location: "Fortaleza, CE", 
      sal: "R$ 1.200 - R$ 1.500", 
      type: "Estágio", 
      hours: "6h diárias", 
      initials: "TC",
      candidates: "28 pessoas",
      isRemote: "Híbrido (2x na semana no escritório)",
      about: "Buscamos um estudante apaixonado por transformar designs em código limpo. Você fará parte do nosso time de produto principal, trabalhando diretamente com React e Tailwind CSS.",
      responsibilities: [
        "Auxiliar no desenvolvimento de novas telas e componentes reutilizáveis",
        "Garantir a responsividade e a performance das interfaces web",
        "Participar de reuniões de alinhamento técnico com o time de design"
      ],
      requirements: [
        "Estar cursando Computação, Sistema de Informação ou áreas afins",
        "Conhecimento básico em HTML5, CSS3 e JavaScript (ES6)",
        "Noções ou muita vontade de aprender React"
      ],
      benefits: ["Bolsa Auxílio", "Vale Transporte", "Seguro de Vida", "Mentoria Técnica Semanal", "Acesso gratuito a plataformas de cursos"]
    },
    { 
      id: 2, 
      title: "Jovem Aprendiz Administrativo", 
      company: "Logística Nordeste", 
      location: "Maracanaú, CE", 
      sal: "R$ 850 - R$ 1.000", 
      type: "Jovem Aprendiz", 
      hours: "4h diárias", 
      initials: "LN",
      candidates: "14 pessoas",
      isRemote: "Presencial",
      about: "Oportunidade perfeita para quem quer entender como funciona a administração de uma grande empresa de logística. Não exigimos experiência anterior, apenas vontade de crescer.",
      responsibilities: [
        "Auxiliar na organização de documentos e arquivos digitais",
        "Preencher planilhas de controle interno",
        "Dar suporte no atendimento telefônico e direcionamento de e-mails"
      ],
      requirements: [
        "Ter entre 14 e 24 anos incompletos (conforme Lei do Aprendiz)",
        "Ensino Médio em curso ou concluído",
        "Conhecimento básico no Pacote Office (Word e Excel)"
      ],
      benefits: ["Salário Fixo proporcional", "Vale Transporte", "Férias coincidentes com o período escolar", "Curso de capacitação teórica no SENAC"]
    },
    { 
      id: 3, 
      title: "Desenvolvedor React Júnior", 
      company: "Inova Soft", 
      location: "Remoto", 
      sal: "R$ 2.500 - R$ 3.200", 
      type: "Júnior", 
      hours: "CLT (8h)", 
      initials: "IS",
      candidates: "42 pessoas",
      isRemote: "100% Remoto",
      about: "Procuramos um desenvolvedor júnior que já tenha pequenos projetos no GitHub para dar o próximo passo na carreira. Aqui você terá um padrinho sênior para acelerar seu aprendizado.",
      responsibilities: [
        "Codificar features de média complexidade utilizando React",
        "Escrever testes unitários básicos para garantir a estabilidade do código",
        "Identificar e corrigir bugs reportados pelos usuários"
      ],
      requirements: [
        "Domínio em JavaScript moderno e consumo de APIs REST",
        "Experiência prática em projetos pessoais ou acadêmicos com React",
        "Familiaridade essencial com Git e fluxos de Pull Request"
      ],
      benefits: ["Salário CLT", "Vale Refeição / Alimentação de R$ 35/dia", "Plano de Saúde Coparticipativo", "Auxílio Home Office (Internet/Luz)", "Day-off no aniversário"]
    },
    { 
      id: 4, 
      title: "Estágio em Suporte Técnico", 
      company: "NetFort", 
      location: "Fortaleza, CE", 
      sal: "R$ 1.000 - R$ 1.300", 
      type: "Estágio", 
      hours: "6h diárias", 
      initials: "NF",
      candidates: "19 pessoas",
      isRemote: "Presencial",
      about: "Se você gosta de infraestrutura, redes e contato com o público, essa vaga é para você. Atue ajudando nossos clientes corporativos a resolverem problemas de conexão.",
      responsibilities: [
        "Atendimento de primeiro nível para abertura de chamados técnicos",
        "Auxiliar na configuração de roteadores e switches no laboratório",
        "Monitorar a estabilidade dos links de internet dos clientes através do painel"
      ],
      requirements: [
        "Cursando Redes de Computadores, Telemática ou Engenharia",
        "Noções básicas de arquitetura de redes e modelo OSI",
        "Boa comunicação verbal e paciência para atendimento"
      ],
      benefits: ["Bolsa Estágio", "Vale Transporte", "Seguro de Vida", "Desconto de 50% na internet da empresa", "Cursos de certificação Cisco custeados"]
    }
  ];

  const toggleExpand = (id) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  const filteredJobs = baseJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'Todos' || job.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const sectors = [
    { name: "Tecnologia", icon: <Monitor size={20} />, count: "234 vagas" },
    { name: "Marketing", icon: <TrendingUp size={20} />, count: "187 vagas" },
    { name: "Design", icon: <Laptop size={20} />, count: "156 vagas" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <main className="max-w-7xl mx-auto p-4 md:p-10 space-y-10">
        
        {/* TÍTULO */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-slate-800 uppercase">Oportunidades Disponíveis</h1>
          <p className="text-slate-500 font-medium italic">Encontre a porta de entrada ideal para o mercado de trabalho.</p>
        </div>

        {/* BUSCA E FILTROS */}
        <div className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-6 justify-between items-center">
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Pesquisar cargo ou empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-700"
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            {['Todos', 'Estágio', 'Jovem Aprendiz', 'Júnior'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  activeFilter === filter 
                    ? 'bg-[#0D1F3D] text-white border-[#0D1F3D] shadow-md' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* SEÇÃO DE SETORES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sectors.map((s) => (
            <div 
              key={s.name}
              className="flex items-center gap-6 p-6 rounded-[32px] border bg-white text-slate-600 border-slate-100 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 text-blue-600">
                {s.icon}
              </div>
              <div className="text-left">
                <p className="font-bold text-lg text-slate-800">{s.name}</p>
                <p className="text-xs font-medium text-slate-400">{s.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* LISTAGEM EM GRID (MANTIDO EXATAMENTE IGUAL) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const isExpanded = expandedJobId === job.id;
              
              return (
                <div 
                  key={job.id} 
                  className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between border-l-4 border-l-blue-500 h-fit"
                >
                  <div>
                    {/* Topo do Card */}
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-[#0D1F3D] text-white rounded-2xl flex items-center justify-center font-black text-xl uppercase shadow-md">
                          {job.initials}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 line-clamp-1">
                            {job.title}
                          </h3>
                          <p className="text-blue-500 text-xs font-black uppercase tracking-widest flex items-center gap-1.5 mt-1">
                            <Building size={14} /> {job.company}
                          </p>
                        </div>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        job.type === 'Estágio' ? 'bg-blue-50 text-blue-600' :
                        job.type === 'Jovem Aprendiz' ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {job.type}
                      </span>
                    </div>

                    {/* Informações Básicas da Linha */}
                    <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-50 py-4 mb-6">
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-tighter">
                        <MapPin size={16} className="text-slate-300" />
                        <span className="text-slate-600 line-clamp-1">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-tighter">
                        <Clock size={16} className="text-slate-300" />
                        <span className="text-slate-600">{job.hours}</span>
                      </div>
                    </div>

                    {/* 🛠️ CONTEÚDO EXPANSÍVEL (Adicionado dinamicamente sem quebrar o layout) */}
                    {isExpanded && (
                      <div className="space-y-6 pt-2 pb-6 border-b border-slate-100 mb-6 animate-in fade-in duration-300">
                        
                        {/* Status extra pedido (Candidatos e se é Remoto) */}
                        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-slate-400" />
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase">Candidatos</p>
                              <p className="text-xs font-bold text-slate-700">{job.candidates}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Laptop size={16} className="text-slate-400" />
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase">Modelo de Trabalho</p>
                              <p className="text-xs font-bold text-slate-700">{job.isRemote}</p>
                            </div>
                          </div>
                        </div>

                        {/* Sobre a vaga */}
                        <div className="space-y-1.5">
                          <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Info size={14} className="text-blue-500" /> Sobre a Vaga
                          </h5>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium italic">"{job.about}"</p>
                        </div>

                        {/* Responsabilidades */}
                        <div className="space-y-2">
                          <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle size={14} className="text-emerald-500" /> Responsabilidades
                          </h5>
                          <ul className="space-y-1.5 pl-1">
                            {job.responsibilities.map((resp, index) => (
                              <li key={index} className="text-xs text-slate-600 font-medium flex items-start gap-2">
                                <span className="text-emerald-500 mt-0.5">•</span> {resp}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Requisitos */}
                        <div className="space-y-2">
                          <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Award size={14} className="text-purple-500" /> Requisitos Básicos
                          </h5>
                          <ul className="space-y-1.5 pl-1">
                            {job.requirements.map((req, index) => (
                              <li key={index} className="text-xs text-slate-600 font-medium flex items-start gap-2">
                                <span className="text-purple-500 mt-0.5">•</span> {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Benefícios */}
                        <div className="space-y-2">
                          <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Heart size={14} className="text-red-500" /> Benefícios
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {job.benefits.map((benefit, index) => (
                              <span key={index} className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* Rodapé do Card */}
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-2">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bolsa / Salário</p>
                      <p className="text-lg font-black text-emerald-600 flex items-center gap-1">
                        <DollarSign size={18} /> {job.sal}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      {/* Botão de alternar descrição */}
                      <button 
                        onClick={() => toggleExpand(job.id)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-4 rounded-2xl font-black text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>Ocultar <ChevronUp size={14} /></>
                        ) : (
                          <>Ver Descrição <ChevronDown size={14} /></>
                        )}
                      </button>

                      <button 
                        onClick={() => alert(`Candidatura enviada para a vaga: ${job.title}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        Quero a Vaga
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-1 lg:col-span-2 bg-white rounded-[40px] p-16 border border-slate-200 text-center space-y-4">
              <Briefcase size={48} className="mx-auto text-slate-300" />
              <h3 className="text-xl font-black text-slate-800 uppercase">Nenhuma vaga encontrada</h3>
              <p className="text-slate-500 font-medium max-w-md mx-auto">Não encontramos oportunidades correspondentes.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}