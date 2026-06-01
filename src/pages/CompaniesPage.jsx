import { useState, useEffect } from 'react';
import { 
  Search, Building, MapPin, ChevronRight, Globe
} from 'lucide-react';
import { getEmpresas } from '../services/api';

export default function CompaniesPage({ onSelectCompany }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Todas');
  
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        setLoading(true);
        const data = await getEmpresas();
        setCompanies(data || []);
      } catch (err) {
        console.error(err); // Resolve o aviso de variável declarada e não utilizada
        setError('Não foi possível carregar as empresas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresas();
  }, []);

  const categories = ["Todas", "Tecnologia", "Design & Marketing", "Finanças"];

  const filteredCompanies = companies.filter(company => {
    const nomeEmpresa = company?.nome || '';
    const matchesSearch = nomeEmpresa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'Todas' || (company?.setor === filter);
    
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    if (!loading && !error) {
      if (filteredCompanies.length === 1) {
        setAnnouncement("1 empresa encontrada.");
      } else {
        setAnnouncement(`${filteredCompanies.length} empresas encontradas.`);
      }
    }

  }, [searchTerm, filter, loading, error, filteredCompanies.length, setAnnouncement]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] gap-3" role="status" aria-live="polite">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-600 font-bold text-sm">Carregando empresas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4" role="alert">
        <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center max-w-md w-full">
          <p className="text-red-600 font-black text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 animate-in fade-in duration-700 pb-20">

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <main className="max-w-7xl mx-auto p-4 md:p-10 space-y-8">
        
        <header className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Empresas Parceiras</h2>
          <p className="text-slate-500 font-medium text-sm md:text-base">Conheça as empresas de tecnologia e inovação integradas ao JobMatch.</p>
        </header>

        <section className="bg-white border border-slate-200 rounded-[32px] p-4 md:p-6 shadow-sm space-y-4 md:space-y-6" aria-label="Filtros de busca">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            <div className="md:col-span-12 relative flex items-center">
              <label htmlFor="search-input" className="sr-only">Pesquisar empresa por nome</label>
              <Search className="absolute left-5 text-slate-400" size={20} aria-hidden="true" />
              <input
                id="search-input"
                type="text"
                placeholder="Pesquisar por nome da empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-6 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all focus-visible:ring-4 focus-visible:ring-blue-500"
              />
            </div>

            <div className="md:col-span-12">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por setor de atuação">
                {categories.map((cat) => {
                  const isSelected = filter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      aria-pressed={isSelected}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 ${
                        isSelected
                          ? 'bg-[#0D1F3D] text-white shadow-md'
                          : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:grid-8" role="region" aria-label="Lista de empresas filtradas">
          {filteredCompanies.map((company) => {
            const iniciais = (company?.nome || 'EM').substring(0, 2).toUpperCase();
            
            return (
              <article 
                key={company.id} 
                className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 lg:hover:-translate-y-1 transition-all group relative overflow-hidden flex flex-col justify-between focus-within:ring-4 focus-within:ring-blue-500"
              >
                <div>
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl mb-6 border border-blue-100" aria-hidden="true">
                    {iniciais}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {company.nome}
                      </h3>
                      <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                        <MapPin size={12} aria-hidden="true" /> {company.localizacao || 'Fortaleza, CE'}
                      </p>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3">
                      {company.descricao || 'Nenhuma descrição fornecida por esta organização parceira no momento.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 mt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2.5 text-slate-500 text-xs font-semibold">
                    <Globe size={16} className="text-slate-400" aria-hidden="true" />
                    <span className="truncate">
                      <span className="sr-only">Site institucional:</span> {company.site || 'Não informado'}
                    </span>
                  </div>

                  <button 
                    onClick={() => onSelectCompany(company)}
                    aria-label={`Ver Perfil completo da empresa ${company.nome}`}
                    className="w-full bg-slate-50 group-hover:bg-[#0D1F3D] group-hover:text-white text-slate-600 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                  >
                    Ver Perfil da Empresa <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}

          {filteredCompanies.length === 0 && (
            <div className="col-span-full py-16 bg-white border border-slate-200 border-dashed rounded-[40px] text-center" role="status">
              <Building size={48} className="mx-auto text-slate-300 mb-4" aria-hidden="true" />
              <p className="text-slate-500 font-bold text-lg">Nenhuma empresa encontrada.</p>
              <p className="text-slate-400 text-sm mt-1">Tente mudar o termo digitado ou limpar os filtros selecionados.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}