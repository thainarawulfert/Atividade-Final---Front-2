let usuarioCad = document.getElementById('usuarioCad') as HTMLInputElement;
let senhaCad = document.getElementById('senhaCad') as HTMLInputElement;
let senhaConf = document.getElementById('senhaConf') as HTMLInputElement;
const formCad = document.getElementById('formCad') as HTMLFormElement;
interface Usuario{
    usuario:string
    senha:string
    recados: Recado[]
}
interface Recado{
    id: number,
    descricao: string
    detalhamento: string
}

formCad.addEventListener('submit', (event) =>{
    event.preventDefault();

    if(validarCampo()){    
        cadastrarUsuario();
       };
})

function validarCampo(): boolean {
    if(senhaCad.value !== senhaConf.value){
        alert('As senhas não conferem!')
        return false
    }
    return true
}

function cadastrarUsuario(){
    let listaUsuario : Usuario [] = buscarUsuariosStorage();

    let usuarioExiste = listaUsuario.some((u) => u.usuario === usuarioCad.value )

    if(usuarioExiste){
        alert('Usuário já cadastrado!')
        return
    } 
    const novoUsuario : Usuario ={
        usuario:usuarioCad.value,
        senha:senhaCad.value,
        recados: []
    }  
    listaUsuario.push(novoUsuario)

    salvarUsuarioStorage(listaUsuario)

    formCad.reset() 
    alert('Usuário criado com sucesso!')
    window.location.href = 'login.html'
}
function buscarUsuariosStorage(): Usuario[]{
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}
function salvarUsuarioStorage(listaDados: Usuario[]): void{
    localStorage.setItem('usuarios', JSON.stringify(listaDados));
}