/*document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost:3002/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username:username , password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('response').textContent = 'Login successful!';
            localStorage.setItem('token', result.token);
            window.location.href = 'home.html';
        } else {
            document.getElementById('response').textContent = 'Login failed: ' + data.message;
        }
    })
    .catch(error => {
        document.getElementById('response').textContent = 'Error: ' + error.message;
        console.log(error);
    });
    

 });*/
 document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        fetch('http://localhost:3002/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                
                localStorage.setItem('token', data.token);
                window.location.href = './home.html';
            } else {
                document.getElementById('response').textContent = 'Login failed: ' + data.message;
            }
        })
        .catch(error => {
            //document.getElementById('response').textContent = 'Error: ' + error.message;
            console.log(error);
        });
    });
});

