package com.jobmatch.application.service;

import com.jobmatch.application.dto.CriarUsuarioDTO;
import com.jobmatch.domain.entity.Usuario;

public interface UsuarioService {
    Usuario criarUsuario(CriarUsuarioDTO dto);
}
