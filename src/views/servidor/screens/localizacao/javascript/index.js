
const apiUrl = process.env.API_SECURE_SERVER;

const messages = {
    saving: 'Salvando...',
    descriptionRequired: 'O campo descrição é obrigatório',
    internalError: 'Erro Interno: Entre novamente no sistema',
    unknownError: 'Erro desconhecido'
};

async function salvarLocalizacao() {
    document.querySelector('.msg-return').innerHTML = messages.saving;
    document.querySelector('.button').setAttribute('disabled', 'disabled');

    const descricao = document.querySelector('#nome-localizacao').value;
    const ativo = document.querySelector('#ativo').checked ? 1 : 0;
    const id = document.querySelector("#item-id").value;

    if (descricao === '') {
        document.querySelector('.msg-return').innerHTML = messages.descriptionRequired;
        document.querySelector('.button').removeAttribute('disabled');
        return;
    }
    const token = localStorage.getItem('token');

    if (!token) {
        document.querySelector('.msg-return').innerHTML = messages.internalError;
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = '../../../../public/home/index.html';
        }, 3000);
        return;
    }

    try {
        let response;
        if (id) {
            response = await fetch(`${apiUrl}/localizacoes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    descricao: descricao,
                    ativo: ativo
                })
            });
        } else {
            response = await fetch(`${apiUrl}/localizacoes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    descricao: descricao,
                    ativo: ativo
                })
            });
        }

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 400) {
                document.querySelector('.msg-return').innerHTML = data.error || messages.unknownError;
                document.querySelector('.button').removeAttribute('disabled');
            } else {
                document.querySelector('.msg-return').innerHTML = data.error || messages.unknownError;
                document.querySelector('.button').removeAttribute('disabled');
            }
        } else {
            document.querySelector('.msg-return').innerHTML = data.message || 'Sucesso';
            setTimeout(() => {
                document.querySelector('.modal').setAttribute('style', 'display: none');
            }, 1000);
            // precisamos atualizar a lista de localizações
            await getLocalizacoes(currentPage, limit);

        }

    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        document.querySelector('.msg-return').innerHTML = messages.internalError;
        document.querySelector('.button').removeAttribute('disabled');
    }
}


// listagem de localizações

let currentPage = 1;
const limit = 12;
let max = 0;

async function pageFlow(page) {
    currentPage += page;

    if (currentPage < 1) {
        currentPage = 1;
    }
    if (currentPage > max) {
        currentPage = max;
    }

    await getLocalizacoes(currentPage, limit);
}

async function getLocalizacoes(page, limit) {
    const token = localStorage.getItem('token');

    if (!token) {
        document.querySelector('.msg-return').innerHTML = messages.internalError;
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = '../../../../public/home/index.html';
        }, 3000);
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/localizacoes?page=${page}&limit=${limit}`, {
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
                document.querySelector('.msg-return').innerHTML = data.error || messages.unknownError;
            } else {
                document.querySelector('.pag-indicador').innerHTML = data.error || messages.unknownError;
            }
        } else {

            max = Math.ceil(data.pagination.totalItems / limit);
            document.querySelector('.pag-indicador').innerHTML = page || 'Página';
            // precisamos atualizar a lista de localizações
            const tbody = document.querySelector('tbody');
            tbody.innerHTML = '';
            data.data.forEach(item => {
                const row = document.createElement('tr');
                const descricaoCell = document.createElement('td');
                descricaoCell.textContent = item.descricao;
                const ativoCell = document.createElement('td');
                ativoCell.textContent = item.ativo ? 'Sim' : 'Não';
                const acoesCell = document.createElement('td');
                acoesCell.classList.add('actions');

                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.onclick = () => editItem(item);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.onclick = () => confirmDelete(item);

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

                row.appendChild(descricaoCell);
                row.appendChild(ativoCell);
                row.appendChild(acoesCell);
                tbody.appendChild(row);
            });
        }

    } catch (error) {
        document.querySelector('.msg-return').innerHTML = messages.internalError;
    }
}



// edição de localização

function editItem(item) {
    const editModal = { "url": "../screens/localizacao/save-edit-modal-localizacao.html" };
    openModal();

    fetch(editModal.url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(".modal-dinamic-content").innerHTML = data;
            document.querySelector('#nome-localizacao').value = item.descricao;
            document.querySelector('#ativo').checked = item.ativo;
            document.querySelector("#item-id").value = item.id;

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


async function deleteItem() {

    const token = localStorage.getItem('token');
    const id = document.querySelector("#item-id").value;

    try {
        if (id) {
            const response = await fetch(`${apiUrl}/localizacoes/${id}`, {
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
                    document.querySelector('.msg-return').innerHTML = data.error || messages.unknownError;
                } else {
                    document.querySelector('.msg-return').innerHTML = data.error || messages.unknownError;
                }
            } else {
                document.querySelector('.msg-return').innerHTML = data.message || 'Sucesso';
                await getLocalizacoes(currentPage, limit);
                setTimeout(() => {
                    document.querySelector('.modal').setAttribute('style', 'display: none');
                }, 1000);
            }
        } else {
            closeModal();
        }
    } catch (error) {
        document.querySelector('.msg-return').innerHTML = messages.internalError;
    }
}

function confirmDelete(item) {
    const deleteModal = { "url": "../screens/localizacao/exclude-confirm-modal-localizacao.html" };
    openModal();

    fetch(deleteModal.url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(".modal-dinamic-content").innerHTML = data;
            document.querySelector("#item-id").value = item.id;
            document.querySelector(".nome-localizacao").textContent = item.descricao;
            addCloseModalEvent();
        })
}


function addCloseModalEvent() {
    const buttonCancel = document.getElementsByClassName("buttonCancel")[0];
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        closeModal();
    }
    buttonCancel.onclick = function () {
        closeModal();
    }
    window.onclick = function (event) {
        const modal = document.getElementById("myModal");
        if (event.target == modal) {
            closeModal();
        }
    }
}