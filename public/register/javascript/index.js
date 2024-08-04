document.getElementById('cancel').addEventListener('click', function () {
    window.location.href = '../home/index.html';
});



document.getElementById('cad-form-cronos').addEventListener('submit', async function (event) {
    event.preventDefault();
    const ra = document.getElementById('ra-cronos').value;
    const password = document.getElementById('password-cronos').value;

    const response = await fetch(`${process.env.API_PUBLIC_STUDENT}/create/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ra, password })
    });

    if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
    } else {
        const data = await response.json();
        console.log(data);
    }

    const data = await response.json();

    console.log(data);


});


async function loginCronos(raForm, passwordForm, telefoneForm) {
    const response = await fetch(`${process.env.API_CRONOS}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ra: raForm,
            senha: passwordForm,
            telefone: telefoneForm
        }),
    });

    if (response.status === 401) {
        console.error('Unauthorized: Check your credentials');
    } else if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
    } else {
        const data = await response.json();
        console.log(data);
    }

    const data = await response.json();

    console.log(data);

    if (data.error) {
        alert(data.error);
    } else {
        window.location.href = '../home/index.html';
    }
}


async function buscaRaLocal(raForm) {


}