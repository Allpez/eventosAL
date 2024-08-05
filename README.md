En este repositorio se encuentra el taller para practica de l tema EVENTOS y el DOM, creada con HTML, CSS t JVASCRIPT.

Eventos
1. Crear una aplicación que calcule el índice de masa corporal. Al precionar el boton Calcular debera mostrar el resultado en el input correspondiente.
2. Crear una aplicación de conversion de divisa. Debera tener los valores por defecto, por ejemplo 1 dólar = 140 pesos precio ejemplo, y al hacer algun cambio en alguno de los inputs se debera ver reflejado su correspondiente valor en la moneda a convertir.
3. Realizar una aplicación de notas (el front queda a gusto de cada uno).
a. Crear un array donde vamos a guardar las notas
b. Agregar un par de notas de prueba como la siguiente
c. Crear una variable idGlobal e inicializala en el mismo valor del ultimo id que creaste manualmente, usaremos esto como control de las notas.
d. Crear un div que va a ser el contenedor de las notas.
e. Crear una función que pinte las notas en forma de tarjetas dentro del div contenedor.
f. Sobre el div contenedor, crear una pequeña interfaz para crear nuevas notas: Un input de texto para el titulo, un textarea para el texto y 2 botones, uno para guardar la nota nueva y otro para limpiar los campos.
g. Crear una función agregarNota la cual necesitara 2 parametros: titulo y texto. La cual deberá crear un objeto de tipo nota como en el punto b y agregarlo al array de notas.
h. Al presionar el botón guardar deberá guardar en variables los valores de los inputs y verificar si no están vacíos, en cuyo caso deberá llamar a la función que agregara la nueva nota y paso seguido volver a pintar las notas en la pantalla.
i. Agregar en el template de la tarjeta en la función que pinta un botón con texto “borrar nota” para borrar la nota, para este caso usaremos la propiedad onClick de la etiqueta button y dentro de ella llamaremos a una función que crearemos llamada borrarNota() que recibirá como parámetro el id de la misma. borrarNota(${elemento.id}).
j. Crearemos la función borrarNota la cual necesitara el parámetro id. La misma deberá eliminar el elemento cuyo id sea igual al recibido por parámetro y volver a pintar las notas para ver reflejado el cambio.
k. Agregar una validación en la función que pinta las tarjetas, la cual deberá mostrar un mensaje dentro del div contenedor que diga NO HAY NOTAS PARA MOSTRAR en caso de no haber elementos en el array.
l. Al hacer click en el botón borrar que esta junto con el botón guardar se deberán limpiar los campos de titulo y de texto.
m. Agregar en el template que pinta las tarjetas un checkbox de la siguiente manera: `<input onClick="marcarRealizada(${nota.id})" type="checkbox" ${nota.realizada? "checked": ""}>`. El signo de pregunta representa un operador ternario que funciona como un if (https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), el cual devolverá checked al input y lo colocara como marcado si la propiedad realizada es true y caso contrario no lo hará.
n. Crear la función marcarRealizada la cual recibirá como parámetro un id y deberá buscar el elemento dentro del array y cambiar la propiedad realizada por el valor contrario al que ya posee y volver a pintar los elementos en pantalla para verlo reflejado.
o. Crear un par de inputs para realizar filtro por texto y por notas realizadas.
p. Crear una función que filtre por el estado realizada, la función deberá recibir como parámetro 1 array y devolver lo mismo pero filtrado por los elementos que tengan true en la propiedad realizada.
q. Crear una función que filtre por texto, la cual recibirá como parámetro un array de notas y un texto. La misma deberá devolver un array filtrado por los elementos que incluyan el texto ingresado en el titulo o el texto de la nota. De no recibir texto deberá retornar el array recibido.
r. Al cambiar el texto del input de búsqueda o cambiar el valor del checkbox se deberá ver reflejado en pantalla el resultado de los filtros antes mencionados. En ambos casos se deben contemplar los estados de los 2 filtros para poder tener un resultado coherente con lo que se ve en pantalla. Si filtro por texto deberá
contemplar si el checkbox de realizadas esta o no checkeado, y si filtro por realizadas se deberá contemplar el texto que posea el input de búsqueda.
Casos de ejemplo:
1 – Input vacio y checkbox false
2 – input vacio y checkbox true
3 – Input “ag” y checkbox vacio
4 – Input “ag” y checkbox true
5 – Input vacio y checkbox true





let notas = [
    {id: 1, titulo:'Sacar la basura', texto: 'Mi mama no va a retar si no saco la basura', realizada: false},
    {id: 2, titulo:'recoger la basura', texto: 'Mi mama si me quiere', realizada: true}
];

let idGlobal = 1;

