document.addEventListener('DOMContentLoaded', function () {
    const btnGenerarInversion = document.getElementById('btnGenerarInversion');
    btnGenerarInversion.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que el enlace redirija
        generarTarjetaInversion();
    });
});

// Función para generar la tarjeta de resultados de inversión según el sistema de amortización seleccionado
function generarTarjetaInversion() {
    // Obtener los valores del formulario
    let montoInversion = parseFloat(document.getElementById('montoInv').value); // Corregido: montoInv
    let frecuenciaInversion = document.getElementById('frecInv').value;
    let plazoInversion = parseInt(document.getElementById('plazoInv').value);
    let tipoAmortizacionInversion = document.getElementById('sistAmortInv').value;

    // Calcular la tasa de interés según el tipo de amortización seleccionado
    let tasaInteres;
    if (tipoAmortizacionInversion === 'aleman') {
        tasaInteres = 0.08; // Tasa de interés anual para el sistema alemán (ejemplo)
    } else if (tipoAmortizacionInversion === 'frances') {
        tasaInteres = 0.1; // Tasa de interés anual para el sistema francés (ejemplo)
    }

    // Calcular el rendimiento neto, capital e interés según la frecuencia de inversión
    let rendimientoNeto, capital, interes;
    if (frecuenciaInversion === 'dias') {
        // Calcular el rendimiento neto, capital e interés para inversiones diarias
        rendimientoNeto = montoInversion * (1 + (tasaInteres / 365)) ** (plazoInversion * 365);
        capital = rendimientoNeto - montoInversion;
        interes = capital / montoInversion;
    } else if (frecuenciaInversion === 'meses') {
        // Calcular el rendimiento neto, capital e interés para inversiones mensuales
        rendimientoNeto = montoInversion * (1 + (tasaInteres / 12)) ** plazoInversion;
        capital = rendimientoNeto - montoInversion;
        interes = capital / montoInversion;
    } else if (frecuenciaInversion === 'anios') {
        // Calcular el rendimiento neto, capital e interés para inversiones anuales
        rendimientoNeto = montoInversion * (1 + tasaInteres) ** plazoInversion;
        capital = rendimientoNeto - montoInversion;
        interes = capital / montoInversion;
    }

    // Mostrar la tarjeta de resultados de inversión en el contenedor especificado
    let tarjetaHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Resultados de Inversión</h5>
                <p class="card-text">Rendimiento Neto: ${rendimientoNeto.toFixed(2)}</p>
                <p class="card-text">Capital: ${capital.toFixed(2)}</p>
                <p class="card-text">Interés: ${(interes * 100).toFixed(2)}%</p>
            </div>
        </div>
    `;

    document.getElementById('tarjetaInversionContainer').innerHTML = tarjetaHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnLimpiar').addEventListener('click', function () {
        location.reload();
    });
    document.getElementById('btnLimpiar2').addEventListener('click', function () {
        location.reload();
    });
});
