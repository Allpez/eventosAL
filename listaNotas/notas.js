let array = [] //Crear un array donde vamos a guardar las notas

const inputTitulo = document.getElementById('ingresar-tarea')
const inputDescripcion = document.getElementById('descripcion-tarea')
const botonCrear = document.getElementById('crear')
const botonBorrar = document.getElementById('borrar')
const listaDeNotas = document.getElementById('lista-de-notas')




function agregarNota(){
    if (inputTitulo.value){
        //Crear nota
        let notaNueva = document.createElement('div')
        notaNueva.classList.add('nota')
        notaNueva.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <input type="checkbox" class="checkbox-completar">
                    <h5 class="card-title">${inputTitulo.value}</h5>
                </div>
                <div class="card-body">
                    <p class="card-text">${inputDescripcion.value}</p>
                    <button type="submit" class="btn btn-primary">Borrar nota</button>
                </div>
            </div>                    
        `
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


        listaDeNotas.appendChild(notaNueva) //Agregar la nueva nota al contenedor.
        inputTitulo.value = '';
        inputDescripcion.value = ''
            
        const botonBorrar = notaNueva.querySelector('.btn-primary')
        botonBorrar.addEventListener('click', (e) => {
            e.preventDefault(); // Evitar el comportamiento por defecto del enlace
            listaDeNotas.removeChild(notaNueva);
        })
        const checkboxCompletar = notaNueva.querySelector('.checkbox-completar')
        checkboxCompletar.addEventListener('change', completarNota)
    }else{         
        alert('Por favor ingresa una tarea.')
    }
}


function completarNota(e) {
    let nota = e.target.closest('.nota')
    nota.classList.toggle('completada')
}

botonCrear.addEventListener('click', agregarNota)
inputTitulo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
        agregarNota()
    }
})






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
