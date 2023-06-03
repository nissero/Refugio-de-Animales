package com.refugio.refugio.controllers;

import com.refugio.refugio.dao.UsuarioDao;
import com.refugio.refugio.modelo.usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class usuarioControllers {
    @Autowired
    private UsuarioDao usuarioDao;

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<usuario> getUsuario(){
        return usuarioDao.getUsuario();
    }
    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable long id){
        usuarioDao.eliminar(id);
    }
    @RequestMapping (value = "api/usuarios",method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody usuario usuarios){
        usuarioDao.registrar(usuarios);
    }
}
