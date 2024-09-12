const button = document.getElementById('SignUp-btn');
const name = document.getElementById('Name');
const email = document.getElementById('Email');
const password = document.getElementById('Password');

button.addEventListener('click', () => {
    try {
        fetch('http://localhost:3000/createUser', {  // Replace with your server URL
            method: 'POST',  // Use the correct HTTP method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Success:', data);
        })
        .catch(error => {
           alert.error('Error:', error);
        });
    } catch (error) {
        alert.error('Error:', error);
    }

    name.value = '';
    email.value = '';
    password.value = '';
});
