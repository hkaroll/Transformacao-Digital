package com.jobmatch.application.service.impl;

import com.jobmatch.application.repository.EmpresaRepository;
import com.jobmatch.application.service.EmpresaService;
import com.jobmatch.domain.entity.Empresa;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaServiceImpl implements EmpresaService {

    private final EmpresaRepository empresaRepository;

    public EmpresaServiceImpl(EmpresaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    @Override
    public Empresa criarEmpresa(Empresa empresa) {
        // Validações podem ser adicionadas aqui (ex: CNPJ único)
        return empresaRepository.save(empresa);
    }

    @Override
    public List<Empresa> listarEmpresas() {
        return empresaRepository.findAll();
    }

    @Override
    public Optional<Empresa> buscarEmpresaPorId(Long id) {
        return empresaRepository.findById(id);
    }
}
