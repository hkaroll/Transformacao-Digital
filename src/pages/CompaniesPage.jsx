import { useState } from 'react';
import { 
  Search, Building, MapPin, Users, Briefcase, 
  Star, ChevronRight, CheckCircle, Filter 
} from 'lucide-react';

export default function CompaniesPage({ onSelectCompany }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Todas');

  // Dados das Empresas
  const companies = [
    {
      id: 1,
      name: "Tech Innovators",
      sector: "Tecnologia",
      location: "São Paulo, SP",
      employees: "500-1000",
      jobs: 12,
      rating: 4.8,
      verified: true,
      description: "Líder em soluções de IA e desenvolvimento de software sob medida para o mercado global.",
      initials: "TI"
    },
    {
      id: 2,
      name: "Creative Studio",
      sector: "Design & Marketing",
      location: "Curitiba, PR",
      employees: "50-200",
      jobs: 5,
      rating: 4.9,
      verified: true,
      description: "Agência premiada focada em branding e experiência do usuário (UX) para startups.",
      initials: "CS"
    },
    {
      id: 3,
      name: "Finanças Pro",
      sector: "Finanças",
      location: "Rio de Janeiro, RJ",
      employees: "2000+",
      jobs: 28,
      rating: 4.5,
      verified: false,
      description: "Transformando o mercado financeiro com tecnologia de ponta e segurança bancária.",
      initials: "FP"
    },
    {
      id: 4,
      name: "Cloud Systems",
      sector: "Tecnologia",
      location: "Belo Horizonte, MG",
      employees: "300-500",
      jobs: 15,
      rating: 4.6,
      verified: true,
      description: "Especialistas em infraestrutura de nuvem, migração e segurança cibernética.",
      initials: "CL"
    },
    {
      id: 5,
      name: "Marketing Digital S.A",
      sector: "Design & Marketing",
      location: "Fortaleza, CE",
      employees: "100-300",
      jobs: 8,
      rating: 4.7,
      verified: true,
      description: "Estratégias de crescimento e tráfego pago para grandes e-commerces brasileiros.",
      initials: "MD"
    }
  ];

  const categories = ["Todas", "Tecnologia", "Design & Marketing", "Finanças"];

  // Filtro de busca e categoria
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'Todas' || company.sector === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 animate-in fade-in duration-700 pb-20">
      
      <main className="max-w-7xl mx-auto p-4 md:p-10 space-y-8">
        
        {/* CABEÇALHO E PESQUISA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter text-slate-800">Explorar Empresas</h1>
            <p className="text-slate-500 font-medium italic">Conecte-se com as melhores marcas empregadoras do mercado.</p>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Pesquisar pelo nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium"
            />
          </div>
        </div>

        {/* FILTROS DE CATEGORIA */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer ${
                filter === cat 
                ? 'bg-[#0D1F3D] text-white shadow-lg' 
                : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID DE EMPRESAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((company) => (
            <div 
              key={company.id} 
              className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
            >
              {/* Badge de Avaliação */}
              <div className="absolute top-6 right-6 flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-lg">
                <Star size={14} className="fill-amber-600" />
                <span className="text-xs font-black">{company.rating}</span>
              </div>

              {/* Logo / Iniciais */}
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl mb-6 border border-blue-100">
                {company.initials}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {company.name}
                    </h3>
                    {company.verified && <CheckCircle size={16} className="text-blue-500" />}
                  </div>
                  <p className="text-blue-500 text-xs font-bold uppercase tracking-widest">{company.sector}</p>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-2">
                  {company.description}
                </p>

                {/* Info Pills */}
                <div className="pt-4 border-t border-slate-50 space-y-3">
                  <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold">
                    <MapPin size={16} className="text-slate-300" /> {company.location}
                  </div>
                  <div className="flex items-center gap-3 text-emerald-600 text-xs font-bold bg-emerald-50 w-fit px-3 py-1.5 rounded-lg">
                    <Briefcase size={16} /> {company.jobs} vagas abertas
                  </div>
                </div>

                {/* BOTÃO DE AÇÃO */}
                <button 
                  onClick={() => onSelectCompany(company)}
                  className="w-full mt-4 bg-slate-50 group-hover:bg-[#0D1F3D] group-hover:text-white text-slate-600 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Ver Perfil da Empresa <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Caso não encontre nada */}
          {filteredCompanies.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <Building size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-500 font-bold">Nenhuma empresa encontrada para essa busca.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}