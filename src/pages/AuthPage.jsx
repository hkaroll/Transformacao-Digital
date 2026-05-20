import { useState } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, Briefcase, 
  CheckCircle2, User, Building, ChevronLeft 
} from 'lucide-react';

export default function AuthPage({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('entrar'); 
  const [regStep, setRegStep] = useState(1); 
  const [userRole, setUserRole] = useState(null); 

  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({ nome: formData.nome, email: formData.email });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans overflow-hidden">
      
      <section className="hidden md:flex md:w-1/2 bg-[#0D1F3D] p-12 flex-col justify-between text-white relative">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 bg-blue-500 rounded-xl shadow-lg"><Briefcase size={24} strokeWidth={2.5} /></div>
            <span className="text-2xl font-black tracking-tighter">JobMatch</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-8">Conectando talentos às melhores empresas.</h2>
          <ul className="space-y-4">
            {["Vagas personalizadas para seu perfil", "Conexão direta com recrutadores", "Gestão de carreira simplificada"].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                <CheckCircle2 className="text-blue-400 shrink-0" size={20} /> {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative z-10 border-t border-slate-700 pt-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          UNIFOR • 2026
        </div>
      </section>

      <section className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-[400px]"> 
          <div className="bg-white p-7 md:p-9 rounded-[32px] shadow-xl shadow-slate-200/60 border border-white">

            <div className="mb-6">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                {activeTab === 'entrar' ? 'Acesse sua conta' : 'Crie sua conta'}
              </h3>
              <p className="text-slate-500 mt-1.5 text-xs font-medium">
                {activeTab === 'entrar' ? 'Informe seus dados de acesso abaixo.' : 'Preencha os dados para começar.'}
              </p>
            </div>

            <nav className="flex gap-6 border-b border-slate-100 mb-8">
              {['entrar', 'cadastrar'].map((tab) => (
                <button key={tab} type="button" onClick={() => {setActiveTab(tab);}} className={`pb-3 text-xs font-black uppercase tracking-widest transition-all relative cursor-pointer ${activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  {tab} {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></div>}
                </button>
              ))}
            </nav>

            {activeTab === 'entrar' ? (
              <form className="space-y-4" onSubmit={(e) => {e.preventDefault(); onLoginSuccess({nome: "João Silva", email: "joao@gmail.com"});}}>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-MAIL</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input type="email" placeholder="exemplo@empresa.com" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 focus:bg-white focus:border-blue-500 outline-none transition-all text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SENHA</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-11 focus:bg-white focus:border-blue-500 outline-none transition-all text-sm" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-600 cursor-pointer">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                  </div>
                </div>
                <div className="flex justify-end"><a href="#" className="text-[11px] font-bold text-blue-600">Esqueceu a senha?</a></div>
                <button className="w-full bg-[#0D1F3D] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all mt-2 cursor-pointer text-sm">Entrar no Sistema</button>
              </form>
            ) : (

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                  <input type="text" placeholder="João Silva" required value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-5 outline-none focus:bg-white focus:border-blue-500 transition-all text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                  <input type="email" placeholder="seu@email.com" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-5 outline-none focus:bg-white focus:border-blue-500 transition-all text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Senha</label>
                  <input type="password" placeholder="••••••••" required value={formData.senha} onChange={(e) => setFormData({...formData, senha: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-5 outline-none focus:bg-white focus:border-blue-500 transition-all text-sm" />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md mt-4 cursor-pointer text-sm">Criar Conta</button>
              </form>
            )}

            {/* Google Login */}
            <div className="mt-8">
              <div className="relative flex items-center justify-center mb-6">
                <div className="w-full border-t border-slate-100"></div>
                <span className="bg-white px-3 text-[9px] font-black text-slate-300 absolute uppercase tracking-[0.2em]">ou acesse via</span>
              </div>
              <button type="button" className="w-full flex items-center justify-center gap-2 border border-slate-100 py-2.5 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-600 text-[11px] cursor-pointer">
                <img src="https://www.google.com/favicon.ico" alt="" className="w-3.5 h-3.5" /> Continuar com Google
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}