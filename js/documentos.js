// Función para manejar el formulario de creación de documento
document.getElementById("create-document-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const documentName = document.getElementById("document-name").value;
    const documentFile = document.getElementById("document-file").files[0];

    if (!documentName || !documentFile) {
        alert("Por favor completa todos los campos.");
        return;
    }

    // Simular almacenamiento (puedes usar localStorage para simular una 'BD')
    const documentosGuardados = JSON.parse(localStorage.getItem("documentos")) || [];

    const nuevoDocumento = {
        id: Date.now(),
        name: documentName,
        fileName: documentFile.name
    };

    documentosGuardados.push(nuevoDocumento);
    localStorage.setItem("documentos", JSON.stringify(documentosGuardados));

    alert("Documento creado exitosamente.");
    window.location.href = "dashboard.html";
});

// Función para cancelar y volver al dashboard
function cancelCreate() {
    window.location.href = "dashboard.html";
}
