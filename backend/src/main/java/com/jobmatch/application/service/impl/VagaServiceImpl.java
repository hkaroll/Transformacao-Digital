package com.jobmatch.application.service.impl;

import com.jobmatch.application.repository.CandidaturaRepository;
import com.jobmatch.application.repository.UsuarioRepository;
import com.jobmatch.application.repository.VagaRepository;
import com.jobmatch.application.service.VagaService;
import com.jobmatch.domain.entity.Candidatura;
import com.jobmatch.domain.entity.Usuario;
import com.jobmatch.domain.entity.Vaga;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class VagaServiceImpl implements VagaService {

    private final VagaRepository vagaRepository;
    private final UsuarioRepository usuarioRepository;
    private final CandidaturaRepository candidaturaRepository;

    public VagaServiceImpl(VagaRepository vagaRepository, UsuarioRepository usuarioRepository, CandidaturaRepository candidaturaRepository) {
        this.vagaRepository = vagaRepository;
        this.usuarioRepository = usuarioRepository;
        this.candidaturaRepository = candidaturaRepository;
    }

    @Override
    public Vaga criarVaga(Vaga vaga) {
        return vagaRepository.save(vaga);
    }

    @Override
    public List<Vaga> listarVagas() {
        return vagaRepository.findAll();
    }

    @Override
    public Optional<Vaga> buscarVagaPorId(Long id) {
        return vagaRepository.findById(id);
    }

    @Override
    public List<Vaga> listarVagasPorEmpresa(Long empresaId) {
        return vagaRepository.findByEmpresaId(empresaId);
    }

    @Override
    @Transactional
    public Candidatura seCandidatar(Long vagaId, String userEmail) {
        Usuario usuario = usuarioRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
        Vaga vaga = vagaRepository.findById(vagaId)
                .orElseThrow(() -> new EntityNotFoundException("Vaga não encontrada"));

        Candidatura novaCandidatura = new Candidatura(null, usuario, vaga, null);
        return candidaturaRepository.save(novaCandidatura);
    }

    @Override
    public List<Vaga> encontrarVagasCompativeis(String userEmail) {
        Usuario usuario = usuarioRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        if (usuario.getHabilidades() == null || usuario.getHabilidades().isEmpty()) {
            return Collections.emptyList();
        }

        Set<String> habilidadesUsuario = Arrays.stream(usuario.getHabilidades().split(","))
                .map(String::trim)
                .collect(Collectors.toSet());

        List<Vaga> todasAsVagas = vagaRepository.findAll();

        return todasAsVagas.stream()
                .map(vaga -> {
                    if (vaga.getRequisitos() == null || vaga.getRequisitos().isEmpty()) {
                        return new AbstractMap.SimpleEntry<>(vaga, 0);
                    }
                    Set<String> requisitosVaga = Arrays.stream(vaga.getRequisitos().split(","))
                            .map(String::trim)
                            .collect(Collectors.toSet());

                    requisitosVaga.retainAll(habilidadesUsuario); // Interseção
                    int score = requisitosVaga.size();

                    return new AbstractMap.SimpleEntry<>(vaga, score);
                })
                .filter(entry -> entry.getValue() > 0)
                .sorted(Map.Entry.<Vaga, Integer>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }
}
