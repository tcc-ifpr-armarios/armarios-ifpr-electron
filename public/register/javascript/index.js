document.getElementById('cancel').addEventListener('click', function () {
    window.location.href = '../home/index.html';
});

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

        console.log(value.length);


        telefoneInput.value = value;
    });
});


document.getElementById('cad-form-cronos').addEventListener('submit', async function (event) {
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
        console.error(`HTTP error! status: ${response.status}`);
    } else {
        const data = await response.json();
        console.log(data);
    }

    const data = await response.json();

    console.log(data + "Aqui no front");


});