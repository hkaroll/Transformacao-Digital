// ========================================================
// FUNÇÕES SIMULADAS PARA TESTAR O LAYOUT SEM O BACKEND ONLINE
// ========================================================

export const login = async (email) => {
    localStorage.setItem('jwt_token', 'token_falso_para_teste_de_layout');
    return { nome: "Karoll Reis", email: email, cargo: "Desenvolvedora Front-End" };
};

export const register = async () => {
    localStorage.setItem('jwt_token', 'token_falso_para_teste_de_layout');
    return { success: true, message: "Usuário cadastrado com sucesso!" };
};

export const getUsuarioLogado = async () => {
    return { 
        nome: "Karoll Reis", 
        email: "karoll@gmail.com", 
        cargo: "Desenvolvedora Front-End", 
        localizacao: "Fortaleza, CE",
        sobre: "Desenvolvedora front-end com experiência em React e Tailwind CSS.",
        habilidades: ["React", "Tailwind CSS", "JavaScript", "Git"] 
    };
};

export const getEmpresas = async () => {
    return [
        { id: 1, name: "Tech Ceará", sector: "Tecnologia" },
        { id: 2, name: "Inovação Digital", sector: "Software" }
    ];
};

export const getVagas = async () => {
    return [
        { id: 1, title: "Estágio Front-End", company: "Tech Ceará", location: "Fortaleza, CE", sal: "R$ 1.500", type: "Estágio" },
        { id: 2, title: "Desenvolvedor React Júnior", company: "Inovação Digital", location: "Remoto", sal: "R$ 3.000", type: "Efetivo" }
    ];
};

export const getVagasCompativeis = async () => {
    return [
        { id: 1, title: "Estágio Front-End", company: "Tech Ceará", location: "Fortaleza, CE", sal: "R$ 1.500", type: "Estágio" }
    ];
};

export const seCandidatar = async () => {
    return { success: true, message: "Candidatura registrada com sucesso!" };
};