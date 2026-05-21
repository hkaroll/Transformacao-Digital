package com.jobmatch.infrastructure.web.controller;

import com.jobmatch.application.service.VagaService;
import com.jobmatch.domain.entity.Candidatura;
import com.jobmatch.domain.entity.Vaga;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
public class VagaController {

    private final VagaService vagaService;

    public VagaController(VagaService vagaService) {
        this.vagaService = vagaService;
    }

    @PostMapping("/vagas")
    public ResponseEntity<Vaga> criarVaga(@RequestBody Vaga vaga) {
        Vaga novaVaga = vagaService.criarVaga(vaga);
        return ResponseEntity.created(URI.create("/api/vagas/" + novaVaga.getId())).body(novaVaga);
    }

    @GetMapping("/vagas")
    public ResponseEntity<List<Vaga>> listarVagas() {
        List<Vaga> vagas = vagaService.listarVagas();
        return ResponseEntity.ok(vagas);
    }

    @GetMapping("/vagas/{id}")
    public ResponseEntity<Vaga> buscarVagaPorId(@PathVariable Long id) {
        return vagaService.buscarVagaPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/empresas/{empresaId}/vagas")
    public ResponseEntity<List<Vaga>> listarVagasPorEmpresa(@PathVariable Long empresaId) {
        List<Vaga> vagas = vagaService.listarVagasPorEmpresa(empresaId);
        return ResponseEntity.ok(vagas);
    }

    @PostMapping("/vagas/{vagaId}/candidatar-se")
    public ResponseEntity<?> seCandidatar(@PathVariable Long vagaId, Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String userEmail = authentication.getName();
        try {
            Candidatura novaCandidatura = vagaService.seCandidatar(vagaId, userEmail);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaCandidatura);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/vagas/match")
    public ResponseEntity<List<Vaga>> encontrarVagasCompativeis(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String userEmail = authentication.getName();
        List<Vaga> vagasCompativeis = vagaService.encontrarVagasCompativeis(userEmail);
        return ResponseEntity.ok(vagasCompativeis);
    }
}
