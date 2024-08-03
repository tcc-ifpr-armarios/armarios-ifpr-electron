
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const siape = document.getElementById('login-siape').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${process.env.API_URL}/servidor/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siape, password })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('message').textContent = 'Login bem-sucedido! Redirecionando...';
        setTimeout(() => {
            window.location.href = '../../../src/views/servidor/home/index.html'; 
        }, 2000);
        
        console.log(data.token);
        localStorage.setItem('token', data.token);
    } else {
        document.getElementById('message').textContent = 'Erro ao fazer login: ' + data.error;
    }
});



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cancel').addEventListener('click', function () {
        window.location.href = '../../home/index.html'; // Altere para o URL desejado
        console.log("Redirecionando para a tela inicial");
    });
});

// document.getElementById('register-form').addEventListener('submit', async function (event) {
//     event.preventDefault();
//     const siape = document.getElementById('register-siape').value;
//     const password = document.getElementById('register-password').value;

//     const response = await fetch('http://127.0.0.1:3000/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ siape, password })
//     });

//     const data = await response.json();
//     if (response.ok) {
//         alert('Registro bem-sucedido!');
//     } else {
//         alert('Erro ao registrar: ' + data.error);
//     }
// });


