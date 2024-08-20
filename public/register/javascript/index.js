document.getElementById('cancel').addEventListener('click', function () {
    window.location.href = '../home/index.html';
});

const messages = {
    registering: 'Cadastrando conta...',
    alreadyRegistered: 'RA já cadastrado! Tente recuperar sua senha.',
    error: 'Erro ao cadastrar conta. Tente novamente mais tarde.',
    credentialError: 'RA ou senha incorretos. Tente novamente.',
    success: 'Sucesso! Redirecionando para a página de login...'
};

document.addEventListener('DOMContentLoaded', () => {
    const telefoneInput = document.getElementById('telefone-cronos');

    telefoneInput.addEventListener('input', () => {
        let value = telefoneInput.value;
        value = value.replace(/\D/g, '');

        if (value.length <= 7) {
            telefoneInput.value = value;
        }
        else if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            value = value.replace(/(\d{2})(\d{0,4})/, '$1-$2');
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
        telefoneInput.value = value;
    });
});

document.getElementById('cad-form-cronos').addEventListener('submit', async function (event) {
    document.querySelector('.msg-return').innerHTML = messages.registering;
    document.getElementById('registerButton').disabled = true;

    event.preventDefault();
    const ra = document.getElementById('ra-cronos').value;
    const password = document.getElementById('password-cronos').value;
    const telefone = document.getElementById('telefone-cronos').value;

    const response = await fetch(`${process.env.API_PUBLIC_STUDENT}/create/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ra, password, telefone })
    });

    if (!response.ok) {
        if (response.status === 401) {
            document.getElementById('registerButton').disabled = false;
            document.querySelector('.msg-return').innerHTML = messages.credentialError;
        } else {
            document.getElementById('registerButton').disabled = false;
            document.querySelector('.msg-return').innerHTML = messages.error;
        }
    } else {
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
            document.getElementById('registerButton').disabled = false;
            document.querySelector('.msg-return').innerHTML = messages.alreadyRegistered;
        } else if (response.status === 201) {
            document.getElementById('registerButton').disabled = false;
            document.querySelector('.msg-return').innerHTML = messages.success;
            setTimeout(() => {
                window.location.href = '../login/index.html';
            }, 3000);
        } else {
            document.getElementById('registerButton').disabled = false;
            document.querySelector('.msg-return').innerHTML = messages.error;
        }
    }
});