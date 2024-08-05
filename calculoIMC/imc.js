// Ejercicio #1
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









