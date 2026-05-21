package com.jobmatch.infrastructure.web.controller;

import com.jobmatch.application.dto.CriarUsuarioDTO;
import com.jobmatch.application.service.UsuarioService;
import com.jobmatch.domain.entity.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody CriarUsuarioDTO criarUsuarioDTO) {
        Usuario novoUsuario = usuarioService.criarUsuario(criarUsuarioDTO);
        // Retorna o status 201 Created com a localização do novo recurso no cabeçalho
        // e o objeto do usuário no corpo da resposta.
        return ResponseEntity.created(URI.create("/api/usuarios/" + novoUsuario.getId())).body(novoUsuario);
    }
}
