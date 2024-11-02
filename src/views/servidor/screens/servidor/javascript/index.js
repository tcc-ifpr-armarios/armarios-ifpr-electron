
const apiUrlServidor = process.env.API_SECURE_SERVER;

const messagesServidor = {
    saving: 'Salvando...',
    nomeObrigatorio: 'O campo nome é obrigatório',
    sobrenomeObrigatorio: 'O campo sobrenome é obrigatório',
    siapeObrigatorio: 'O campo siape é obrigatório',
    emailObrigatorio: 'O campo email é obrigatório',
    telefoneObrigatorio: 'O campo telefone é obrigatório',
    senhaObrigatorio: 'O campo senha é obrigatório',
    internalError: 'Erro Interno: Entre novamente no sistema',
    siapeDuplicado: "Já existe um cadastro com esse siape",
    senhaPequena: "A senha precisa ter ao menos 4 digitos",
    unknownError: 'Erro desconhecido'
};


async function salvarServidor() {
    document.querySelector('.msg-return').innerHTML = messagesServidor.saving;
    document.querySelector('.button').setAttribute('disabled', 'disabled');

    const nome = document.querySelector('#nome-servidor').value;
    const sobrenome = document.querySelector('#sobrenome-servidor').value;
    const siape = document.querySelector('#siape-servidor').value;
    const email = document.querySelector('#email-servidor').value;
    const telefone = document.querySelector('#telefone-servidor').value;
    const senha = document.querySelector('#senha-servidor').value;
    const ativo = document.querySelector('#ativo').checked ? 1 : 0;
    const id = document.querySelector("#item-id").value;

    console.log(id);
    

    if (nome === '') {
        document.querySelector('.msg-return').innerHTML = messagesServidor.nomeObrigatorio;
        document.querySelector('.button').removeAttribute('disabled');
        return;
    }
    if (sobrenome === '') {
        document.querySelector('.msg-return').innerHTML = messagesServidor.sobrenomeObrigatorio;
        document.querySelector('.button').removeAttribute('disabled');
        return;
    }
    if (siape === '') {
        document.querySelector('.msg-return').innerHTML = messagesServidor.siapeObrigatorio;
        document.querySelector('.button').removeAttribute('disabled');
        return;
    }
    if (email === '') {
        document.querySelector('.msg-return').innerHTML = messagesServidor.emailObrigatorio;
        document.querySelector('.button').removeAttribute('disabled');
        return;
    }
    if (telefone === '') {
        document.querySelector('.msg-return').innerHTML = messagesServidor.telefoneObrigatorio;
        document.querySelector('.button').removeAttribute('disabled');
        return;
    }
    if (senha === '' && (id === null || !id || id === '' || id === undefined) ) {
        document.querySelector('.msg-return').innerHTML = messagesServidor.senhaObrigatorio;
        document.querySelector('.button').removeAttribute('disabled');
        return;
    }
    const token = localStorage.getItem('token');

    if (!token) {
        document.querySelector('.msg-return').innerHTML = messagesServidor.internalError;
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = '../../../../public/home/index.html';
        }, 3000);
        return;
    }

    try {
        let response;
        if (id) {
            response = await fetch(`${apiUrlServidor}/servidores/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    nome: nome,
                    sobrenome: sobrenome,
                    siape: siape,
                    email: email,
                    telefone: telefone,
                    senha: senha,
                    ativo: ativo
                })
            });
        } else {
            response = await fetch(`${apiUrlServidor}/servidores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    nome: nome,
                    sobrenome: sobrenome,
                    siape: siape,
                    email: email,
                    telefone: telefone,
                    senha: senha,
                    ativo: ativo
                })
            });
        }

        const data = await response.json();
        
        console.log(response);
        

        if (!response.ok) {
            if (response.status === 400) {
                document.querySelector('.msg-return').innerHTML = data.error || messagesServidor.unknownError;
                document.querySelector('.button').removeAttribute('disabled');
            } else if(response.status === 401){
                document.querySelector('.msg-return').innerHTML = messagesServidor.senhaPequena;
                document.querySelector('.button').removeAttribute('disabled');
            } else if(response.status === 409){
                document.querySelector('.msg-return').innerHTML = data.error || messagesServidor.siapeDuplicado;
                document.querySelector('.button').removeAttribute('disabled');
            } else {
                document.querySelector('.msg-return').innerHTML = data.error || messagesServidor.unknownError;
                document.querySelector('.button').removeAttribute('disabled');
            }
        } else {
            document.querySelector('.msg-return').innerHTML = data.message || 'Sucesso';
            setTimeout(() => {
                document.querySelector('.modal').setAttribute('style', 'display: none');
            }, 1000);
            // precisamos atualizar a lista de servidores
            await getServidores(currentPageServidor, limitServidor);

        }

    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        document.querySelector('.msg-return').innerHTML = messagesServidor.internalError;
        document.querySelector('.button').removeAttribute('disabled');
    }
}


// listagem de servidores

let currentPageServidor = 1;
const limitServidor = 12;
let maxServidor = 0;

async function paginacaoServidor(page) {
    currentPageServidor += page;

    if (currentPageServidor < 1) {
        currentPageServidor = 1;
    }
    if (currentPageServidor > maxServidor) {
        currentPageServidor = maxServidor;
    }

    await getServidores(currentPageServidor, limitServidor);
}

