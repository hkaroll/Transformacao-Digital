import { useState, useEffect } from 'react';
import { 
  Search, Building, MapPin, Briefcase, 
  Star, ChevronRight, CheckCircle
} from 'lucide-react';
import { getEmpresas } from '../services/api';

export default function CompaniesPage({ onSelectCompany }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Todas');
  
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        setLoading(true);
        const data = await getEmpresas();
        setCompanies(data);
      } catch (err) {
        setError('Não foi possível carregar as empresas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresas();
  }, []);

  const categories = ["Todas", "Tecnologia", "Design & Marketing", "Finanças"];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    // O filtro de setor precisará ser ajustado se o campo não existir na API
    // const matchesFilter = filter === 'Todas' || company.sector === filter;
    return matchesSearch;
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando empresas...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 animate-in fade-in duration-700 pb-20">
      <main className="max-w-7xl mx-auto p-4 md:p-10 space-y-8">
        
        {/* ... (cabeçalho e filtros sem alterações) ... */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((company) => (
            <div 
              key={company.id} 
              className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
            >
              {/* ... (UI do card, adaptada para os dados da API) ... */}
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl mb-6 border border-blue-100">
                {company.nome.substring(0, 2).toUpperCase()}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {company.nome}
                  </h3>
                  <p className="text-blue-500 text-xs font-bold uppercase tracking-widest">{company.localizacao}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-2">
                  {company.descricao}
                </p>
                <div className="pt-4 border-t border-slate-50 space-y-3">
                  <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold">
                    <MapPin size={16} className="text-slate-300" /> {company.site || 'Não informado'}
                  </div>
                </div>
                <button 
                  onClick={() => onSelectCompany(company)}
                  className="w-full mt-4 bg-slate-50 group-hover:bg-[#0D1F3D] group-hover:text-white text-slate-600 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Ver Perfil da Empresa <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
          {filteredCompanies.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <Building size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-500 font-bold">Nenhuma empresa encontrada.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}