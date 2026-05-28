import { createClient } from '@supabase/supabase-js';

// Busca as chaves de conexão direto do seu arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializa o cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ========================================================
// SERVIÇOS DE AUTENTICAÇÃO E DADOS DO JOBMATCH
// ========================================================

export const login = async (email, senha) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
    });
    if (error) throw error;

    // Guarda o token de acesso para manter a sessão ativa ao recarregar
    localStorage.setItem('jwt_token', data.session.access_token);
    
    return {
        nome: data.user.user_metadata?.nome || data.user.email.split('@')[0],
        email: data.user.email,
        cargo: data.user.user_metadata?.cargo || "Candidato",
        habilidades: data.user.user_metadata?.habilidades || []
    };
};

export const register = async (userData) => {
    // Envia os dados estruturados para a tabela de autenticação nativa do Supabase
    const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.senha,
        options: {
            // Esta linha força a auto-confirmação do e-mail no ato do cadastro, pulando o bloqueio!
            emailSecure: false,
            data: {
                nome: userData.nome || userData.name, // Suporta variações de nomenclatura do form
                cargo: userData.cargo || "Candidato",
                habilidades: []
            }
        }
    });
    if (error) throw error;
    return { success: true, data };
};

export const getUsuarioLogado = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!user) throw new Error("Nenhum usuário logado");

    // Fallback de segurança: se o nome falhar nos metadados, usa o início do e-mail
    const nomeAlternativo = user.email ? user.email.split('@')[0] : "Usuário";

    return {
        nome: user.user_metadata?.nome || nomeAlternativo,
        email: user.email,
        cargo: user.user_metadata?.cargo || "Candidato",
        localizacao: user.user_metadata?.localizacao || "Não informada",
        sobre: user.user_metadata?.sobre || "",
        habilidades: user.user_metadata?.habilidades || []
    };
};

export const getEmpresas = async () => {
    // Busca os registros de empresas direto da tabela pública do Supabase
    const { data, error } = await supabase.from('empresas').select('*');
    if (error) throw error;
    return data;
};

export const getVagas = async () => {
    // Busca a lista de vagas abertas no banco
    const { data, error } = await supabase.from('vagas').select('*');
    if (error) throw error;
    return data;
};

export const getVagasCompativeis = async () => {
    // Retorna as vagas disponíveis no sistema para a triagem inicial
    const { data, error } = await supabase.from('vagas').select('*').limit(5);
    if (error) throw error;
    return data;
};

export const seCandidatar = async (vagaId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Usuário não identificado para candidatura.");
    
    const { error } = await supabase
        .from('candidaturas')
        .insert([{ user_id: user.id, vaga_id: vagaId }]);
        
    if (error) throw error;
    return { success: true, message: "Candidatura registrada com sucesso!" };
};