var eleccion = "";
var nEmpate = 0;
var nGanados = 0;
var nPerdidos = 0;
var stats = "oculto";
empezarJuego = function() {
	$("#jugar").click(function(){ 
		$('.juego').empty();
		$('.estadisticas').empty();
		stats = "oculto";
		$( ".juego" ).append('<div class="opciones"><img src="images/PiedraUsuario.png" id="piedra"> <img src="images/PapelUsuario.png" id="papel"> <img src="images/TijeraUsuario.png" id="tijera"></div><div id="resMaquina"></div>');
		$("#jugar").prop("disabled",true);
		$('img').on('click', function() {
	        eleccion = $(this).attr('id');
	        console.log(eleccion);
	        $('img').each(function() {
	        	if($(this).attr('id') != eleccion) {
	        		$(this).hide();
	        	} else {
	        		$('img').off();
	        	};
	        });
	        calcularOpcionMaquina();
	        compararOpciones(eleccion,opcionMaquina);
	    });
	});
	
	$("#resultado").click(function(){ 
		verResultado();
	});
};
verResultado = function(){
			if (stats == "oculto"){
				$('.estadisticas').show();
				stats = "mostrando";
			} else {
				$('.estadisticas').hide();
				stats = "oculto";
			};
			$('.estadisticas').empty();
			$( ".estadisticas").append('<table><thead><tr><th>Ganados</th><th>Empatados</th><th>Perdidos</th></tr></thead><tbody></tbody></table>')
			$('tbody').append('<tr><td id="nGanados"></td><td id="nEmpatados"></td><td id="nPerdidos"></td></tr>')
			$('#nGanados').append(nGanados);
			$('#nEmpatados').append(nEmpate);
			$('#nPerdidos').append(nPerdidos);
		};
var opcionesMaquina = ["piedra", "papel", "tijera"];
var calcularOpcionMaquina =function() {
	opcionMaquina = opcionesMaquina[Math.floor(Math.random()*3)];
	switch (opcionMaquina) {
		case "piedra":
			$('#resMaquina').append('<img src="images/PiedraMaquina.png">');
		break;
		case "papel":
			$('#resMaquina').append('<img src="images/PapelMaquina.png">');
		break;
		default:
			$('#resMaquina').append('<img src="images/TijeraMaquina.png">');
	}
	$("#jugar").prop("disabled",false);
	console.log(opcionMaquina);
	return opcionMaquina;
};

var compararOpciones = function(opcionU,opcionM) {

	if (opcionU === opcionM) {
		resultado = "Empate";
		nEmpate++;
	} else {
		switch (opcionU) {
		case "piedra": 
			if (opcionM === "tijera") {
				resultado = "Ganaste!";
			}else {
				resultado = "Perdiste!";
			};
			break;
		case "papel":
			if (opcionM === "tijera") {
				resultado = "Perdiste!";
			} else {
				resultado = "Ganaste!";
			};
			break;
		default: 
			if (opcionM === "papel") {
				resultado = "Ganaste!";
			} else {
				resultado = "Perdiste!";
			};
		}
		if (resultado == "Ganaste!") {
			nGanados++;
		} else {
			nPerdidos++;
		};
	};
	$('.juego').append('<div id="texto"><h2></h2></div>');
	$('h2').append(resultado);
	verResultado();
};