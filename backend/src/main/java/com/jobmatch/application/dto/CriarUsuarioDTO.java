package com.jobmatch.application.dto;

import lombok.Data;

// Usamos @Data do Lombok para gerar getters, setters, etc.
@Data
public class CriarUsuarioDTO {
    private String nome;
    private String email;
    private String senha;
    private String cargo;
    private String telefone;
    private String localizacao;
    private String sobre;
    private String habilidades;
}
