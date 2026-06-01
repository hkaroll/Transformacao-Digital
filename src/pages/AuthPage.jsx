import { useState, useEffect, useRef } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, Briefcase, 
  CheckCircle2
} from 'lucide-react';
import { login, register } from '../services/api';

export default function AuthPage({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('entrar'); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [regFormData, setRegFormData] = useState({ nome: '', email: '', senha: '' });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const errorRef = useRef(null);

  useEffect(() => {
    if (error) {
      errorRef.current?.focus();
    }
  }, [error]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem('jwt_token', data.accessToken);
      onLoginSuccess(); 
    } catch (err) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(regFormData);
      const data = await login(regFormData.email, regFormData.senha);
      localStorage.setItem('jwt_token', data.accessToken);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Ocorreu um erro no cadastro.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegFormChange = (e) => {
    setRegFormData({ ...regFormData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans m-0 p-0 relative overflow-x-hidden bg-[#0D1F3D] md:bg-slate-50">
      
      <section className="hidden md:flex md:w-1/2 bg-[#0D1F3D] p-12 lg:p-16 flex-col justify-between text-white relative shrink-0">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" aria-hidden="true"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg" aria-hidden="true">
              <Briefcase size={22} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter">JobMatch</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-8 tracking-tight">
            Conectando talentos às melhores empresas.
          </h2>
          <ul className="space-y-5" aria-label="Benefícios do JobMatch">
            {["Vagas personalizadas para seu perfil", "Conexão direta com recrutadores", "Gestão de carreira simplificada"].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                <CheckCircle2 className="text-blue-400 shrink-0" size={20} aria-hidden="true" /> {text}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="relative z-10 border-t border-slate-700/60 pt-6 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          UNIFOR • 2026
        </div>
      </section>

      <section className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 md:p-12 py-12 min-h-screen relative overflow-hidden bg-[#0D1F3D] md:bg-slate-50">
        
        <div className="absolute top-[-20%] left-[-20%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl md:hidden" aria-hidden="true"></div>
        
        <div className="w-full max-w-[400px] animate-in fade-in zoom-in-95 duration-500 flex flex-col my-auto py-4 relative z-10"> 
          
          <div className="flex items-center justify-center gap-2 mb-8 md:hidden">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg" aria-hidden="true">
              <Briefcase size={18} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">JobMatch</span>
          </div>

          <div className="bg-white h-fit p-6 sm:p-8 rounded-[32px] shadow-2xl md:shadow-xl shadow-black/20 md:shadow-slate-200/60 border border-slate-100/80 mx-1">

            <div className="mb-6 text-center md:text-left">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                {activeTab === 'entrar' ? 'Acesse sua conta' : 'Crie sua conta'}
              </h3>
              <p className="text-slate-500 mt-1.5 text-xs font-medium">
                {activeTab === 'entrar' ? 'Informe seus dados de acesso abaixo.' : 'Preencha os dados para começar.'}
              </p>
            </div>

            <nav className="flex gap-6 border-b border-slate-100 mb-8" role="tablist" aria-label="Opções de autenticação">
              {['entrar', 'cadastrar'].map((tab) => {
                const isSelected = activeTab === tab;
                return (
                  <button 
                    key={tab} 
                    type="button" 
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`${tab}-panel`}
                    onClick={() => {setActiveTab(tab); setError(null);}} 
                    className={`pb-3 text-xs font-black uppercase tracking-widest transition-all relative cursor-pointer focus-visible:outline-none focus-visible:text-blue-600 ${
                      isSelected ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab} 
                    {isSelected && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></div>}
                  </button>
                );
              })}
            </nav>

            {error && (
              <div 
                ref={errorRef}
                tabIndex={-1}
                className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500" 
                role="alert"
              >
                {error}
              </div>
            )}

            {activeTab === 'entrar' ? (
              <form id="entrar-panel" role="tabpanel" aria-labelledby="tab-entrar" className="space-y-5" onSubmit={handleLoginSubmit}>
                <div className="space-y-1.5">
                  <label htmlFor="login-email" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 text-slate-400 pointer-events-none" size={16} aria-hidden="true" />
                    <input 
                      id="login-email"
                      type="email" 
                      placeholder="exemplo@empresa.com" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:bg-white focus:border-blue-500 outline-none transition-all text-sm focus-visible:ring-4 focus-visible:ring-blue-500/20" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="login-password" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Senha</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 text-slate-400 pointer-events-none" size={16} aria-hidden="true" />
                    <input 
                      id="login-password"
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      required 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-11 focus:bg-white focus:border-blue-500 outline-none transition-all text-sm focus-visible:ring-4 focus-visible:ring-blue-500/20" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      aria-label={showPassword ? "Ocultar senha" : "Exibir senha formatada em texto claro"}
                      className="absolute right-4 text-slate-400 hover:text-blue-600 cursor-pointer rounded p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <a href="#" className="text-[11px] font-bold text-blue-600 focus-visible:outline-none focus-visible:underline">Esqueceu a senha?</a>
                </div>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-[#0D1F3D] hover:bg-slate-800 text-white font-black py-4 rounded-xl shadow-lg transition-all mt-2 cursor-pointer text-xs uppercase tracking-widest disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                >
                  {loading ? 'Entrando...' : 'Entrar no Sistema'}
                </button>
              </form>
            ) : (
              
              <form id="cadastrar-panel" role="tabpanel" aria-labelledby="tab-cadastrar" onSubmit={handleRegisterSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="reg-nome" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                  <input 
                    id="reg-nome"
                    type="text" 
                    name="nome" 
                    placeholder="João Silva" 
                    required 
                    value={regFormData.nome} 
                    onChange={handleRegFormChange} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:bg-white focus:border-blue-500 transition-all text-sm focus-visible:ring-4 focus-visible:ring-blue-500/20" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reg-email" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                  <input 
                    id="reg-email"
                    type="email" 
                    name="email" 
                    placeholder="seu@email.com" 
                    required 
                    value={regFormData.email} 
                    onChange={handleRegFormChange} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:bg-white focus:border-blue-500 transition-all text-sm focus-visible:ring-4 focus-visible:ring-blue-500/20" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reg-senha" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Senha</label>
                  <input 
                    id="reg-senha"
                    type="password" 
                    name="senha" 
                    placeholder="••••••••" 
                    required 
                    value={regFormData.senha} 
                    onChange={handleRegFormChange} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:bg-white focus:border-blue-500 transition-all text-sm focus-visible:ring-4 focus-visible:ring-blue-500/20" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-md mt-4 cursor-pointer text-xs uppercase tracking-widest disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                >
                  {loading ? 'Criando conta...' : 'Criar Minha Conta'}
                </button>
              </form>
            )}

            <div className="mt-8">
              <div className="relative flex items-center justify-center mb-6">
                <div className="w-full border-t border-slate-200/60" aria-hidden="true"></div>
                <span className="bg-white px-3 text-[9px] font-black text-slate-400 absolute uppercase tracking-[0.2em]">ou acesse via</span>
              </div>
              
              <button 
                type="button" 
                className="w-full flex items-center justify-center gap-2.5 border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-600 text-[11px] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
              >
                <img src="https://www.google.com/favicon.ico" alt="" className="w-3.5 h-3.5" aria-hidden="true" /> 
                Continuar com o Google
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}