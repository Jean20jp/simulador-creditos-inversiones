document.addEventListener('DOMContentLoaded', function () {
    const btnGenerar = document.getElementById('btnGenerar');
    btnGenerar.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que el enlace redirija
        generarTabla();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const btnGenerar = document.getElementById('btnGenerar');
    btnGenerar.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que el enlace redirija
        generarTabla();
    });
});


function generarTabla() {
    // Obtener los valores del formulario
    let tipoCredito = document.getElementById('TdCre').value;
    let montoSolicitado = parseFloat(document.getElementById('montoSolic').value);
    let tasaAnual;
    let plazoPrestamo = parseInt(document.getElementById('numCuot').value);
    let frecuenciaPago = document.getElementById('frecPago').value;
    let tipoAmortizacion = document.getElementById('sistAmort').value;

    // Calcular la tasa anual según el tipo de crédito seleccionado
    switch (tipoCredito) {
        case 'Credi-Consumo':
            tasaAnual = 0.156; // Tasa de interés anual del 15.6%
            break;
        case 'Credi-Productivo':
            tasaAnual = 0.116; // Tasa de interés anual del 11.6%
            break;
        case 'Credi-MiVivienda':
            tasaAnual = 0.109; // Tasa de interés anual del 10.9%
            break;
        case 'Credi-MicroSp':
            tasaAnual = 0.159; // Tasa de interés anual del 15.9%
            break;
        default:
            tasaAnual = 0; // Tasa por defecto
            break;
    }

    // Convertir la frecuencia de pago a mensual
    let plazoMensual = plazoPrestamo;
    switch (frecuenciaPago) {
        case 'bimensual':
            plazoMensual *= 2; // Multiplicar por 2 para plazo bimensual
            break;
        case 'trimestral':
            plazoMensual *= 3; // Multiplicar por 3 para plazo trimestral
            break;
        case 'cuatrimestral':
            plazoMensual *= 4; // Multiplicar por 4 para plazo cuatrimestral
            break;
        case 'semestral':
            plazoMensual *= 6; // Multiplicar por 6 para plazo semestral
            break;
        case 'nueve-meses':
            plazoMensual *= 9; // Multiplicar por 9 para plazo de nueve meses
            break;
        case 'anual':
            plazoMensual *= 12; // Multiplicar por 12 para plazo anual
            break;
        default:
            break;
    }

    // Calcular la cuota mensual y cuota total según el tipo de amortización seleccionado y la frecuencia de pago
    let cuotaMensual, cuotaTotal;
    if (tipoAmortizacion === 'aleman') {
        // Calcular cuota mensual según sistema alemán (cuota variable)
        let tasaMensual = tasaAnual / 12;
        cuotaMensual = montoSolicitado * (tasaMensual * Math.pow(1 + tasaMensual, plazoMensual)) / (Math.pow(1 + tasaMensual, plazoMensual) - 1);
        cuotaTotal = cuotaMensual * plazoMensual;

        // Generar la tabla HTML con el detalle de cada cuota para sistema alemán
        let tablaDetalleHTML = '<table class="table"><thead><tr><th scope="col">N° Cuota</th><th scope="col">Fecha</th><th scope="col">Abono a Capital</th><th scope="col">Interés</th><th scope="col">Seguro</th><th scope="col">Cuota</th><th scope="col">Saldo</th></tr></thead><tbody>';
        // Calcular fecha de la primera cuota
        let fecha = new Date();
        for (let i = 1; i <= plazoPrestamo; i++) {
            let abonoCapital = montoSolicitado / plazoPrestamo;
            let interes = (montoSolicitado - ((i - 1) * abonoCapital)) * tasaMensual;
            let seguro = montoSolicitado * 0.02; // Calcula el seguro como el 2% del monto solicitado
            let cuota = abonoCapital + interes + seguro;
            let saldo = montoSolicitado - (i * abonoCapital);

            // Calcular fecha de la cuota actual
            fecha.setMonth(fecha.getMonth() + 1);

            // Agregar la fila a la tabla para sistema alemán
            tablaDetalleHTML += `<tr><td>${i}</td><td>${fecha.toLocaleDateString()}</td><td>${abonoCapital.toFixed(2)}</td><td>${interes.toFixed(2)}</td><td>${seguro.toFixed(2)}</td><td>${cuota.toFixed(2)}</td><td>${saldo.toFixed(2)}</td></tr>`;
        }
        tablaDetalleHTML += '</tbody></table>';

        // Mostrar la tabla de detalle de cuotas para sistema alemán en el contenedor especificado
        document.getElementById('tablaDetalleContainer').innerHTML = tablaDetalleHTML;
    } else if (tipoAmortizacion === 'frances') {
        // Calcular cuota mensual según sistema francés (cuota fija)
        let tasaMensual = tasaAnual / 12;
        cuotaMensual = montoSolicitado * (tasaMensual * Math.pow(1 + tasaMensual, plazoMensual)) / (Math.pow(1 + tasaMensual, plazoMensual) - 1);
        cuotaTotal = cuotaMensual * plazoMensual;

        // Generar la tabla HTML con el detalle de cada cuota para sistema francés
        let tablaDetalleHTML = '<table class="table"><thead><tr><th scope="col">N° Cuota</th><th scope="col">Fecha</th><th scope="col">Abono a Capital</th><th scope="col">Interés</th><th scope="col">Seguro</th><th scope="col">Cuota</th><th scope="col">Saldo</th></tr></thead><tbody>';
        // Calcular fecha de la primera cuota
        let fecha = new Date();
        for (let i = 1; i <= plazoPrestamo; i++) {
            let abonoCapital = cuotaMensual - (montoSolicitado * tasaMensual);
            let interes = montoSolicitado * tasaMensual;
            let seguro = montoSolicitado * 0.02; // Calcula el seguro como el 2% del monto solicitado
            let cuota = cuotaMensual;
            let saldo = montoSolicitado - (i * abonoCapital);

            // Calcular fecha de la cuota actual
            fecha.setMonth(fecha.getMonth() + 1);

            // Agregar la fila a la tabla para sistema francés
            tablaDetalleHTML += `<tr><td>${i}</td><td>${fecha.toLocaleDateString()}</td><td>${abonoCapital.toFixed(2)}</td><td>${interes.toFixed(2)}</td><td>${seguro.toFixed(2)}</td><td>${cuota.toFixed(2)}</td><td>${saldo.toFixed(2)}</td></tr>`;
        }
        tablaDetalleHTML += '</tbody></table>';

        // Mostrar la tabla de detalle de cuotas para sistema francés en el contenedor especificado
        document.getElementById('tablaDetalleContainer').innerHTML = tablaDetalleHTML;
    }
}

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
    let montoInversion = parseFloat(document.getElementById('montoInv').value);
    let frecuenciaInversion = document.getElementById('frecDias').value;
    let plazoInversion = parseInt(document.getElementById('plazoInv').value);
    let tipoAmortizacionInversion = document.getElementById('sistAmortInv').value;

    // Calcular la tasa de interés según el tipo de amortización seleccionado
    let tasaInteres;
    if (tipoAmortizacionInversion === 'alemanInver') {
        tasaInteres = 0.08; // Tasa de interés anual para el sistema alemán (ejemplo)
    } else if (tipoAmortizacionInversion === 'francesInver') {
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
                <p class="card-text">Tasa de Interés: ${(interes * 100).toFixed(2)}%</p>
            </div>
        </div>
    `;

    document.getElementById('tarjetaInversionContainer').innerHTML = tarjetaHTML;
}








