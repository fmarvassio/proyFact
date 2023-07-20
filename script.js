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
  
    var celdaPagado = fila.insertCell(5);
    celdaPagado.appendChild(checkbox);
  
    // Limpiar el formulario
    document.getElementById("facturaForm").reset();
  
    // Cálculo del Total General
    var totalGeneral = 0;
    var precios = document.querySelectorAll(".planilla td:nth-child(5)");
    for (var i = 0; i < precios.length; i++) {
      totalGeneral += parseFloat(precios[i].innerText);
    }
    document.getElementById("total").innerText = "Total General: $" + totalGeneral.toFixed(2);
  }
  
