package com.jobmatch.application.service.impl;

import com.jobmatch.application.dto.CriarUsuarioDTO;
import com.jobmatch.application.repository.UsuarioRepository;
import com.jobmatch.domain.entity.Usuario;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceImplTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioServiceImpl usuarioService;

    @Test
    void criarUsuario_quandoEmailNaoExiste_deveSalvarERetornarUsuario() {
        // Arrange
        CriarUsuarioDTO dto = new CriarUsuarioDTO();
        dto.setEmail("novo.usuario@dev.com");
        dto.setNome("Novo Usuario");
        dto.setSenha("senha123");

        // Configura o mock para simular que o e-mail não existe
        when(usuarioRepository.findByEmail("novo.usuario@dev.com")).thenReturn(Optional.empty());

        // Configura o mock para retornar o usuário salvo quando o método save for chamado
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> {
            Usuario usuario = invocation.getArgument(0);
            usuario.setId(1L); // Simula a geração de um ID pelo banco
            return usuario;
        });

        // Act
        Usuario resultado = usuarioService.criarUsuario(dto);

        // Assert
        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        assertEquals("Novo Usuario", resultado.getNome());
        verify(usuarioRepository).findByEmail("novo.usuario@dev.com"); // Verifica se a consulta de e-mail foi feita
        verify(usuarioRepository).save(any(Usuario.class)); // Verifica se o método save foi chamado
    }

    @Test
    void criarUsuario_quandoEmailJaExiste_deveLancarExcecao() {
        // Arrange
        CriarUsuarioDTO dto = new CriarUsuarioDTO();
        dto.setEmail("email.existente@dev.com");

        // Configura o mock para simular que o e-mail JÁ EXISTE
        when(usuarioRepository.findByEmail("email.existente@dev.com")).thenReturn(Optional.of(new Usuario()));

        // Act & Assert
        // Verifica se o método lança a exceção esperada
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            usuarioService.criarUsuario(dto);
        });

        assertEquals("E-mail já cadastrado.", exception.getMessage());
    }
}
