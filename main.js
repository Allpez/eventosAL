const formulario = document.forms[0]

formulario.addEventListener('submit', (e) => {
    e.preventDefault() //evita que el formulario se envíe y recargue la página.
    let estatura = e.target.elements.estatura.value
    let peso = e.target.elements.peso.value

    estatura = parseFloat(estatura)
    peso = parseFloat(peso)

    if (estatura === 0) {
        alert("Introduce un valor numerico correcto")
    } else {
        let total = peso / (Math.pow(estatura / 100, 2))//calcvulo para el IMC

        let resultado = document.getElementById('resultado')
        resultado.value = total.toFixed(2)
    }

})



const tasaCambio = 4052.01 //tasa de cambio
const inputPesoCol = document.getElementById('pesoColomb')
const inputDolar = document.getElementById('dolar')

function actDolarEstadounidense() {
    let pesos = parseFloat(inputPesoCol.value) || 0
    let dolares = pesos / tasaCambio
    inputDolar.value = dolares.toFixed(2)
}

function actPesoColombiano() {
    let dolares = parseFloat(inputDolar.value) || 0
    let pesos = dolares * tasaCambio
    inputPesoCol.value = pesos.toFixed(2)
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Seleccionar todos los inputs dentro de .caja
    const inputs = document.querySelectorAll('.caja input');

    // Agregar evento focus a cada input
    inputs.forEach(input => {
        input.addEventListener('focus', (event) => {
            event.target.value = ''; // Borrar el contenido del campo de entrada
        });
    });
});

inputPesoCol.addEventListener('input', actDolarEstadounidense)
inputDolar.addEventListener('input', actPesoColombiano)






