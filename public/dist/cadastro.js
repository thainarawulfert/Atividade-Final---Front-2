"use strict";
let usuarioCad = document.getElementById('usuarioCad');
let senhaCad = document.getElementById('senhaCad');
let senhaConf = document.getElementById('senhaConf');
const formCad = document.getElementById('formCad');
formCad.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validarCampo()) {
        cadastrarUsuario();
    }
    ;
});
function validarCampo() {
    if (senhaCad.value !== senhaConf.value) {
        alert('As senhas não conferem!');
        return false;
    }
    return true;
}
function cadastrarUsuario() {
    let listaUsuario = buscarUsuariosStorage();
    let usuarioExiste = listaUsuario.some((u) => u.usuario === usuarioCad.value);
    if (usuarioExiste) {
        alert('Usuário já cadastrado!');
        return;
    }
    const novoUsuario = {
        usuario: usuarioCad.value,
        senha: senhaCad.value,
        recados: []
    };
    listaUsuario.push(novoUsuario);
    salvarUsuarioStorage(listaUsuario);
    formCad.reset();
    alert('Usuário criado com sucesso!');
    window.location.href = 'login.html';
}
function buscarUsuariosStorage() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}
function salvarUsuarioStorage(listaDados) {
    localStorage.setItem('usuarios', JSON.stringify(listaDados));
}