async function getServidores(page, limitServidor) {
    const token = localStorage.getItem('token');

    if (!token) {
        document.querySelector('.msg-return').innerHTML = messagesServidor.internalError;
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = '../../../../public/home/index.html';
        }, 3000);
        return;
    }

    try {
        const response = await fetch(`${apiUrlServidor}/servidores?page=${page}&limit=${limitServidor}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        const data = await response.json();

        console.log('Resposta:', data);

        if (!response.ok) {
            if (response.status === 400) {
                document.querySelector('.msg-return').innerHTML = data.error || messagesServidor.unknownError;
            } else {
                document.querySelector('.pag-indicador').innerHTML = data.error || messagesServidor.unknownError;
            }
        } else {

            maxServidor = Math.ceil(data.pagination.totalItems / limitServidor);
            document.querySelector('.pag-indicador').innerHTML = page || 'Página';
            // precisamos atualizar a lista de servidores
            const tbody = document.querySelector('tbody');
            tbody.innerHTML = '';
            data.data.forEach(item => {
                const row = document.createElement('tr');
                const nomeCell = document.createElement('td');
                nomeCell.textContent = item.nome;

                const sobrenomeCell = document.createElement('td');
                sobrenomeCell.textContent = item.sobrenome;

                const siapeCell = document.createElement('td');
                siapeCell.textContent = item.siape;

                const emailCell = document.createElement('td');
                emailCell.textContent = item.email;

                const telefoneCell = document.createElement('td');
                telefoneCell.textContent = item.telefone;

                const ativoCell = document.createElement('td');
                ativoCell.textContent = item.ativo ? 'Sim' : 'Não';

                const acoesCell = document.createElement('td');
                acoesCell.classList.add('actions');

                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.onclick = () => editItemServidor(item);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.onclick = () => confirmDeleteServidor(item);

                const actionContainer = document.createElement('div');
                actionContainer.classList.add('action-container');

                const actionContainerEdit = document.createElement('div');
                actionContainerEdit.classList.add('action-buttons-edit');
                actionContainerEdit.appendChild(editButton);

                const actionContainerExclude = document.createElement('div');
                actionContainerExclude.classList.add('action-buttons-exclude');
                actionContainerExclude.appendChild(deleteButton);

                actionContainer.appendChild(actionContainerEdit);
                actionContainer.appendChild(actionContainerExclude);

                acoesCell.appendChild(actionContainer);

                row.appendChild(nomeCell);
                row.appendChild(sobrenomeCell);
                row.appendChild(siapeCell);
                row.appendChild(emailCell);
                row.appendChild(telefoneCell);
                row.appendChild(ativoCell);
                row.appendChild(acoesCell);
                tbody.appendChild(row);
            });
        }

    } catch (error) {
        document.querySelector('.msg-return').innerHTML = messagesServidor.internalError;
    }
}



// edição de servidor

function editItemServidor(item) {
    const editModal = { "url": "../screens/servidor/salva-edita-modal-servidor.html" };
    openModalServidor();

    fetch(editModal.url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(".modal-dinamic-content").innerHTML = data;
            document.querySelector('#nome-servidor').value = item.nome;
            document.querySelector('#sobrenome-servidor').value = item.sobrenome;
            document.querySelector('#siape-servidor').value = item.siape;
            document.querySelector('#email-servidor').value = item.email;
            document.querySelector('#telefone-servidor').value = item.telefone;
            document.querySelector('#ativo').checked = item.ativo;
            document.querySelector("#item-id").value = item.id;

            addCloseModalEvent();
        })
        .catch(error => console.error('Error loading content:', error));

}

function openModalServidor() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function closeModalServidor() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}


async function deleteServidor() {

    const token = localStorage.getItem('token');
    const id = document.querySelector("#item-id").value;

    try {
        if (id) {
            const response = await fetch(`${apiUrlServidor}/servidores/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const data = await response.json();

            console.log('Resposta:', data);
            if (!response.ok) {
                if (response.status === 400) {
                    document.querySelector('.msg-return').innerHTML = data.error || messagesServidor.unknownError;
                } else {
                    document.querySelector('.msg-return').innerHTML = data.error || messagesServidor.unknownError;
                }
            } else {
                document.querySelector('.msg-return').innerHTML = data.message || 'Sucesso';
                await getServidores(currentPageServidor, limitServidor);
                setTimeout(() => {
                    document.querySelector('.modal').setAttribute('style', 'display: none');
                }, 1000);
            }
        } else {
            closeModalServidor();
        }
    } catch (error) {
        document.querySelector('.msg-return').innerHTML = messagesServidor.internalError;
    }
}

function confirmDeleteServidor(item) {
    const deleteModal = { "url": "../screens/servidor/exclusao-modal-servidor.html" };
    openModalServidor();

    fetch(deleteModal.url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(".modal-dinamic-content").innerHTML = data;
            document.querySelector("#item-id").value = item.id;
            document.querySelector(".nome-servidor").textContent = item.nome;
            addCloseModalEvent();
        })
}


function addCloseModalEvent() {
    const buttonCancel = document.getElementsByClassName("buttonCancel")[0];
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        closeModalServidor();
    }
    buttonCancel.onclick = function () {
        closeModalServidor();
    }
    window.onclick = function (event) {
        const modal = document.getElementById("myModal");
        if (event.target == modal) {
            closeModalServidor();
        }
    }
}

