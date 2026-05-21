package com.jobmatch.infrastructure.persistence;

import com.jobmatch.application.repository.UsuarioRepository;
import com.jobmatch.domain.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioJpaRepository extends JpaRepository<Usuario, Long>, UsuarioRepository {
    // O Spring Data JPA implementará automaticamente os métodos save() e findById()
    // da nossa interface UsuarioRepository, pois eles correspondem aos métodos do JpaRepository.

    // O método findByEmail também será implementado automaticamente pelo Spring
    // devido à convenção de nomenclatura "findBy<NomeDoCampo>".
}
