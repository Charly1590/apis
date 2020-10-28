var m = 1;
var lm;
var nI = 1;
var gI;

function mostrarDatos() {

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari 
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5 
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var id = document.getElementById("pok").value;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            info = JSON.parse(this.responseText);
            var imagen = info.sprites.other["official-artwork"].front_default;
            document.getElementById("foto").innerHTML = "<img id='Tfoto' src='" + imagen + "'alt='foto pokemon'>";
            document.getElementById("Habilidades").innerHTML = "<h4>Habilidades</h4>";
            abilities = info.abilities.length;
            var habilidades = "<table id='tabla'><tr>";
            for (var i = 0; i < info.abilities.length; i++) {
                habilidades += "<th class='tg-46ru'>Habilidad " + (i + 1) + "</th>";
            }
            habilidades += "</tr><tr>";
            for (var i = 0; i < info.abilities.length; i++) {
                habilidades += "<td class='tg-y698'>" + info.abilities[i].ability.name + "</td>";
            }
            habilidades += "</tr></table>";
            document.getElementById("tablaHabi").innerHTML = habilidades;
            lm = info.moves.length;
            document.getElementById("movimientos").innerHTML = "<h4>Movimientos</h4>";
            var moves = "<table id='tabla2'><tr>";
            if (info.moves.length > 5) {
                document.getElementById("prevMove").style.display = 'block';
                document.getElementById("nextMove").style.display = 'inline';
                for (var i = 5 * (m - 1); i < 5 * m; i++) {
                    moves += "<th class='tg-46ru'>Movimiento " + (i + 1) + "</th>";
                }
                moves += "</tr><tr>";
                for (var i = 5 * (m - 1); i < 5 * m; i++) {
                    moves += "<td class='tg-y698'>" + info.moves[i].move.name + "</td>";
                }
                moves += "</tr> </table>";
            } else {
                for (var i = 0; i < info.moves.length; i++) {
                    moves += "<th class='tg-46ru'>Movimiento " + (i + 1) + "</th>";
                }
                moves += "</tr><tr>";
                for (var i = 0; i < info.moves.length; i++) {
                    moves += "<td class='tg-y698'>" + info.moves[i].move.name + "</td>";
                }
                moves += "</tr> </table>";
            }
            document.getElementById("tablaMoves").innerHTML = moves;
            document.getElementById("gameIndices").innerHTML = "<h4>Indices de juego</h4>";
            var gIndices = "<table id='tabla3'><tr><th class='tg-46ru'>Version</th><th class='tg-46ru'>game_index</th></tr>";
            gI = info.game_indices.length;
            if (gI > 5) {
                document.getElementById("nextIndices").style.display = 'block';
                document.getElementById("prevIndices").style.display = 'inline';
                for (var i = 5 * (nI - 1); i < 5 * nI; i++) {
                    gIndices += "<tr>"
                    gIndices += "<td class='tg-y698'>" + info.game_indices[i].version.name + "</td>"
                    gIndices += "<td class='tg-y698'>" + info.game_indices[i].game_index + "</td>"
                    gIndices += "</tr>"
                }
                gIndices += "</table>";
            } else {
                for (var i = 0; i < gI; i++) {
                    gIndices += "<tr>"
                    gIndices += "<td class='tg-y698'>" + info.game_indices[i].version.name + "</td>"
                    gIndices += "<td class='tg-y698'>" + info.game_indices[i].game_index + "</td>"
                    gIndices += "</tr>"
                }
                gIndices += "</table>";
            }

            document.getElementById("tablaIndices").innerHTML = gIndices;
        }
    };
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + id, true);
    xmlhttp.send();
}

function encerar() {
    document.getElementById("nextMove").disabled = false;
    m = 1;
    nI = 1;
}

function nextMove() {
    m = m + 1;
    var aux = m + 1;
    if (aux * 5 > lm) {
        document.getElementById("nextMove").disabled = true;
    } else {
        limpiarTablas();
        mostrarDatos();
    }
}

function prevMove() {
    document.getElementById("nextMove").disabled = false;
    m = m - 1;
    if (m <= 1) {
        m = 1;
    }
    limpiarTablas();
    mostrarDatos();
}

function nextIndices() {
    nI = nI + 1;
    var aux2 = nI + 1;
    if (aux2 * 5 > gI) {
        document.getElementById("nextIndices").disabled = true;
    } else {
        limpiarTablas();
        mostrarDatos();
    }
}

function prevIndices() {
    document.getElementById("nextIndices").disabled = false;
    nI = nI - 1;
    if (nI <= 1) {
        nI = 1;
    }
    limpiarTablas();
    mostrarDatos();
}

function limpiarTablas() {

    var myTable = document.getElementById("tabla2");
    var rowCount = myTable.rows.length;
    for (var x = 1; x < rowCount; x++) {
        myTable.deleteRow(x);
    }
}

function limpiarTablas2() {
    var myTable2 = document.getElementById("tabla3");
    var rowCount2 = myTable2.rows.length;
    for (var y = 1; y < rowCount2; y++) {
        myTable2.deleteRow(y);
    }
}