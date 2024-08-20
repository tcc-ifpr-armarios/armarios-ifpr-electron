
const apiURLEstudante = process.env.API_SECURE_STUDENT;

const messagesEstudante = {
    saving: 'Salvando...',
    raRequired: 'O campo RA é obrigatório',
    nameRequired: 'O campo Nome é obrigatório',
    emailRequired: 'O campo E-mail é obrigatório',
    phoneRequired: 'O campo Telefone é obrigatório',
    internalError: 'Erro Interno: Entre novamente no sistema',
    unknownError: 'Erro desconhecido'
};

async function salvarEstudante() {
    document.querySelector('.msg-return').innerHTML = messagesEstudante.saving;
    document.querySelector('.button').setAttribute('disabled', 'disabled');

    const ra = document.querySelector('#ra-estudante').value;
    const nome = document.querySelector('#nome-estudante').value;
    const sobrenome = document.querySelector('#sobrenome-estudante').value;
    const email = document.querySelector('#email-estudante').value;
    const telefone = document.querySelector('#telefone-estudante').value;
    const senha = document.querySelector('#senha-estudante').value;
    const ativo = document.querySelector('#ativo').checked ? 1 : 0;
    const id = document.querySelector("#item-id").value;

    if (ra === '') {
        document.querySelector('.msg-return').innerHTML = messagesEstudante.raRequired;
        document.querySelector('.button').removeAttribute('disabled');
        return;
    }
    if (nome === '') {
        document.querySelector('.msg-return').innerHTML = messagesEstudante.nameRequired;
        document.querySelector('.button').removeAttribute('disabled');
        return;
    }
    if (email === '') {
        document.querySelector('.msg-return').innerHTML = messagesEstudante.emailRequired;
        document.querySelector('.button').removeAttribute('disabled');
        return;
    }
    if (telefone === '') {
        document.querySelector('.msg-return').innerHTML = messagesEstudante.phoneRequiredRequired;
        document.querySelector('.button').removeAttribute('disabled');
        return;
    }
    const token = localStorage.getItem('token');

    if (!token) {
        document.querySelector('.msg-return').innerHTML = messagesEstudante.internalError;
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = '../../../../public/home/index.html';
        }, 3000);
        return;
    }

    try {
        let response;
        if (id) {
            response = await fetch(`${apiURLEstudante}/estudantes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    ra: ra,
                    nome: nome,

                    sobrenome: sobrenome,
                    emial: email,
                    telefone: telefone,
                    senha: senha,
                    ativo: ativo
                })
            });
        } else {
            response = await fetch(`${apiURLEstudante}/estudantes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    ra: ra,
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    ativo: ativo,
                    telefone: telefone,
                    senha: senha
                })
            });
        }

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 400) {
                document.querySelector('.msg-return').innerHTML = data.error || messagesEstudante.unknownError;
                document.querySelector('.button').removeAttribute('disabled');
            } else {
                document.querySelector('.msg-return').innerHTML = data.error || messagesEstudante.unknownError;
                document.querySelector('.button').removeAttribute('disabled');
            }
        } else {
            document.querySelector('.msg-return').innerHTML = data.message || 'Sucesso';
            setTimeout(() => {
                document.querySelector('.modal').setAttribute('style', 'display: none');
            }, 1000);
            // precisamos atualizar a lista de estudantes
            await getEstudantes(currentPageEstudante, limitEstudante);

        }

    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        document.querySelector('.msg-return').innerHTML = messagesEstudante.internalError;
        document.querySelector('.button').removeAttribute('disabled');
    }
}


// listagem de estudantes

let currentPageEstudante = 1;
const limitEstudante = 10;
let maxEstudante = 0;

async function pageFlow(page) {
    currentPageEstudante += page;

    if (currentPageEstudante < 1) {
        currentPageEstudante = 1;
    }
    if (currentPageEstudante > maxEstudante) {
        currentPageEstudante = maxEstudante;
    }

    await getEstudantes(currentPageEstudante, limitEstudante);
}

async function getEstudantes(page, limitEstudante) {
    const token = localStorage.getItem('token');

    if (!token) {
        document.querySelector('.msg-return').innerHTML = messagesEstudante.internalError;
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = '../../../../public/home/index.html';
        }, 3000);
        return;
    }

    try {
        const response = await fetch(`${apiURLEstudante}/estudantes?page=${page}&limitEstudante=${limitEstudante}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 400) {
                document.querySelector('.msg-return').innerHTML = data.error || messagesEstudante.unknownError;
            } else {
                document.querySelector('.pag-indicador').innerHTML = data.error || messagesEstudante.unknownError;
            }
        } else {

            maxEstudante = Math.ceil(data.pagination.totalItems / limitEstudante);
            document.querySelector('.pag-indicador').innerHTML = page || 'Página';
            // precisamos atualizar a lista de estudantes
            const tbody = document.querySelector('tbody');
            tbody.innerHTML = '';
            data.data.forEach(item => {
                const row = document.createElement('tr');
                const raCell = document.createElement('td');
                raCell.textContent = item.ra;
                const nomeCell = document.createElement('td');
                nomeCell.textContent = item.nome;
                const sobrenomeCell = document.createElement('td');
                sobrenomeCell.textContent = item.sobrenome;
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

                row.appendChild(raCell);
                row.appendChild(nomeCell);
                row.appendChild(sobrenomeCell);
                row.appendChild(emailCell);
                row.appendChild(telefoneCell);
                row.appendChild(ativoCell);
                row.appendChild(acoesCell);
                tbody.appendChild(row);
            });
        }

    } catch (error) {
        document.querySelector('.msg-return').innerHTML = messagesEstudante.internalError;
    }
}



// edição de localização

function editItem(item) {
    const editModal = { "url": "../screens/estudante/save-edit-modal-estudante.html" };
    openModal();

    fetch(editModal.url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(".modal-dinamic-content").innerHTML = data;
            document.querySelector('#ra-estudante').value = item.ra;
            document.querySelector('#nome-estudante').value = item.nome;
            document.querySelector('#sobrenome-estudante').value = item.sobrenome;
            document.querySelector('#email-estudante').value = item.email;
            document.querySelector('#telefone-estudante').value = item.telefone;
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
            const response = await fetch(`${apiURLEstudante}/estudantes/${id}`, {
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
                    document.querySelector('.msg-return').innerHTML = data.error || messagesEstudante.unknownError;
                } else {
                    document.querySelector('.msg-return').innerHTML = data.error || messagesEstudante.unknownError;
                }
            } else {
                document.querySelector('.msg-return').innerHTML = data.message || 'Sucesso';
                await getEstudantes(currentPageEstudante, limitEstudante);
                setTimeout(() => {
                    document.querySelector('.modal').setAttribute('style', 'display: none');
                }, 1000);
            }
        } else {
            closeModal();
        }
    } catch (error) {
        document.querySelector('.msg-return').innerHTML = messagesEstudante.internalError;
    }
}

function confirmDelete(item) {
    const deleteModal = { "url": "../screens/estudante/exclude-confirm-modal-estudante.html" };
    openModal();

    fetch(deleteModal.url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(".modal-dinamic-content").innerHTML = data;
            document.querySelector("#item-id").value = item.id;
            document.querySelector(".nome-estudante").textContent = item.descricao;
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