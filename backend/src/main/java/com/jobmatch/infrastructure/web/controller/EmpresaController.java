package com.jobmatch.infrastructure.web.controller;

import com.jobmatch.application.service.EmpresaService;
import com.jobmatch.domain.entity.Empresa;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    @PostMapping
    public ResponseEntity<Empresa> criarEmpresa(@RequestBody Empresa empresa) {
        Empresa novaEmpresa = empresaService.criarEmpresa(empresa);
        return ResponseEntity.created(URI.create("/api/empresas/" + novaEmpresa.getId())).body(novaEmpresa);
    }

    @GetMapping
    public ResponseEntity<List<Empresa>> listarEmpresas() {
        List<Empresa> empresas = empresaService.listarEmpresas();
        return ResponseEntity.ok(empresas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> buscarEmpresaPorId(@PathVariable Long id) {
        return empresaService.buscarEmpresaPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
