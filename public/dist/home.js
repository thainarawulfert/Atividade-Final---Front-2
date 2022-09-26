"use strict";
const myModalEdit = new bootstrap.Modal("#modalEditar");
const myModalApagar = new bootstrap.Modal("#modalApagar");
const formulario = document.getElementById('formulario');
const btnSair = document.getElementById('btnSair');
const table = document.getElementById('table');
let descricao = document.getElementById('descricao');
let detalhamento = document.getElementById('detalhamento');
let dadosUsuarioLogado;
document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    let listaUsuarios = buscarTodosUsuarios();
    dadosUsuarioLogado = listaUsuarios.find((usuario) => usuario.usuario === usuarioLogado);
    dadosUsuarioLogado.recados.forEach((recado) => recadosNoHtml(recado));
});
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    criarRecados();
});
function buscarTodosUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}
function criarRecados() {
    let maiorIndice = dadosUsuarioLogado.recados.reduce((acc, next) => {
        if (acc > next.id) {
            return acc;
        }
        return next.id;
    }, 0);
    let id = maiorIndice ? maiorIndice + 1 : 1;
    const novoRecado = {
        id,
        descricao: descricao.value,
        detalhamento: detalhamento.value,
    };
    dadosUsuarioLogado.recados.push(novoRecado);
    atualizarDadosUsuarioLogado(dadosUsuarioLogado);
    alert('Recado lançado.');
    formulario.reset();
    recadosNoHtml(novoRecado);
}
function atualizarDadosUsuarioLogado(dadosAtualizados) {
    let listaUsuarios = buscarTodosUsuarios();
    let indiceUsuarioEncontrado = listaUsuarios.findIndex((usuario) => usuario.usuario === dadosAtualizados.usuario);
    listaUsuarios[indiceUsuarioEncontrado] = dadosAtualizados;
    atualizarStorage(listaUsuarios);
}
function atualizarStorage(listaDados) {
    localStorage.setItem('usuarios', JSON.stringify(listaDados));
}
function recadosNoHtml(novoRecado) {
    const trTable = document.createElement('tr');
    trTable.setAttribute('id', `${novoRecado.id}`);
    trTable.classList.add('table');
    const tdId = document.createElement('td');
    tdId.innerText = `${novoRecado.id}`;
    const tdDescricao = document.createElement('td');
    tdDescricao.innerHTML = novoRecado.descricao;
    const tdDetalhamento = document.createElement('td');
    tdDetalhamento.innerHTML = novoRecado.detalhamento;
    const tdBotoes = document.createElement('td');
    const buttonExcluir = document.createElement('button');
    buttonExcluir.setAttribute('class', 'btn');
    buttonExcluir.setAttribute("data-bs-toggle", "modal");
    buttonExcluir.setAttribute("data-bs-target", "#modalApagar");
    buttonExcluir.innerText = 'apagar';
    buttonExcluir.addEventListener('click', () => apagar(novoRecado.id));
    const buttonEditar = document.createElement('button');
    buttonEditar.setAttribute('class', 'btn');
    buttonEditar.setAttribute("data-bs-toggle", "modal");
    buttonEditar.setAttribute("data-bs-target", "#modalEditar");
    buttonEditar.innerText = 'editar';
    // buttonEditar.addEventListener('click',()=> editar(novoRecado));
    trTable.appendChild(tdId);
    trTable.appendChild(tdDescricao);
    trTable.appendChild(tdDetalhamento);
    tdBotoes.appendChild(buttonEditar);
    tdBotoes.appendChild(buttonExcluir);
    trTable.appendChild(tdBotoes);
    table.appendChild(trTable);
}
function apagar(id) {
    let indiceRecadoEncontrado = dadosUsuarioLogado.recados.findIndex((recado) => recado.id == id);
    const btnapagar = document.getElementById('btnapagar');
    if (btnapagar) {
        btnapagar.addEventListener('click', () => {
            let recadoExcluir = document.getElementById(`${id}`);
            recadoExcluir.remove();
            dadosUsuarioLogado.recados.splice(indiceRecadoEncontrado, 1);
            atualizarDadosUsuarioLogado(dadosUsuarioLogado);
        });
    }
}
function editar(novoRecado) {
    console.log('apagar');
    const btneditar = document.getElementById('btnapagar');
    if (btneditar) {
        btneditar.addEventListener('click', () => {
            descricao.value = novoRecado.descricao;
            detalhamento.value = novoRecado.detalhamento;
        });
    }
}
btnSair.addEventListener('click', sair);
function sair() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'logi.html';
}
