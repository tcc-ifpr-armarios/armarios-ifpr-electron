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
        const jwt = localStorage.getItem('token');
        const dados = jwt && JSON.parse(atob(jwt.split('.')[1]));
        const nomeUsuario = dados && dados.servidorNome;
        userName.textContent = nomeUsuario;
    }

    atualizarNomeUsuario();
    atualizarDataHora();
    setInterval(atualizarDataHora, 1000);

    const menuItems = {
        inicio: "../screens/inicio/index.html",
        estudantes: "../screens/estudante/index.html",
        localizacoes: "../screens/localizacao/index.html",
        servidores: "../screens/servidor/index.html",
        cursos: "../screens/curso/index.html",
        armarios: "../screens/armario/index.html",
        emprestimos: "../screens/emprestimo/index.html",
        concessoes: "../screens/concessao/index.html"
    };

    for (const [key, url] of Object.entries(menuItems)) {
        document.getElementById(key).addEventListener("click", function () {
            loadContent(url);
        });
    }

    function loadContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.querySelector(".rigth-gradient-content").innerHTML = data;
                addModalEventListeners();
            })
            .catch(error => console.error('Error loading content:', error));
    }

    function addModalEventListeners() {
        const modalButtons = {
            "btn-add-localizacao": "../screens/localizacao/save-edit-modal-localizacao.html",
            "btn-add-servidor": "../screens/servidor/content-modal-servidor.html",
            "btn-add-estudante": "../screens/estudante/save-edit-modal-estudante.html",
            "btn-add-curso": "../screens/curso/content-modal-curso.html",
            "btn-add-armario": "../screens/armario/content-modal-armario.html",
            "btn-add-emprestimo": "../screens/emprestimo/content-modal-emprestimo.html",
            "btn-add-concessao": "../screens/concessao/content-modal-concessao.html"
        };

        for (const [btnId, url] of Object.entries(modalButtons)) {
            const button = document.getElementById(btnId);
            if (button) {
                button.addEventListener("click", function () {
                    loadModalContent(url);
                });
            }
        }
    }

    function loadModalContent(url) {
        openModal();
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.querySelector(".modal-dinamic-content").innerHTML = data;
                addCloseModalEvent();
            })
            .catch(error => console.error('Error loading content:', error));
    }

    function openModal() {
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    function closeModal() {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    function addCloseModalEvent() {
        const buttonCancel = document.getElementsByClassName("buttonCancel")[0];
        const span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            closeModal();
        }
        buttonCancel.onclick = function() {
            closeModal();
        }
        window.onclick = function(event) {
            const modal = document.getElementById("myModal");
            if (event.target == modal) {
                closeModal();
            }
        }
    }

    loadContent(menuItems.inicio);
});
