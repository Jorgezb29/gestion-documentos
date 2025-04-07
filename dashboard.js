// Obtener el usuario de sessionStorage
const user = JSON.parse(sessionStorage.getItem('loggedUser'));
if (!user) {
    window.location.href = "index.html";
} else {
    document.getElementById("welcome-message").textContent = `Hola, ${user.username} (${user.role})`;
}

// Verificar si existen oficinas en sessionStorage
let offices = JSON.parse(sessionStorage.getItem('offices')) || [];
if (offices.length === 0) {
    // Si no existen, crear datos de prueba
    offices = [{
        documents: [
            { id: "1", name: "Documento 1", file: "documento1.pdf" },
            { id: "2", name: "Documento 2", file: "documento2.docx" }
        ],
        externalDocuments: [
            { id: "3", name: "Documento Externo 1", file: "documento3.xlsx" }
        ],
        sharedDocuments: []
    }];
    sessionStorage.setItem('offices', JSON.stringify(offices));
    console.log("Inicializando datos de prueba de oficinas:", offices); // Para depuración
} else {
    console.log("Datos de oficinas encontrados en sessionStorage:", offices); // Para depuración
}

let office = offices[0];   // Suponiendo que solo tenemos una oficina
console.log("Oficina actual:", office); // Para depuración

// Función para cargar y mostrar los documentos
function loadDocuments() {
    console.log("Cargando documentos...");

    // Verifica si se ha encontrado la oficina y los documentos
    if (office) {
        loadDocumentList(office.documents, 'internal-documents-list');
        loadDocumentList(office.externalDocuments, 'external-documents-list');
        loadDocumentList(office.sharedDocuments, 'shared-documents-list');
    } else {
        console.log("No se encontró la oficina en sessionStorage.");
    }

    console.log("Documentos cargados.");
}

// Cargar la lista de documentos
function loadDocumentList(documents, listId) {
    const list = document.getElementById(listId);
    list.innerHTML = '';  // Limpiar la lista antes de agregar elementos

    console.log(`Cargando lista para ${listId} con documentos:`, documents);  // Depuración

    if (documents && documents.length > 0) {
        documents.forEach(doc => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="document-name">${doc.name}</span> (${doc.file})
                <button onclick="editDocument('${doc.id}')">✏️ Editar</button>
                <button onclick="deleteDocument('${doc.id}')">🗑️ Eliminar</button>
            `;
            list.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "No hay documentos en esta sección.";
        list.appendChild(li);
    }
}

// Función para agregar un documento (interno o externo)
function addDocument(type) {
    const name = prompt("Nombre del documento:");
    const file = prompt("Nombre del archivo:");

    if (name && file) {
        const newDoc = {
            id: Date.now().toString(),
            name: name,
            file: file,
        };

        // Añadir a la sección correspondiente
        if (type === 'internal') {
            office.documents.push(newDoc);
        } else if (type === 'external') {
            office.externalDocuments.push(newDoc);
        }

        // Actualizar datos en sessionStorage
        updateOfficeData();
        loadDocuments();
    }
}

// Función para actualizar los datos en sessionStorage
function updateOfficeData() {
    sessionStorage.setItem('offices', JSON.stringify([office]));
    console.log("Datos de oficinas actualizados en sessionStorage:", [office]);  // Para depuración
}

// Función para editar un documento
function editDocument(id) {
    const doc = [...office.documents, ...office.externalDocuments, ...office.sharedDocuments].find(d => d.id === id);
    if (doc) {
        const newName = prompt("Nuevo nombre del documento:", doc.name);
        const newFile = prompt("Nuevo nombre del archivo:", doc.file);

        if (newName && newFile) {
            doc.name = newName;
            doc.file = newFile;
            updateOfficeData();
            loadDocuments();
        }
    }
}

// Función para eliminar un documento
function deleteDocument(id) {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este documento?");
    if (confirmDelete) {
        office.documents = office.documents.filter(doc => doc.id !== id);
        office.externalDocuments = office.externalDocuments.filter(doc => doc.id !== id);
        office.sharedDocuments = office.sharedDocuments.filter(doc => doc.id !== id);
        updateOfficeData();
        loadDocuments();
    }
}

// Función para alternar la visibilidad de las secciones
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.toggle('hidden');
}

// Función para cerrar sesión
function logout() {
    sessionStorage.removeItem('loggedUser');
    window.location.href = "index.html";
}

loadDocuments();