function crearInterFaz(){
    let container = document.getElementById('container');
    container.innerHTML=`<div class="container mt-5">
      <h1 class="mb-4">Aplicación de Notas</h1>
      <div class="row mb-3">
        <div class="col-md-6">
          <input type="text" id="titulo" class="form-control mb-2" placeholder="Título">
          <textarea id="texto" class="form-control mb-2" placeholder="Texto de la nota"></textarea>
          <button onclick="guardarNota()" class="btn btn-primary me-2">Guardar</button>
          <button onclick="limpiarCampos()" class="btn btn-secondary">Limpiar</button>
        </div>
        <div class="col-md-6">
          <input type="text" id="filtro-texto" class="form-control mb-2" placeholder="Buscar notas" oninput="aplicarFiltros()">
          <div class="form-check">
            <input type="checkbox" id="filtro-realizadas" class="form-check-input" onchange="aplicarFiltros()">
            <label class="form-check-label" for="filtro-realizadas">Mostrar solo realizadas</label>
          </div>
        </div>
      </div>
      <div id="contenedor-notas" class="row"></div>
    </div> `
    
};

crearInterFaz();

function pintarNota(notasFiltradas = notas){
    let container = document.getElementById('contenedor-notas');
    container.innerHTML = "";

    if (notasFiltradas.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="alert alert-info">NO HAY NOTAS PARA MOSTRAR</p></div>';
        return;
      }
    
      notasFiltradas.forEach(nota => {
        const notaElement = document.createElement('div');
        notaElement.className = 'col-md-4 mb-3';
        notaElement.innerHTML =`
        <div class="card">
            <div class="card-body">
              <h5 class="card-title">${nota.titulo}</h5>
              <p class="card-text">${nota.texto}</p>
              <div class="form-check mb-2">
                <input type="checkbox" class="form-check-input" ${nota.realizada ? 'checked' : ''} onchange="marcarRealizada(${nota.id})">
                <label class="form-check-label">Realizada</label>
              </div>
              <button onclick="borrarNota(${nota.id})" class="btn btn-danger btn-sm">Borrar nota</button>
            </div>
          </div>`
        ;
        container.appendChild(notaElement);
      });
};

function agregarNota(titulo, texto) {
    idGlobal++;
    let nuevaNota = {id:idGlobal, titulo, texto, realizada:false };
    notas.push(nuevaNota);
};

function guardarNota(){
    let titulo = document.getElementById("titulo").value;
    let texto = document.getElementById("texto").value;
   
    if (titulo.trim() !== "" && texto.trim() !== "") {
        agregarNota(titulo, texto);
        aplicarFiltros();
        limpiarCampos();
      }else{
        alert("Por favor llene los campo requeridos");
      }
};

function borrarNota(id) {
    notas = notas.filter(nota => nota.id !== id); 
    aplicarFiltros();   
}

function limpiarCampos(){
    document.getElementById("titulo").value = "";
    document.getElementById("texto").value = "";
}

function marcarRealizada(id) {
    let nota = notas.find(nota => nota.id === id);
    if (nota) {
        nota.realizada = !nota.realizada;
        aplicarFiltros();
    }
};

function filtrarPorRealizada(array) {
    return array.filter (nota => nota.realizada) 
    
}


function filtrarPorTexto(array, texto) {
    
    if (!texto) 
        return array;
        return array.filter(nota => nota.titulo.toLowerCase().includes(texto.toLowerCase()) || nota.texto.toLowerCase().includes(texto.toLowerCase())); 
    
 };

 function aplicarFiltros() {
    const textoFiltro = document.getElementById("filtro-texto").value;
    const soloRealizadas = document.getElementById("filtro-realizadas").checked;
    let notasFiltradas = notas;

    if (soloRealizadas) {
        notasFiltradas = filtrarPorRealizada(notasFiltradas);
    }

    notasFiltradas = filtrarPorTexto(notasFiltradas, textoFiltro);
    pintarNota(notasFiltradas);
}

document.addEventListener("DOMContentLoaded", () => {
    // crearInterFaz();
    aplicarFiltros();
});





//  //Crear un array donde vamos a guardar las notas
// let arrayNotas = [
//     {
//         id: 1,
//         titulo: 'Sacar la basura',
//         texto: 'Sacar la basura el sabado en la mañana',
//         resalizado: false        
//     }
// ]

// //Crear una variable idGlobal e inicializala en el mismo valor del ultimo id que creaste manualmente, usaremos esto como control de las notas.
// let idGlobal = 1

// //Sobre el div contenedor, crear una pequeña interfaz para crear nuevas notas: Un input de texto para el titulo, un textarea para el texto y 2 botones, uno para guardar la nota nueva y otro para limpiar los campos.
// function crearInterfaz(){
//     let container = document.getElementById('container')
//     container.innerHTML = `
//     <div class="container mt-5">
//       <h1 class="mb-4">Aplicación de Notas</h1>
//       <div class="row mb-3">
//         <div class="col-md-6">
//           <input type="text" id="titulo" class="form-control mb-2" placeholder="Título">
//           <textarea id="texto" class="form-control mb-2" placeholder="Texto de la nota"></textarea>
//           <button onclick="guardarNota()" class="btn btn-primary me-2">Guardar</button>
//           <button onclick="limpiarCampos()" class="btn btn-secondary">Limpiar</button>
//         </div>
//         <div class="col-md-6">
//           <input type="text" id="filtro-texto" class="form-control mb-2" placeholder="Buscar notas" oninput="aplicarFiltros()">
//           <div class="form-check">
//             <input type="checkbox" id="filtro-realizadas" class="form-check-input" onchange="aplicarFiltros()">
//             <label class="form-check-label" for="filtro-realizadas">Mostrar solo realizadas</label>
//           </div>
//         </div>
//       </div>
//       <div id="contenedor-notas" class="row"></div>
//     </div>`
// }

