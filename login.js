document.getElementById('Login-btn').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        
        if (result.status === true) {
            // Redirect to homepage.html
            localStorage.setItem('authToken', result.token);

            window.location.href = 'homepage.html';
        } else {
            console.log(result.message); // Show error message
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }

});





