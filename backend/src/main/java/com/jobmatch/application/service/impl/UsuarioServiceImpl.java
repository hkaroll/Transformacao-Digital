package com.jobmatch.application.service.impl;

import com.jobmatch.application.dto.CriarUsuarioDTO;
import com.jobmatch.application.repository.UsuarioRepository;
import com.jobmatch.application.service.UsuarioService;
import com.jobmatch.domain.entity.Usuario;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    @Transactional
    public Usuario criarUsuario(CriarUsuarioDTO dto) {
        // Aqui podemos adicionar validações de negócio.
        // Por exemplo, verificar se o e-mail já existe.
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.getNome());
        novoUsuario.setEmail(dto.getEmail());
        novoUsuario.setSenha(dto.getSenha()); // Em um projeto real, faríamos o hash da senha aqui.
        novoUsuario.setCargo(dto.getCargo());
        novoUsuario.setTelefone(dto.getTelefone());
        novoUsuario.setLocalizacao(dto.getLocalizacao());
        novoUsuario.setSobre(dto.getSobre());
        novoUsuario.setHabilidades(dto.getHabilidades());

        return usuarioRepository.save(novoUsuario);
    }
}
