package com.jobmatch.application.service;

import com.jobmatch.domain.entity.Empresa;
import java.util.List;
import java.util.Optional;

public interface EmpresaService {
    Empresa criarEmpresa(Empresa empresa);
    List<Empresa> listarEmpresas();
    Optional<Empresa> buscarEmpresaPorId(Long id);
}
