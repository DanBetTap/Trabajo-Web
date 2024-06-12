document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrors();

        let isValid = true;

        if (!checkEmptyFields()) isValid = false;
        if (!validateNombre()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateTelefono()) isValid = false;
        if (!validateRUT()) isValid = false;
        if (!validateBirthdate()) isValid = false;
        if (!validatePassword()) isValid = false;

        if (isValid) {
            form.submit();
        }
    });

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
    }

    function showError(input, message) {
        const error = document.createElement('div');
        error.classList.add('error-message');
        error.textContent = message;
        input.parentNode.insertBefore(error, input.nextSibling);
    }

    function checkEmptyFields() {
        const fields = [
            { id: 'nombre', name: 'nombre completo' },
            { id: 'email', name: 'email' },
            { id: 'telefono', name: 'número de teléfono' },
            { id: 'rut', name: 'RUT' },
            { id: 'birthdate', name: 'fecha de nacimiento' },
            { id: 'password', name: 'contraseña' },
            { id: 'confirm-password', name: 'confirmar contraseña' }
        ];

        let allFilled = true;

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            if (input.value.trim() === '') {
                showError(input, `Ingresar ${field.name}.`);
                allFilled = false;
            }
        });

        return allFilled;
    }

    function validateNombre() {
        const nombre = document.getElementById('nombre');
        if (nombre.value.trim() === '') return false;

        const regex = /^[a-zA-Z\s]+$/;

        if (!regex.test(nombre.value)) {
            showError(nombre, 'El nombre completo solo debe contener letras y espacios.');
            return false;
        }
        return true;
    }

    function validateEmail() {
        const email = document.getElementById('email');
        if (email.value.trim() === '') return false;

        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        if (!regex.test(email.value)) {
            showError(email, 'El email no es válido.');
            return false;
        }
        return true;
    }

    function validateTelefono() {
        const telefono = document.getElementById('telefono');
        if (telefono.value.trim() === '') {
            showError(telefono, 'El número de teléfono no puede estar vacío.');
            return false;
        }
    
        const regex = /^\d{8}$/;
    
        if (!regex.test(telefono.value)) {
            showError(telefono, 'El número de teléfono debe contener exactamente 8 dígitos.');
            return false;
        }
        return true;
    }
    

    function validateRUT() {
        const rut = document.getElementById('rut');
        if (rut.value.trim() === '') return false;

        if (!Fn.validaRut(rut.value)) {
            showError(rut, 'El RUT no es válido.');
            return false;
        }
        return true;
    }

    function validateBirthdate() {
        const birthdate = document.getElementById('birthdate');
        if (birthdate.value.trim() === '') return false;

        const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;

        if (!regex.test(birthdate.value)) {
            showError(birthdate, 'La fecha de nacimiento no es válida. Formato: DD/MM/YYYY');
            return false;
        }

        const [day, month, year] = birthdate.value.split('/').map(Number);
        const birthDate = new Date(year, month - 1, day);
        const age = new Date().getFullYear() - birthDate.getFullYear();

        if (age < 18 || (age === 18 && new Date() < new Date(year + 18, month - 1, day))) {
            showError(birthdate, 'Debes ser mayor de edad.');
            return false;
        }
        return true;
    }

    function validatePassword() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        if (password.value.trim() === '' || confirmPassword.value.trim() === '') return false;

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}$/;

        if (!regex.test(password.value)) {
            showError(password, 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
            return false;
        }

        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Las contraseñas no coinciden.');
            return false;
        }
        return true;
    }

    const Fn = {
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-");
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false;
            const tmp = rutCompleto.split('-');
            let digv = tmp[1];
            const rut = tmp[0];
            if (digv === 'K') digv = 'k';

            return (Fn.dv(rut) == digv);
        },
        dv: function (T) {
            let M = 0, S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        }
    };
});
