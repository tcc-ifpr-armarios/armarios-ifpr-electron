// script.js
document.getElementById('register').addEventListener('click', function () {
    window.location.href = '../register/index.html'; // Altere para o URL desejado
    console.log("Redirecionando para a tela de cadastro");
});

document.getElementById('administer').addEventListener('click', function () {
    window.location.href = '../authentication/index.html'; // Altere para o URL desejado
    console.log("Redirecionando para a tela de login");
});
