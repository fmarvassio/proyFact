// Agregar Factura
function agregarFactura() {
  // Obtener los valores del formulario
  var nombreCliente = document.getElementById("nombreCliente").value;
  var mes = document.getElementById("mes").value;
  var km = document.getElementById("km").value;
  var numFactura = document.getElementById("numFactura").value;
  var precio = document.getElementById("precio").value;

  // Crear el checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // Agregar los valores a la tabla
  var tabla = document.getElementById("facturasTabla");
  var fila = tabla.insertRow(-1);

  var celdaCliente = fila.insertCell(0);
  celdaCliente.innerHTML = nombreCliente;

  var celdaMes = fila.insertCell(1);
  celdaMes.innerHTML = mes;

  var celdaKm = fila.insertCell(2);
  celdaKm.innerHTML = km;

  var celdaNumFactura = fila.insertCell(3);
  celdaNumFactura.innerHTML = numFactura;

  var celdaPrecio = fila.insertCell(4);
  celdaPrecio.innerHTML = precio;

  var checkboxCell = fila.insertCell(5);
  checkboxCell.appendChild(checkbox);

  // Crear botón de eliminar
  var botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.onclick = function () {
    eliminarFactura(numFactura);
  };
  var celdaAcciones = fila.insertCell(6);
  celdaAcciones.appendChild(botonEliminar);

  // Limpiar el formulario
  document.getElementById("facturaForm").reset();

  // Cálculo del Total General
  var totalGeneral = 0;
  var precios = document.querySelectorAll(".planilla td:nth-child(5)");
  for (var i = 0; i < precios.length; i++) {
    totalGeneral += parseFloat(precios[i].innerText);
  }
  document.getElementById("total").innerText = "Total General: $" + totalGeneral.toFixed(2);

  // Guardar los datos de la factura en el Almacenamiento Local
  var facturaData = {
    nombreCliente: nombreCliente,
    mes: mes,
    km: km,
    numFactura: numFactura,
    precio: precio
  };

  var facturas = JSON.parse(localStorage.getItem("facturas")) || [];
  facturas.push(facturaData);
  localStorage.setItem("facturas", JSON.stringify(facturas));
}

// Cargar Datos Guardados
function cargarDatosGuardados() {
  var facturas = JSON.parse(localStorage.getItem("facturas")) || [];
  var tabla = document.getElementById("facturasTabla");

  for (var i = 0; i < facturas.length; i++) {
    var facturaData = facturas[i];
    var fila = tabla.insertRow(-1);

    var celdaCliente = fila.insertCell(0);
    celdaCliente.innerHTML = facturaData.nombreCliente;

    var celdaMes = fila.insertCell(1);
    celdaMes.innerHTML = facturaData.mes;

    var celdaKm = fila.insertCell(2);
    celdaKm.innerHTML = facturaData.km;

    var celdaNumFactura = fila.insertCell(3);
    celdaNumFactura.innerHTML = facturaData.numFactura;

    var celdaPrecio = fila.insertCell(4);
    celdaPrecio.innerHTML = facturaData.precio;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var celdaPagado = fila.insertCell(5);
    celdaPagado.appendChild(checkbox);

    var celdaAcciones = fila.insertCell(6);
    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.onclick = function () {
      eliminarFactura(facturaData.numFactura);
    };
    celdaAcciones.appendChild(botonEliminar);
  }

  // Actualizar el Total General
  var totalGeneral = 0;
  var precios = document.querySelectorAll(".planilla td:nth-child(5)");
  for (var i = 0; i < precios.length; i++) {
    totalGeneral += parseFloat(precios[i].innerText);
  }
  document.getElementById("total").innerText = "Total General: $" + totalGeneral.toFixed(2);
}

// Eliminar Factura
function eliminarFactura(numeroFactura) {
  var facturas = JSON.parse(localStorage.getItem("facturas")) || [];
  var facturasFiltradas = facturas.filter(function (factura) {
    return factura.numFactura !== numeroFactura;
  });
  localStorage.setItem("facturas", JSON.stringify(facturasFiltradas));

  // Limpiar la tabla y volver a cargar los datos
  var tabla = document.getElementById("facturasTabla");
  tabla.innerHTML = "<tr><th>Cliente</th><th>Mes</th><th>Kilómetros</th><th>Número de Factura</th><th>Precio</th><th>Pagado</th><th>Acciones</th></tr>";
  cargarDatosGuardados();
}

window.onload = cargarDatosGuardados;
