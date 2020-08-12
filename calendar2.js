//Este programa crea un calendario dinámico
//variables globales
var meses = ["nulo","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
var dias = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

//Función para generar la tabla. Recibe el id del input y une las partes para crear la tabla
function generar_tabla(id){
	//creamos la tabla y la asociamos a un div
	let tabla=document.createElement("table");
	tabla.setAttribute("id","tabla"+id);
	document.getElementById("div").appendChild(tabla);
	//Función para el thead
	crear_thead(id);
	//Función para el tbody
	crear_tbody(id);
}

//-------------------------------thead-----------------------------------------------------------------------------
//Función para generar el thead de la tabla
function crear_thead(id){
	let tab_head = document.createElement("thead");
	tab_head.setAttribute("id","tabhead"+id);
	document.getElementById("tabla"+id).appendChild(tab_head);
	//Inicio de la creación de los años
	crear_años(id);
	//Inicio de la creación de meses
	crear_meses(id);
	crear_dias(id);
	var mySelect = document.getElementById("años"+id);
	asignarAñoSelected(mySelect);
	var mySelect2 = document.getElementById("meses"+id);
	asignarMesSelected(mySelect2);
}

//Cabecera de años <tr>: crea el esqueleto de la cabecera
function crear_años(id){
	let tab_head = document.getElementById("tabhead"+id);
	let tab_tr_anios = document.createElement("tr");
	tab_head.appendChild(tab_tr_anios);
	let tab_th_anios = document.createElement("th");
	tab_th_anios.setAttribute("colspan",7);
	tab_th_anios.setAttribute("id","th_anios"+id)
	tab_tr_anios.appendChild(tab_th_anios);
	//manda el id para poder asocial el select al thead		
	crear_select_años(id);
}

//Crea el select con los años disponibles, asi como actualiza el calendario por año al hacer una
//selección
function crear_select_años(id){
	let tab_th_anios = document.getElementById("th_anios"+id);
	let form_anios = document.createElement("form");
	tab_th_anios.appendChild(form_anios);
	let sel_anio = document.createElement("select");
	sel_anio.setAttribute("name","anios");
	sel_anio.setAttribute("id","años"+id);
	form_anios.appendChild(sel_anio);
	//creación de las opciones del select
	for(let i=1; i<100; i++){
		let op_anio = document.createElement("option");
		op_anio.setAttribute("value",1950+i);
		sel_anio.appendChild(op_anio);
		let op_text_anio = document.createTextNode(1950+i);
		op_anio.appendChild(op_text_anio);
	}
	document.getElementById("años"+id).addEventListener("click",function(){llenar_tab(id)})
}

//Cascaron del <tr> meses en el thead
function crear_meses(id){
	let tab_head = document.getElementById("tabhead"+id);
	let tab_tr_meses = document.createElement("tr");
	tab_head.appendChild(tab_tr_meses);
	let tab_th_meses = document.createElement("th");
	tab_th_meses.setAttribute("colspan",7);
	tab_th_meses.setAttribute("id","th_meses"+id);
	tab_tr_meses.appendChild(tab_th_meses);
	//Enviar id para poder asociar mi select de meses al thead
	crear_select_meses(id);
}

//Crea el select con los meses, asi como actualiza el calendario por año al hacer una
//selección
function crear_select_meses(id){
	let tab_th_meses = document.getElementById("th_meses"+id);
	let sel_mes = document.createElement("select");
	sel_mes.setAttribute("name","meses");
	sel_mes.setAttribute("id","meses"+id);
	tab_th_meses.appendChild(sel_mes);
	//creación de las opciones del select
	for(let i=1; i<=12; i++){
		let op_mes = document.createElement("option");
		op_mes.setAttribute("value",i);
		sel_mes.appendChild(op_mes);
		let op_text_mes = document.createTextNode(meses[i]);
		op_mes.appendChild(op_text_mes);
	}
	document.getElementById("meses"+id).addEventListener("click",function(){llenar_tab(id)})
}

//Cabecera de días de la semana: crea los th con los días
function crear_dias(id){
	let tab_head = document.getElementById("tabhead"+id);
	let tab_tr_dias = document.createElement("tr");
	tab_head.appendChild(tab_tr_dias);
	for(let x=0; x<7; x++){
		let th_dia = document.createElement("th");
		tab_tr_dias.appendChild(th_dia);
		let dia_text = document.createTextNode(dias[x]);
		th_dia.appendChild(dia_text);
	}	
}

//----------------------------tbody------------------------------------------------------------------------------
	//Función para generar el tbody
function crear_tbody(id){
	//Crear el cascaron del tbody: Crear los <tr> y <td>
	let tab_body = document.createElement("tbody");
	tab_body.setAttribute("id","tabbody"+id);
	document.getElementById("tabla"+id).appendChild(tab_body);
	let sel_anio = document.getElementById("años"+id);
	let anio = sel_anio[sel_anio.selectedIndex].value;
	let sel_mes = document.getElementById("meses"+id);
	let mes = sel_mes[sel_mes.selectedIndex].value;
	let dia_inicio = inicio_de_mes(anio,mes);
	let dias_en_el_mes = dias_por_mes(mes,anio);
	let setId = 0;
 	//Crea las celdas
 	for (var i = 0; i < 6; i++) {
    	// Crea las hileras de la tabla
    	var hilera = document.createElement("tr");
    	for (var j = 0; j < 7; j++) {
      	// Crea un elemento <td> y un nodo de texto, haz que el nodo de
      	// texto sea el contenido de <td>, ubica el elemento <td> al final
      	// de la hilera de la tabla
      		var celda = document.createElement("td");
      		celda.setAttribute("id","cel"+id+setId);
      		//var textoCelda = document.createTextNode(setId);
      		//celda.appendChild(textoCelda);
      		hilera.appendChild(celda);
      		setId++;
    	}
    	// agrega la hilera al final de la tabla (al final del elemento tab_body)
    	tab_body.appendChild(hilera);
  	}
  		llenar_tab(id,dia_inicio,dias_en_el_mes);
}

//Llenar tbody
//Llena la tabla de forma correcta dependiendo de qué día empieza el mes y cuantos días tenga
function llenar_tab(id){
	let mes = document.getElementById("meses"+id).value;
	let anio = document.getElementById("años"+id).value;
	let dias_en_el_mes = dias_por_mes(mes,anio);
	let dia_inicio = inicio_de_mes(anio,mes);
	let bandera = 0;
	let dia = 1;
	//console.log("Mes: "+mes+" año: "+anio+" dias en el mes: "+dias_en_el_mes+" dia de inicio: "+dia_inicio);
	//Para borrar todos los datos
	for(let h = 0; h <= 41; h++){
			var celda = document.getElementById("cel"+id+h);
			celda.textContent=("");
	}
	//para llenar todas las celdas
	for(let g = 0; g < 42; g++){
		let g2 = g;
		let dia2;
		if((g == dia_inicio) && (dia <= dias_en_el_mes)){
			var celda = document.getElementById("cel"+id+g);
			celda.textContent=("");
      		celda.textContent=(dia);
      		dia2 = g2-dia_inicio+1;
			celda.addEventListener("click",function(){EscribirEn(id,dia2);});
      		bandera = true;
      		dia++;
		}else if((bandera == true) && (dia <= dias_en_el_mes)){
			var celda = document.getElementById("cel"+id+g);
			celda.textContent=("");
			celda.textContent=(dia);
      		dia2 = g2-dia_inicio+1;
			celda.addEventListener("click",function(){EscribirEn(id,dia2);});
      		dia++;
		}
	}
}

//Función para la cantidad de días del mes
//calcula la cantidad de días que tiene el mes seleccionado
function dias_por_mes(mes, anio) {
	return new Date(anio || new Date().getFullYear(), mes, 0).getDate();
}

//Función para saber en que día empieza el mes
function inicio_de_mes(anio,mes){
		//obtenemos el dia en que inicia un mes, siendo domingo=0, lunes=1...
	return new Date(anio + "-" + mes + "-01").getDay();
}

//Función para asignar el año actual al select
function asignarAñoSelected(mySelect){
	let fecha = new Date();
	let temp = fecha.getFullYear();
	for(let i, j = 0; i = mySelect.options[j]; j++) {
    	if(i.value == temp) {
        	mySelect.selectedIndex = j;
        	break;
    	}
	}
}

//Función para asignar el mes actual al select
function asignarMesSelected(mySelect2){
	let fecha = new Date();
	let temp = fecha.getMonth();
	for(let i, j = 0; i = mySelect2.options[j]; j++) {
    	if(i.value == temp) {
        	mySelect2.selectedIndex = j+1;
        	break;
    	}
	}
}

function EscribirEn(id,dia){
	let mes = document.getElementById("meses"+id).value;
	let anio = document.getElementById("años"+id).value;
	let input = document.getElementById(id);
	console.log(dia);
	input.setAttribute("value",dia + "/"+ mes + "/" + anio);
}