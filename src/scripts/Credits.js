document.addEventListener('DOMContentLoaded', function () {
    const btnGenerar = document.getElementById('btnGenerar');
    btnGenerar.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que el enlace redirija
        generarTabla();
    });
});

function generarTabla() {
    // Obtener los valores del formulario
    let tipoCredito = document.getElementById('typeCred').value;
    let tasaAnual = parseFloat(document.getElementById('tasaCred').value);
    let montoCobroIndirecto = parseFloat(document.getElementById('montoCobrIndCred').value);
    let montoSolicitado = parseFloat(document.getElementById('montoSolic').value);
    let frecuenciaPago = document.getElementById('frecCre').value;
    let plazoPrestamo = parseInt(document.getElementById('numCout').value);
    let tipoAmortizacion = document.getElementById('sistAmortCred').value;

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
        let tablaDetalleHTML = '<table class="table"><thead><tr><th colspan="7" class="text-center">Tabla de Amortización<span style="float:right;"><button style="background-color: #4CAF50; border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 5px; " onclick="imprimirPDF()">Generar PDF</button></span></th></tr><tr><th scope="col">N° Cuota</th><th scope="col">Fecha</th><th scope="col">Abono a Capital</th><th scope="col">Interés</th><th scope="col">Cuota</th><th scope="col">Seguro</th><th scope="col">Saldo</th></tr></thead><tbody>';
 // Calcular fecha de la primera cuota
        let fecha = new Date();
        for (let i = 1; i <= plazoPrestamo; i++) {
            let abonoCapital = montoSolicitado / plazoPrestamo;
            let interes = (montoSolicitado - ((i - 1) * abonoCapital)) * tasaMensual;
            let seguro = montoCobroIndirecto; // Tomar el monto del seguro de la variable montoCobroIndirecto
            let cuota = abonoCapital + interes + seguro;
            let saldo = montoSolicitado - (i * abonoCapital);

            // Calcular fecha de la cuota actual
            fecha.setMonth(fecha.getMonth() + 1);

            // Agregar la fila a la tabla para sistema alemán
            tablaDetalleHTML += `<tr><td>${i}</td><td>${fecha.toLocaleDateString()}</td><td>${abonoCapital.toFixed(2)}</td><td>${interes.toFixed(2)}</td><td>${cuota.toFixed(2)}</td><td>${seguro.toFixed(2)}</td><td>${saldo.toFixed(2)}</td></tr>`;
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
        let tablaDetalleHTML = '<table class="table"><thead><tr><th colspan="7" class="text-center">Tabla de Amortización<span style="float:right;"><button style="background-color: #4CAF50; border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 5px;"onclick="imprimirPDF()">Generar PDF</button></span></th></tr><tr><th scope="col">N° Cuota</th><th scope="col">Fecha</th><th scope="col">Abono a Capital</th><th scope="col">Interés</th><th scope="col">Cuota</th><th scope="col">Seguro</th><th scope="col">Saldo</th></tr></thead><tbody>';

        // Calcular fecha de la primera cuota
        let fecha = new Date();
        for (let i = 1; i <= plazoPrestamo; i++) {
            let abonoCapital = cuotaMensual;
            let interes = cuotaMensual - (montoSolicitado * tasaMensual);
            let seguro = montoCobroIndirecto; // Tomar el monto del seguro de la variable montoCobroIndirecto
            let cuota = cuotaMensual;
            let saldo = montoSolicitado - (i * abonoCapital);

            // Calcular fecha de la cuota actual
            fecha.setMonth(fecha.getMonth() + 1);

            // Agregar la fila a la tabla para sistema francés
            tablaDetalleHTML += `<tr><td>${i}</td><td>${fecha.toLocaleDateString()}</td><td>${abonoCapital.toFixed(2)}</td><td>${interes.toFixed(2)}</td><td>${cuota.toFixed(2)}</td><td>${seguro.toFixed(2)}</td><td>${saldo.toFixed(2)}</td></tr>`;
        }
        tablaDetalleHTML += '</tbody></table>';

        // Mostrar la tabla de detalle de cuotas para sistema francés en el contenedor especificado
        document.getElementById('tablaDetalleContainer').innerHTML = tablaDetalleHTML;
    }
}
function imprimirPDF() {
    alert('Generando PDF.'); // Agregar este alert para verificar la ejecución de la función

    // Obtener el contenido HTML de la tabla de detalle de cuotas según el tipo de amortización
    let tablaHTML = document.getElementById('tablaDetalleContainer').innerHTML;

    // Crear un objeto Blob a partir del contenido HTML de la tabla
    const blob = new Blob([tablaHTML], { type: 'application/pdf' });

    // Crear un objeto URL a partir del Blob
    const url = URL.createObjectURL(blob);

    // Crear un elemento <a> para descargar el archivo PDF
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tabla_amortizacion.pdf'; // Nombre del archivo PDF

    // Agregar el elemento <a> al documento y simular el clic para iniciar la descarga
    document.body.appendChild(link);
    link.click();

    // Eliminar el elemento <a> del documento después de la descarga
    document.body.removeChild(link);
}



