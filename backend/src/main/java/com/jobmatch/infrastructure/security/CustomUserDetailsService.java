package com.jobmatch.infrastructure.security;

import com.jobmatch.application.repository.UsuarioRepository;
import com.jobmatch.domain.entity.Usuario;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList; // Para roles vazias por enquanto

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com e-mail: " + email));

        // Por enquanto, não temos roles/perfis. Retornamos um UserDetails básico.
        // Em um sistema real, você carregaria as roles do usuário do banco de dados.
        return new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),
                usuario.getSenha(),
                new ArrayList<>() // Lista vazia de GrantedAuthority (roles)
        );
    }
}
