package com.refugio.refugio.dao;

import com.refugio.refugio.modelo.usuario;

import java.util.List;

public interface UsuarioDao {
    void registrar(usuario usuarios);

    List<usuario> getUsuario();

    void eliminar(Long id);
}
