package com.jobmatch.application.repository;

import com.jobmatch.domain.entity.Vaga;
import java.util.List;
import java.util.Optional;

public interface VagaRepository {
    Vaga save(Vaga vaga);
    List<Vaga> findAll();
    Optional<Vaga> findById(Long id);
    List<Vaga> findByEmpresaId(Long empresaId);
}
