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


// função para carregar conteúdo das páginas dinamixamente na div com a classe .rigth-gradient-content
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
    document.getElementById("servidores").addEventListener("click", function () {
        loadContent("../screens/servidor/index.html");
    });
    document.getElementById("cursos").addEventListener("click", function () {
        loadContent("../screens/curso/index.html");
    });
    document.getElementById("armarios").addEventListener("click", function () {
        loadContent("../screens/armario/index.html");
    });
    document.getElementById("emprestimos").addEventListener("click", function () {
        loadContent("../screens/emprestimo/index.html");
    });
    document.getElementById("concessoes").addEventListener("click", function () {
        loadContent("../screens/concessao/index.html");
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

