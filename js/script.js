// Cargar usuarios existentes o usar por defecto
let users = JSON.parse(localStorage.getItem('users')) || [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user1", password: "user123", role: "user" }
];

// Guardar cambios si se cargaron por primera vez
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Inicio de sesión
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        login(username, password);
    });
}

// Registro
const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("new-username").value;
        const password = document.getElementById("new-password").value;

        // Verificar duplicado
        const exists = users.find(u => u.username === username);
        if (exists) {
            alert("Este usuario ya existe.");
            return;
        }

        // Agregar y guardar nuevo usuario
        const newUser = { username, password, role: "user" };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Usuario registrado exitosamente.");
        window.location.href = "index.html";
    });
}

// Función login
function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        alert("Credenciales incorrectas.");
    }
}

