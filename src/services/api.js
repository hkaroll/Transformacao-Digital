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
    // Simulando dados locais para a apresentação, pulando a requisição do banco
    return [
        {
            id: 1,
            nome: "Tech Ceará Inovações",
            localizacao: "Fortaleza, CE",
            setor: "Tecnologia",
            descricao: "Hub especializado no desenvolvimento de softwares escaláveis, soluções em nuvem e aplicações mobile para o mercado local e nacional.",
            site: "www.techceara.com.br"
        },
        {
            id: 2,
            nome: "Vanguard Studio",
            localizacao: "Fortaleza, CE",
            setor: "Design & Marketing",
            descricao: "Agência digital focada em experiência do usuário (UX/UI), branding de marcas tecnológicas e estratégias de growth marketing.",
            site: "www.vanguardstudio.design"
        },
        {
            id: 3,
            nome: "Jangada Bank",
            localizacao: "Eusébio, CE",
            setor: "Finanças",
            descricao: "Fintech de serviços financeiros simplificados e segurança de dados, conectando pequenos negócios a soluções de crédito ágeis.",
            site: "www.jangadabank.com"
        },
        {
            id: 4,
            nome: "Sertão Dev",
            localizacao: "Fortaleza, CE",
            setor: "Tecnologia",
            descricao: "Consultoria tecnológica focada na modernização de sistemas legados, inteligência artificial integrada e alocação de squads ágeis.",
            site: "www.sertaodev.io"
        }
    ];
};

export const getVagas = async () => {
    // Simulando dados locais de vagas para a apresentação, pulando a requisição ao Supabase
    return [
        {
            id: 1,
            titulo: "Estágio em Desenvolvimento Front-End",
            empresa: "Tech Ceará Inovações",
            localizacao: "Fortaleza, CE",
            modalidade: "Híbrido",
            tipo: "Estágio (6h diárias)",
            salario: "R$ 1.400,00",
            setor: "Tecnologia",
            descricao: "Auxiliar no desenvolvimento de interfaces modernas utilizando React e Tailwind CSS, participando de squads ágeis e refinamento de histórias de usuário.",
            requisitos: ["Conhecimento básico em HTML, CSS e JavaScript", "Estar cursando TI, Engenharia de Computação ou áreas afins", "Vontade de aprender"],
            tags: ["React", "Tailwind CSS", "Git"]
        },
        {
            id: 2,
            titulo: "Desenvolvedor Júnior Mobile (Kotlin)",
            empresa: "Sertão Dev",
            localizacao: "Fortaleza, CE",
            modalidade: "Presencial",
            tipo: "Efetivo (CLT)",
            salario: "R$ 3.500,00",
            setor: "Tecnologia",
            descricao: "Atuar na manutenção e criação de novas funcionalidades para aplicativos Android nativos, focando em arquitetura MVVM e consumo de APIs REST.",
            requisitos: ["Conhecimento em Kotlin e Android Studio", "Noções de componentização e Clean Architecture", "Residir em Fortaleza"],
            tags: ["Kotlin", "Android", "API REST"]
        },
        {
            id: 3,
            titulo: "Jovem Aprendiz em Administração",
            empresa: "Jangada Bank",
            localizacao: "Eusébio, CE",
            modalidade: "Presencial",
            tipo: "Jovem Aprendiz (4h diárias)",
            salario: "R$ 950,00",
            setor: "Finanças",
            descricao: "Suporte na organização de documentos digitais, atendimento inicial a colaboradores internos e alimentação de planilhas de controle de fluxos.",
            requisitos: ["Ensino Médio em andamento ou concluído", "Conhecimento básico no Pacote Office (Excel/Word)", "Boa comunicação"],
            tags: ["Administração", "Excel", "Organização"]
        },
        {
            id: 4,
            titulo: "Designer de Interface UI/UX Júnior",
            empresa: "Vanguard Studio",
            localizacao: "Fortaleza, CE",
            modalidade: "Remoto",
            tipo: "Efetivo (CLT)",
            salario: "R$ 2.800,00",
            setor: "Design & Marketing",
            descricao: "Criação de wireframes, protótipos de alta fidelidade e fluxos de navegação focados na melhor experiência para plataformas web e aplicativos mobile.",
            requisitos: ["Domínio de ferramentas de design (Figma)", "Portfólio demonstrando conceitos de UI/UX", "Noções de sistemas de design (Design Systems)"],
            tags: ["Figma", "UI/UX", "Prototipagem"]
        }
    ];
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