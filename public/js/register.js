// la repeticion de contraseña debe coincidir con la contraseña

const repassword = document.getElementById('repassword');
const password = document.getElementById('password');
const form = document.getElementById('form');
const error = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let messages = [];
    if (password.value !== repassword.value) {
        messages.push('Las contraseñas no coinciden');
    }
    if (messages.length > 0) {
        e.preventDefault();
        error.innerText = messages.join(', ');
    }
});