// crearInterfaz()

// function pintarNotas (notasFliltradas = notas){
//     let container = document.getElementById('contenedor-notas')
//     container.innerHTML = ""

//     if (Notas.length === 0) {
//         container.innerHTML = '<div class="col-12"><p class="alert alert-info">NO HAY NOTAS PARA MOSTRAR</p></div>'
//     return
//     }
    
//     notasFliltradas.forEach(nota => {
//         const notaElement.className = 'col-md-4 md-3'
//         notaElement.innerHTML = `


//         `






//     })










//         contenedor.appendChild(notaElement)
//     })


// }

// function agregarNotas(titulo, texto) {
//     idGlobal++
//     let nuevaNota = {
//         id: idGlobal,
//         titulo,
//         texto,
//         realizada: false 
//     }
//     notas.push(nuevaNota)


// }

// function guardarNota(){
//     let titulo = document.getElementById("titulo").value
//     let texto = document.getElementById("titulo").value

//     if (titulo.trim() !== "" && texto.trim() !== "") {
//         agregarNota(titulo, texto)
//         aplicarFiltros()
//     }
// }














// const inputTitulo = document.getElementById('ingresar-tarea')
// const inputDescripcion = document.getElementById('descripcion-tarea')
// const botonCrear = document.getElementById('crear')
// const botonBorrar = document.getElementById('borrar')
// const listaDeNotas = document.getElementById('lista-de-notas')




// function agregarNota(){
//     if (inputTitulo.value){
//         //Crear nota
//         let notaNueva = document.createElement('div')
//         notaNueva.classList.add('nota')
//         notaNueva.innerHTML = `
//             <div class="card">
//                 <div class="card-header">
//                     <input type="checkbox" class="checkbox-completar">
//                     <h5 class="card-title">${inputTitulo.value}</h5>
//                 </div>
//                 <div class="card-body">
//                     <p class="card-text">${inputDescripcion.value}</p>
//                     <button type="submit" class="btn btn-primary">Borrar nota</button>
//                 </div>
//             </div>                    
//         `
        // <div class="card">
        // <div class="card-header">
        //     <input type="checkbox" class="checkbox-completar">
        //     <h5 class="card-title">Mantenimiento Moto</h5>
        // </div>
        // <div class="card-body">
        //     <p class="card-text">Cambio de aceite</p>
        //     <button type="submit" class="btn btn-primary">Borrar nota</button>
        // </div>
        // </div>


//         listaDeNotas.appendChild(notaNueva) //Agregar la nueva nota al contenedor.
//         inputTitulo.value = '';
//         inputDescripcion.value = ''
            
//         const botonBorrar = notaNueva.querySelector('.btn-primary')
//         botonBorrar.addEventListener('click', (e) => {
//             e.preventDefault(); // Evitar el comportamiento por defecto del enlace
//             listaDeNotas.removeChild(notaNueva);
//         })
//         const checkboxCompletar = notaNueva.querySelector('.checkbox-completar')
//         checkboxCompletar.addEventListener('change', completarNota)
//     }else{         
//         alert('Por favor ingresa una tarea.')
//     }
// }


// function completarNota(e) {
//     let nota = e.target.closest('.nota')
//     nota.classList.toggle('completada')
// }

// botonCrear.addEventListener('click', agregarNota)
// inputTitulo.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter'){
//         agregarNota()
//     }
// })






//         //Texto ingresado por el usuario
//         let textoTitulo = document.createElement('p')
//         texto.innerText = input.value
//         tareaNueva.appendChild(texto)

//         //Crear y agregar contenedor de iconos
//         let iconos = document.createElement('div')
//         iconos.classList.add('iconos')
//         tareaNueva.appendChild(iconos)

//         //Iconos
//         let completar = document.createElement('i')
//         completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar')
//         completar.addEventListener('click', completarTarea)

//         let eliminar = document.createElement('i')
//         eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar')
//         eliminar.addEventListener('click', eliminarTarea)

//         iconos.append(completar, eliminar)

//         // Agregar tarea a la lista
//         listaDeTarea.appendChild(tareaNueva)
//     }else{
//         alert('Por favor ingresa una tarea.')
//     }
// }

// function completarTarea(e) {
//     let tarea = e.target.parentNode.parentNode
//     tarea.classList.toggle('completada')
// }

// function eliminarTarea(e) {
//     let tarea = e.target.parentNode.parentNode
//     tarea.remove()    
// }






// let notas = [
//     { 
//         id: 1,
//         titulo: 'Sacar la basura',
//         texto: 'mi mama me va a retar si no lo hago',
//         realizada: false
//     },
//     {
//         id: 2,
//         titulo: 'odontologo',
//         texto: 'cita odontólogo, 10/agosto/2024',
//         realizada: false
//     }
// ]

// let idGlobal = notas[1].id

// console.log(idGlobal);
