// COMANDOS PARA EXECUTAR NO TERMINAL
// npm install -g json-server → JSON Server Install;
// json-server --watch (diretório do json) --port (porta) → Rodar o json na máquina;
// json-server --watch ./database/contas.json --port 5000
// Se der erro.ps1, segue o tutorial a seguir: https://www.c-sharpcorner.com/article/how-to-fix-ps1-can-not-be-loaded-because-running-scripts-is-disabled-on-this-sys/

const port = "5000"
const api = "http://localhost:" + port;

var body = document.body;


var containerCadastro = document.createElement('div');
containerCadastro.setAttribute("class", "containerCadastro");
containerCadastro.textContent = "Cadastro";


var emailInput = document.createElement('input');
emailInput.setAttribute("type", 'email');
emailInput.setAttribute("class", 'emailPassCadastro');
emailInput.placeholder = "Digite seu email";


var passInput = document.createElement("input");
passInput.setAttribute("type", "password");
passInput.setAttribute("class", 'emailPassCadastro');
passInput.placeholder = "Digite sua senha";


var cadastrarBtn = document.createElement("button");
cadastrarBtn.setAttribute("type", "submit");
cadastrarBtn.setAttribute("class", "btnCadastro");
cadastrarBtn.textContent = "Cadastrar";


body.appendChild(containerCadastro);
containerCadastro.appendChild(emailInput);
containerCadastro.appendChild(passInput);
containerCadastro.appendChild(cadastrarBtn);


var containerLogin = document.createElement('div');
containerLogin.setAttribute("class", "containerLogin");
containerLogin.textContent = "Login";


var emailLogin = document.createElement("input");
emailLogin.setAttribute("class" , "emailPassLogin");
emailLogin.setAttribute("type", "email");
emailLogin.placeholder = "Digite seu email";


var passwordLogin = document.createElement("input");
passwordLogin.setAttribute("class", "emailPassLogin");
passwordLogin.placeholder = "Digite sua senha";
passwordLogin.setAttribute("type", "password");


var loginBtn = document.createElement("button");
loginBtn.setAttribute("type", "submit");
loginBtn.setAttribute("class", "btnLogin");
loginBtn.textContent = "Logar";


body.appendChild(containerLogin);
containerLogin.appendChild(emailLogin);
containerLogin.appendChild(passwordLogin);
containerLogin.appendChild(loginBtn);

// =================CADASTRO================== //

cadastrarBtn.setAttribute("onclick", "cadastrar()")

const cadastrar = async () => {

    if (emailInput.value == "" || passInput.value == "") {
        alert("Algum dos dados em CADASTRO estão vazios!");
        return
    } else if (passInput.value == emailInput.value) {
        alert("A senha não pode ser igual ao email utilizado!");
        return
    }

    const apiLen = await fetch(api + "/contas")
        .then(response => response.json())
        .then(data => {console.log(data); return data});

    const cadastro = {
        "id": apiLen.length,
        "email": emailInput.value,
        "password": passInput.value
    }

    await fetch(api + "/contas", {
        method: "POST",
        body: JSON.stringify(cadastro),
        headers: {
            "Content-Type": "application/json",
        },
    });

    alert("Cadastrado com sucesso!")

    emailInput.value = "";
    passInput.value = "";

}

var inputsCadastro = document.querySelectorAll('.emailPassCadastro');
for (let element of inputsCadastro) {
    element.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            cadastrar();
        }
    })
}

// =================CADASTRO================== //



// =================LOGIN================== //

loginBtn.setAttribute("onclick", "logar()")

const verificarLogin = async (emailL) => {
    let data = await fetch(api + "/contas")
        .then(response => response.json());

    if (data.length === 0) {
        alert('Nenhum usuário cadastrado.')
        return
    }

    let infoLogin = data.filter(element => {
        const { email } = element;
        if (emailL === email) {
            return element;
        } else {
            alert("Email não cadastrado.");
            return;
        }
    })
    return infoLogin[0];
}

const logar = async () => {
    if (emailLogin.value == "" || passwordLogin.value == "") {
        alert("Algum dos dados do LOGIN estão vazios, verifique!");
        return
    }

    let emailL = emailLogin.value;
    let passowrdL = passwordLogin.value;

    const infoLogin = await verificarLogin(emailL);
    if (infoLogin === undefined) return;

    if (passowrdL !== infoLogin.password) {
        alert("Senha incorreta, tente novamente!");
        passowrdL = "";
    } else {
        alert("Usuário LOGADO com sucesso!");
        emailLogin.value = "";
        passwordLogin.value = "";
        return;
    }
}

var inputsLogin = document.querySelectorAll('.emailPassLogin');
for (let element of inputsLogin) {
    element.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            logar();
        }
    })
}

// =================LOGIN================== //