package com.jobmatch.application.service;

import com.jobmatch.domain.entity.Candidatura;
import com.jobmatch.domain.entity.Vaga;
import java.util.List;
import java.util.Optional;

public interface VagaService {
    Vaga criarVaga(Vaga vaga);
    List<Vaga> listarVagas();
    Optional<Vaga> buscarVagaPorId(Long id);
    List<Vaga> listarVagasPorEmpresa(Long empresaId);
    Candidatura seCandidatar(Long vagaId, String userEmail);
    List<Vaga> encontrarVagasCompativeis(String userEmail);
}
