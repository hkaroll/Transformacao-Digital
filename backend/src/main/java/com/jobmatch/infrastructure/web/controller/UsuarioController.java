package com.jobmatch.infrastructure.web.controller;

import com.jobmatch.application.dto.CriarUsuarioDTO;
import com.jobmatch.application.service.UsuarioService;
import com.jobmatch.domain.entity.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
        return ResponseEntity.created(URI.create("/api/usuarios/" + novoUsuario.getId())).body(novoUsuario);
    }

    @GetMapping("/me")
    public ResponseEntity<Usuario> getUsuarioLogado(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        return usuarioService.buscarPorEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
