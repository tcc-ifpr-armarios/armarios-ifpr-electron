
const apiUrl = process.env.API_URL;  // Obtém a URL da API do arquivo .env

const messages = {
    saving: 'Salvando...',
    descriptionRequired: 'O campo descrição é obrigatório',
    internalError: 'Erro Interno: Entre novamente no sistema'
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
                document.querySelector('.msg-return').innerHTML = data.error || 'Erro desconhecido'; 
                document.querySelector('.button').removeAttribute('disabled');
            } else {
                document.querySelector('.msg-return').innerHTML = data.error || 'Erro desconhecido'; 
                document.querySelector('.button').removeAttribute('disabled');
            }
        } else {
            document.querySelector('.msg-return').innerHTML = data.message || 'Sucesso';
            setTimeout(() => {
                document.querySelector('.modal').setAttribute('style', 'display: none');
            }, 1000);
            // precisamos atualizar a lista de localizações

        }
        
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        document.querySelector('.msg-return').innerHTML = messages.internalError;
        document.querySelector('.button').removeAttribute('disabled');
    }
}
