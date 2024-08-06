//Crear un array donde vamos a guardar las notas.
//Agregar un par de notas de prueba.
let notas = [
    { id: 1, titulo: "Mantenimiento moto", texto: "Cambio de aceite y pastillas de freno", realizada: false},
    { id: 2, titulo: "Limpieza casa", texto: "Sacar basura, limpiar cocina", realizada: true},
    { id: 3, titulo: "Programacion", texto: "Sprint #3 - Ajustar detalles de diseño", realizada: false},
    { id: 4, titulo: "Freya", texto: "Paseo en el parque", realizada: true}
];

//Crear una variable idGlobal e inicializala en el mismo valor del ultimo id que creaste manualmente, usaremos esto como control de las notas.
let idGlobal = 4;

function crearInterfaz() {
    const app = document.getElementById('container');
    app.innerHTML = `
        <div class="container mt-5">
            <h1 class="mb-4 text-center nombre text-light">Aplicación de Notas</h1>
            <div class="row mb-3">
                <div class="col-md-12">
                    <input type="text" id="titulo" class="form-control mb-2 border border-primary text" placeholder="Título">
                    <textarea id="texto" class="form-control mb-2 border border-primary" placeholder="Texto de la nota"></textarea>
                    <button onclick="guardarNota()" class="btn btn-primary me-2">Guardar</button>
                    <button onclick="limpiarCampos()" class="btn btn-secondary">Limpiar</button>
                </div>
                <div class="col-md-6">
                    <input type="text" id="filtro-texto" class="form-control mb-2 border border-primary text" placeholder="Buscar notas" oninput="aplicarFiltros()">
                    <div class="form-check form-switch">
                        <input type="checkbox" id="filtro-realizadas" class="form-check-input border border-primary" role="switch" onchange="aplicarFiltros()">
                        <label class="form-check-label" for="filtro-realizadas">Mostrar solo realizadas</label>
                    </div>
                </div>
            </div>
            <div id="contenedor-notas" class="row"></div>
        </div>
    `;
}

function pintarNotas(notasFiltradas = notas) { //Crear una función que pinte las notas en forma de tarjetas dentro del div contenedor.
    const contenedor = document.getElementById("contenedor-notas");
    contenedor.innerHTML = "";

    if (notasFiltradas.length === 0) {
        contenedor.innerHTML = '<div class="col-12"><p class="alert alert-info">NO HAY NOTAS PARA MOSTRAR</p></div>';
        return;
    }

    notasFiltradas.forEach(nota => {
        const notaElement = document.createElement('div');
        notaElement.className = 'col-md-4 mb-3';
        //Crear un div que va a ser el contenedor de las notas.
        notaElement.innerHTML = `
            <div class="card">
                <div class="card-body border border-primary rounded-2">
                    <h5 class="card-title">${nota.titulo}</h5>
                    <p class="card-text ${nota.realizada ? 'text-decoration-line-through' : ''}">${nota.texto}</p>
                    <div class="form-check mb-2">
                        <input class="form-check-input me-2 border border-primary" type="checkbox" id="checkbox-${nota.id}" ${nota.realizada ? 'checked' : ''} onchange="marcarRealizada(${nota.id})">
                        <label class="form-check-label" for="checkbox-${nota.id}">Realizada</label>
                    </div>
                    <button onclick="borrarNota(${nota.id})" class="btn btn-danger btn-sm border border-primary">Borrar nota</button>
                </div>
            </div>
        `;
        contenedor.appendChild(notaElement);
    });
}

function agregarNota(titulo, texto) {
    idGlobal++;
    const nuevaNota = { id: idGlobal, titulo, texto, realizada: false };
    notas.push(nuevaNota);
}

function guardarNota() {
    const titulo = document.getElementById("titulo").value;
    const texto = document.getElementById("texto").value;
    
    if (titulo.trim() !== "" && texto.trim() !== "") {
        agregarNota(titulo, texto);
        aplicarFiltros();
        limpiarCampos();
    } else {
        alert("Por favor, completa todos los campos");
    }
}

function borrarNota(id) {
    notas = notas.filter(nota => nota.id !== id);
    aplicarFiltros();
}

function limpiarCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("texto").value = "";
}

function marcarRealizada(id) {
    const nota = notas.find(nota => nota.id === id);
    if (nota) {
        nota.realizada = !nota.realizada;
        aplicarFiltros();
    }
}

function filtrarPorRealizada(array) {
    return array.filter(nota => nota.realizada);
}

function filtrarPorTexto(array, texto) {
    if (!texto) return array;
    return array.filter(nota => 
        nota.titulo.toLowerCase().includes(texto.toLowerCase()) || 
        nota.texto.toLowerCase().includes(texto.toLowerCase())
    );
}

function aplicarFiltros() {
    const textoFiltro = document.getElementById("filtro-texto").value;
    const soloRealizadas = document.getElementById("filtro-realizadas").checked;

    let notasFiltradas = [...notas];

    if (soloRealizadas) {
        notasFiltradas = filtrarPorRealizada(notasFiltradas);
    }

    notasFiltradas = filtrarPorTexto(notasFiltradas, textoFiltro);

    pintarNotas(notasFiltradas);
}

document.addEventListener("DOMContentLoaded", () => {
    crearInterfaz();
    aplicarFiltros();
});