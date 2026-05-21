package com.jobmatch.application.repository;

import com.jobmatch.domain.entity.Empresa;
import java.util.List;
import java.util.Optional;

public interface EmpresaRepository {
    Empresa save(Empresa empresa);
    List<Empresa> findAll();
    Optional<Empresa> findById(Long id);
}
