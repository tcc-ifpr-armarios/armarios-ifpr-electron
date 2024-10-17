// script.js
document.getElementById('register').addEventListener('click', function () {
    window.location.href = '../register/index.html';
    console.log("Redirecionando para a tela de cadastro");
});

document.getElementById('administer').addEventListener('click', function () {
    window.location.href = '../authentication/servidor/index.html';
    console.log("Redirecionando para a tela de login");
});

document.getElementById('login').addEventListener('click', function () {
    window.location.href = '../authentication/estudante/index.html';
    console.log("Redirecionando para a tela de login");
});
