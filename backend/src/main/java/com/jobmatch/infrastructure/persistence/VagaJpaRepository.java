package com.jobmatch.infrastructure.persistence;

import com.jobmatch.application.repository.VagaRepository;
import com.jobmatch.domain.entity.Vaga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VagaJpaRepository extends JpaRepository<Vaga, Long>, VagaRepository {
    // O Spring Data JPA implementará os métodos padrão e também o findByEmpresaId
    // devido à convenção de nomenclatura.
}
