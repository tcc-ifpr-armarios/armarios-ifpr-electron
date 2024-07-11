document.addEventListener('DOMContentLoaded', () => {
    const dataLocal = document.getElementById('dataLocal');
    const horaLocal = document.getElementById('horaLocal');
    const userName = document.getElementById('nameUser');

    function atualizarDataHora() {
        const agora = new Date();

        const opcoesData = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        const data = agora.toLocaleDateString('pt-BR', opcoesData);
        const hora = agora.toLocaleTimeString();

        dataLocal.textContent = ` ${data}`;
        horaLocal.textContent = `|  ${hora}`;
    }

    function atualizarNomeUsuario() {
        // pega o jwt do localStorage
        const jwt = localStorage.getItem('token');
        // decodifica o jwt
        console.log(jwt);
        const dados = jwt && JSON.parse(atob(jwt.split('.')[1]));
        const nomeUsuario = dados && dados.servidorNome;
        userName.textContent = nomeUsuario;
    }

    atualizarNomeUsuario();

    // Atualiza a data e hora imediatamente ao carregar a página
    atualizarDataHora();

    // Atualiza a data e hora a cada segundo
    setInterval(atualizarDataHora, 1000);
});



document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("inicio").addEventListener("click", function () {
        loadContent("../screens/inicio/index.html");
    });
    document.getElementById("estudantes").addEventListener("click", function () {
        loadContent("../screens/estudante/index.html");
    });
    document.getElementById("localizacoes").addEventListener("click", function () {
        loadContent("../screens/localizacao/index.html");
    });
   
    function loadContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.querySelector(".rigth-gradient-content").innerHTML = data;
            })
            .catch(error => console.error('Error loading content:', error));
    }

    loadContent("../screens/inicio/index.html");
});

