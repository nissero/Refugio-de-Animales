package com.refugio.refugio.dao;

import jakarta.persistence.EntityManager;
import com.refugio.refugio.modelo.usuario;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao { // sss
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public void registrar(usuario usuarios) {
        entityManager.merge(usuarios);// merge no autocompleta el id...a la hora de mandar los datos
    }

    @Override
    public List<usuario> getUsuario() {
        String query = "FROM usuario";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminar(Long id) {
        usuario aux = entityManager.find(usuario.class, id);
        entityManager.remove(aux);
    }

}
