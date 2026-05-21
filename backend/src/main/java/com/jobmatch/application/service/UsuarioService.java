package com.jobmatch.application.service;

import com.jobmatch.application.dto.CriarUsuarioDTO;
import com.jobmatch.domain.entity.Usuario;
import java.util.Optional;

public interface UsuarioService {
    Usuario criarUsuario(CriarUsuarioDTO dto);
    Optional<Usuario> buscarPorEmail(String email);
}
