package com.jobmatch.infrastructure.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobmatch.application.dto.CriarUsuarioDTO;
import com.jobmatch.infrastructure.persistence.UsuarioJpaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class UsuarioControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UsuarioJpaRepository usuarioRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        // Limpa o repositório antes de cada teste para garantir isolamento
        usuarioRepository.deleteAll();
    }

    @Test
    void criarUsuario_quandoDadosValidos_retorna201CreatedEUsuario() throws Exception {
        // Arrange
        CriarUsuarioDTO dto = new CriarUsuarioDTO();
        dto.setNome("Karoll Reis");
        dto.setEmail("karoll@dev.com");
        dto.setSenha("senha123");
        dto.setCargo("DESENVOLVEDORA FRONT-END");

        // Act & Assert
        mockMvc.perform(post("/api/usuarios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.nome", is("Karoll Reis")))
                .andExpect(jsonPath("$.email", is("karoll@dev.com")));
    }

    @Test
    void criarUsuario_quandoEmailJaExiste_retorna400BadRequest() throws Exception {
        // Arrange: Primeiro, cria um usuário para que o e-mail já exista.
        CriarUsuarioDTO dtoExistente = new CriarUsuarioDTO();
        dtoExistente.setNome("Usuario Existente");
        dtoExistente.setEmail("email.duplicado@dev.com");
        dtoExistente.setSenha("senha123");

        mockMvc.perform(post("/api/usuarios")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dtoExistente)));

        // Agora, tenta criar outro usuário com o mesmo e-mail.
        CriarUsuarioDTO dtoDuplicado = new CriarUsuarioDTO();
        dtoDuplicado.setNome("Outro Usuario");
        dtoDuplicado.setEmail("email.duplicado@dev.com");
        dtoDuplicado.setSenha("outrasenha");

        // Act & Assert
        mockMvc.perform(post("/api/usuarios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dtoDuplicado)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error", is("E-mail já cadastrado.")));
    }
}
