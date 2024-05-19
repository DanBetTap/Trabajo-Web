document.addEventListener("DOMContentLoaded", () => {
    const updateForm = document.getElementById('update-form');
    
    updateForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        // Aquí puedes agregar la lógica para actualizar la información
        console.log('Información actualizada:', { email, address });

        alert('Información actualizada correctamente.');
    });
});

