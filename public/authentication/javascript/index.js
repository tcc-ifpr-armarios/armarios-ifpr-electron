
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://127.0.0.1:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Login bem-sucedido!');
        // Armazene o token para uso posterior
        localStorage.setItem('token', data.token);
    } else {
        alert('Erro ao fazer login: ' + data.error);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cancel').addEventListener('click', function () {
        window.location.href = '../home/index.html'; // Altere para o URL desejado
        console.log("Redirecionando para a tela inicial");
    });
});

document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('http://127.0.0.1:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Registro bem-sucedido!');
    } else {
        alert('Erro ao registrar: ' + data.error);
    }
});


