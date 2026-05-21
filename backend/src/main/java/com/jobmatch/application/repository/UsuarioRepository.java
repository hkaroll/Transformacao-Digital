package com.jobmatch.application.repository;

import com.jobmatch.domain.entity.Usuario;
import java.util.Optional;

public interface UsuarioRepository {

    Usuario save(Usuario usuario);

    Optional<Usuario> findById(Long id);

    Optional<Usuario> findByEmail(String email);

    // Outros métodos de busca podem ser adicionados aqui conforme a necessidade.
}
