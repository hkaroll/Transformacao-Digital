package com.jobmatch.infrastructure.persistence;

import com.jobmatch.application.repository.EmpresaRepository;
import com.jobmatch.domain.entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaJpaRepository extends JpaRepository<Empresa, Long>, EmpresaRepository {
    // O Spring Data JPA implementará automaticamente os métodos findAll(), findById() e save()
    // da nossa interface EmpresaRepository, pois eles correspondem aos métodos do JpaRepository.
}
