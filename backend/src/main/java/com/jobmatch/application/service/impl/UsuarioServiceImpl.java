package com.jobmatch.application.service.impl;

import com.jobmatch.application.dto.CriarUsuarioDTO;
import com.jobmatch.application.repository.UsuarioRepository;
import com.jobmatch.application.service.UsuarioService;
import com.jobmatch.domain.entity.Usuario;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public Usuario criarUsuario(CriarUsuarioDTO dto) {
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.getNome());
        novoUsuario.setEmail(dto.getEmail());
        novoUsuario.setSenha(passwordEncoder.encode(dto.getSenha())); // Criptografa a senha
        novoUsuario.setCargo(dto.getCargo());
        novoUsuario.setTelefone(dto.getTelefone());
        novoUsuario.setLocalizacao(dto.getLocalizacao());
        novoUsuario.setSobre(dto.getSobre());
        novoUsuario.setHabilidades(dto.getHabilidades());

        return usuarioRepository.save(novoUsuario);
    }

    @Override
    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
}
