"use strict";
// e vamos de login
let usuarioLogin = document.getElementById('usuarioLogin');
let senhaLogin = document.getElementById('senhaLogin');
const formLogin = document.getElementById('formLogin');
formLogin.addEventListener('submit', (ev) => {
    ev.preventDefault();
    logar();
});
function logar() {
    console.log('entrou');
    let usuarios = buscarUsuariosStorageCad();
    let usuarioEncontrado = usuarios.find((u => u.usuario === usuarioLogin.value && u.senha === senhaLogin.value));
    if (usuarioEncontrado) {
        localStorage.setItem('usuarioLogado', usuarioEncontrado.usuario);
        alert('Seja bem-vindo a sua página de recados!');
        window.location.href = 'home.html';
    }
    else {
        alert('Usuário ou Senha incorreto!');
    }
}
function buscarUsuariosStorageCad() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}
