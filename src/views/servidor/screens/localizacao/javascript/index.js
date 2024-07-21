
const apiUrl = process.env.API_URL;  // Obtém a URL da API do arquivo .env

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

    if (descricao === '') {
        document.querySelector('.msg-return').innerHTML = messages.descriptionRequired;
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
        const response = await fetch(`${apiUrl}/localizacoes`, {
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

        const data = await response.json();
        console.log('Response:', data.error, response);

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
                        acoesCell.textContent = 'Editar | Excluir';

                        row.appendChild(descricaoCell);
                        row.appendChild(ativoCell);
                        row.appendChild(acoesCell);
                        tbody.appendChild(row);
                    });
        }
        
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        document.querySelector('.msg-return').innerHTML = messages.internalError;
    }
}