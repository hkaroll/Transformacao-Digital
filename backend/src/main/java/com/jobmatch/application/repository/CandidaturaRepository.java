package com.jobmatch.application.repository;

import com.jobmatch.domain.entity.Candidatura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidaturaRepository extends JpaRepository<Candidatura, Long> {
    // Métodos de busca personalizados podem ser adicionados aqui se necessário
}
