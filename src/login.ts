// e vamos de login

let usuarioLogin = document.getElementById('usuarioLogin') as HTMLInputElement; 
let senhaLogin = document.getElementById('senhaLogin') as HTMLInputElement;
const formLogin = document.getElementById('formLogin') as HTMLFormElement;

formLogin.addEventListener('submit' , (ev) =>{
    ev.preventDefault() 
    logar()    
});
function logar(): void {

    console.log('entrou');
    
    let usuarios: Usuario[] = buscarUsuariosStorageCad()
    let usuarioEncontrado = usuarios.find((u => u.usuario === usuarioLogin.value && u.senha === senhaLogin.value))
    if(usuarioEncontrado){
        localStorage.setItem('usuarioLogado', usuarioEncontrado.usuario)
        alert('Seja bem-vindo a sua página de recados!')
        window.location.href = 'home.html'
    } else {
        alert('Usuário ou Senha incorreto!')
    }
}




function buscarUsuariosStorageCad(): Usuario[]{
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}