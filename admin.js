const base_url = "";
var colorChange = false;
var imgChange = false;
var imgValid = 'true';
var tonoSat = false;
var factorColor = 50;
var renderTarjetasvar;
var booleanEdit;
var idTarjetaFocus;

const fileInput = document.getElementById('formFile');
const bgColorInput = document.getElementById('formColor');

const principalDiv = document.getElementById('principal-color');
const secundarioDiv = document.getElementById('secundario-color');

var fileIconSvg = document.getElementById('fileIconSvg');
var svgIdtxt = document.getElementById('svgId');

var switchBtn = document.getElementById('switchBtn');

//Face de verifiacion de datos en localStorage
function loginUser() {
    var user = localStorage.getItem('user');
    var contrasena = localStorage.getItem('contrasena');

    var jsonLogin = {
        user: user,
        contrasena: contrasena
    }
    checkLogin(jsonLogin);
}
function checkLogin(jsonLogin) {
    $.ajax({
        url: base_url + "index.php/Admin/login",
        dataType: "json",
        type: "post",
        data: jsonLogin,
        success: function (datos, estado, jhrx) {
            if (datos.Status == "False") {
                localStorage.clear();
                window.location.href = "login-admin.html";
            } else {
            }
        },
        error: function (jhrx, estado, errorA) {
        }
    })
}
function newJob() {
    statusEdit("inactive");
    cleanInputs();
}
function cleanstorage() {
    localStorage.clear();
}
//Face de subida de datos del formulario
function saveData() {

    var formDatajson = new FormData($("#formData")[0]);
    formDatajson.append("formShadow", reducirTono(formDatajson.get("formColor"), factorColor));

    if (!imgChange) {
        alert("Debes seleccionar una imagen.");
        return;
    }
    if (!formDatajson.get("formAct1")) {
        alert("Debes completar el campo Act1.");
        return;
    }
    if (!formDatajson.get("formAct2")) {
        alert("Debes completar el campo Act2.");
        return;
    }
    if (!formDatajson.get("formAct3")) {
        alert("Debes completar el campo Act3.");
        return;
    }
    if (!formDatajson.get("formAct4")) {
        alert("Debes completar el campo Act4.");
        return;
    }
    if (!formDatajson.get("formAct5")) {
        alert("Debes completar el campo Act5.");
        return;
    }
    if (!formDatajson.get("formTittle")) {
        alert("Debes completar el campo Título principal.");
        return;
    }
    if (!formDatajson.get("formTittle-nav")) {
        alert("Debes completar el campo Título en navegador.");
        return;
    }
    if (!formDatajson.get("formArea")) {
        alert("Debes completar el campo Descripción del personal.");
        return;
    }
    if (!colorChange) {
        alert("Debes seleccionar un color de fondo.");
        if (tonoSat) {
            alert("Elije un tono mas bajo en el recuadro de color.")
        }
        return;
    }

    sendData(formDatajson);
    cleanInputs();
    location.reload();
}
function upload() {
    var formDatajson = new FormData($("#formData")[0]);
    formDatajson.append("formShadow", reducirTono(formDatajson.get("formColor"), factorColor));

    if (!imgValid == "true" /* || tonoSat*/) {
        if (!imgValid == "true") {
            alert("Debes seleccionar una imagen.");
        }
        /*
        if (tonoSat) {
            alert("Elije un tono mas bajo en el recuadro de color.")
        }
        */
    } else {
        uploadCards(formDatajson);
        location.reload();
    }
}

function sendData(jsonTarjeta) {
    $.ajax({
        url: base_url + "index.php/Admin/uploadData",
        dataType: "json",
        type: "post",
        data: jsonTarjeta,
        contentType: false,
        processData: false,
        success: function (datos, estado, jhrx) {
        },
        error: function (jhrx, estado, error) { },
    });
}
function uploadCards(jsonTarjeta) {
    $.ajax({
        url: base_url + "index.php/Admin/uploadData/" + idTarjetaFocus,
        dataType: "json",
        type: "post",
        data: jsonTarjeta,
        contentType: false,
        processData: false,
        success: function (datos, estado, jhrx) {
        },
        error: function (jhrx, estado, error) {
        }
    });
}
function deleteCards() {
    if (confirm("¿Estás seguro de que deseas eliminar esta tarjeta?")) {
        $.ajax({
            url: base_url + "index.php/Admin/deleteCard/" + idTarjetaFocus,
            dataType: "json",
            type: "DELETE",
            success: function (datos, estado, jhrx) {
                location.reload();
            },
            error: function (jhrx, estado, error) {
            }
        });
    }
}

function cleanInputs() {
    var inputs = document.querySelectorAll('input[type="text"]');
    var color = document.querySelector('input[type="color"]');
    var area = document.querySelector('#formArea');
    color.value = "#dc3545";
    area.value = '';
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
    statusSvg("inactive");

    principalDiv.style.backgroundColor = '#ffffff';
    secundarioDiv.style.background = '#ffffff';
    determinarColorTexto('#ffffff', '#ffffff');
    clearFileInput();
}
function clearFileInput() {
    var image = document.getElementById('imagePreview');

    fileInput.value = '';

    image.src = base_url + "imagenDefault.jpg";
}
function previewImage(input) {
    imgChange = true;
    var image = document.getElementById('imagePreview');
    var file = input.files[0];
    var reader = new FileReader();

    if (file) {
        // Verificar que el archivo sea de tipo JPG
        if (file.type === "image/jpeg") {
            statusSvg("active", file.name);
            reader.onload = function (e) {
                image.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            // Mostrar mensaje de error si el archivo no es JPG
            image.src = base_url + "imagenDefault.jpg";
            imgValid = "false";
            statusSvg("invalid");
            alert("Por favor, selecciona un archivo en formato JPG.");
        }
    } else {
        // Mostrar mensaje de error si no se selecciona un archivo
        imgValid = "false";
        image.src = base_url + "imagenDefault.jpg";
        statusSvg("invalid");
        alert("Por favor, selecciona un archivo válido.");
    }
}


function statusSvg(status, nameimg) {
    switch (status) {
        case "active":
            fileIconSvg.querySelector('.active').classList.remove('d-none');
            fileIconSvg.querySelector('.inactive').classList.add('d-none');
            fileIconSvg.querySelector('.invalid').classList.add('d-none');
            svgIdtxt.textContent = 'Archivo ' + nameimg + ' cargado correctamente';
            break;
        case "inactive":
            fileIconSvg.querySelector('.active').classList.add('d-none');
            fileIconSvg.querySelector('.inactive').classList.remove('d-none');
            fileIconSvg.querySelector('.invalid').classList.add('d-none');
            svgIdtxt.textContent = 'Selecciona un archivo';
            break;
        case "invalid":
            fileIconSvg.querySelector('.active').classList.add('d-none');
            fileIconSvg.querySelector('.inactive').classList.add('d-none');
            fileIconSvg.querySelector('.invalid').classList.remove('d-none');
            svgIdtxt.textContent = 'Archivo inválido, selecciona un formato válido';
            break;
        default:
            console.log("default de statusSvg");
            break;
    }
}
function statusEdit(status) {
    switch (status) {
        case "active":
            switchBtn.querySelector('.inactive').classList.add('d-none');
            switchBtn.querySelector('.active').classList.remove('d-none');
            break;
        case "inactive":
            switchBtn.querySelector('.active').classList.add('d-none');
            switchBtn.querySelector('.inactive').classList.remove('d-none');
            break;
        default:
            console.log("default de statusSvg");
            break;
    }
}


//Insertar tarjetas

function loadData() {
    $.ajax({
        url: base_url + "index.php/Admin/readData",
        dataType: "json",
        type: "post",
        data: {},
        success: function (datos, estado, jhrx) {
            if (datos.status == 'success') {
                renderTarjetasvar = datos.tarjetas;
                renderTarjetas(datos.tarjetas);
            }
        },
        error: function (jhrx, estado, error) { },
    });
}
function renderTarjetas(datosTarjetas) {
    var contenedor = document.getElementById('contenedor');
contenedor.innerHTML = '';

for (var i = datosTarjetas.length - 1; i >= 0; i--) {
    var valor = datosTarjetas[i];

    var tarjetaDiv = document.createElement('div');
    tarjetaDiv.className = 'py-5 py-lg-4 px-sm-5 px-lg-4';
    var tarjetaContenido = `
        <div class="row w-auto h-auto">
            <div class="col-md-6 col-sm-12 p-0 z-2 img-list shadow rounded m-auto rounded-start-pill">
                <img src="${base_url + valor.img}"img-list  class="w-100 h-100 img-fluid object-fit-cover rounded m-auto rounded-start-pill" alt="" style="max-height: 300px; min-height: 250px;">
            </div>
            <div class="col-md-6 col-sm-12 text-center shadow z-2 cardadd h-auto d-flex flex-column align-items-center" style="background: ${valor.color};">
                <p class="fs-5 titulo-card badge text-wrap rounded-1 mt-3 mb-0 shadow z-1" style="color: ${valor.color}; background: ${determinarColor(valor.color)};">${valor.tittle}</p>
                <p class="fs-6 desc-card    fw-normal badge text-wrap  rounded-0 m-0 text-start d-inline-block text-truncate" style="color:${determinarColor(valor.color)}">${valor.descripcion}</p>
            </div>
            <div class="d-flex flex-column col-12 p-0 ms-auto me-0 w-75">
                <div class="container w-100 p-0 nav-item m-0">
                    <button class="btn w-100 px-0 me-2 rounded-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${i}" aria-expanded="false" aria-controls="collapseExample${i}" style="border: solid 1px ${valor.sombra};" onmouseover="this.style.backgroundColor = '${valor.sombra}'; this.style.color = 'black';" onmouseout="this.style.backgroundColor = 'transparent';" >
                        Mas. . .
                    </button>
                    <div class="collapse text-light p-0 " id="collapseExample${i}" data-bs-target="id" style="background: ${valor.sombra};">
                        <div class="row card-body" id="id">
                            <div class="col-6">
                                <ul class="list-group list-group-flush  bg-light" style="color:${reducirTono(valor.sombra, -70)};">
                                    <p class="my-0 mx-2">Actividades:</p>
                                    <li class="list-group-item " style="background: ${valor.sombra}; color:${determinarColor(valor.sombra)};">${valor.act1}</li>
                                    <li class="list-group-item " style="background: ${valor.sombra}; color:${determinarColor(valor.sombra)};">${valor.act2}</li>
                                    <li class="list-group-item " style="background: ${valor.sombra}; color:${determinarColor(valor.sombra)};">${valor.act3}</li>
                                    <li class="list-group-item " style="background: ${valor.sombra}; color:${determinarColor(valor.sombra)};">${valor.act4}</li>
                                    <li class="list-group-item " style="background: ${valor.sombra}; color:${determinarColor(valor.sombra)};">${valor.act5}</li>
                                </ul>
                            </div>
                            <div class="col-6 position-relative">
                                <ul class="list-group list-group-flush  bg-light" style="color:${reducirTono(valor.sombra, -70)};">
                                    <p class="my-0 mx-2">Titulo de navegador:</p>
                                    <li class="list-group-item " style="background: ${valor.sombra}; color:${determinarColor(valor.sombra)};">${valor.navtittle}</li>
                                </ul>
                                <button type="button" class="btn btn-outline-${determinarColorbtn(valor.sombra)} m-auto fw-medium position-absolute bottom-0 start-50 translate-middle w-75" onclick="sendEditCard(${valor.id});">Editar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    tarjetaDiv.innerHTML = tarjetaContenido;
    contenedor.appendChild(tarjetaDiv);
}

}

function sendEditCard(id) {
    booleanEdit = "true";
    console.log(renderTarjetasvar);
    var jsonTarjeta = renderTarjetasvar.find(function (element) {
        return element.id === id;
    });
    document.querySelector('#formAct1').value = jsonTarjeta.act1;
    document.querySelector('#formAct2').value = jsonTarjeta.act2;
    document.querySelector('#formAct3').value = jsonTarjeta.act3;
    document.querySelector('#formAct4').value = jsonTarjeta.act4;
    document.querySelector('#formAct5').value = jsonTarjeta.act5;

    document.querySelector('#formTittle').value = jsonTarjeta.tittle;
    document.querySelector('#formTittle-nav').value = jsonTarjeta.navtittle;
    document.querySelector('#formArea').value = jsonTarjeta.descripcion;
    bgColorInput.value = jsonTarjeta.color;

    determinarColorTexto(jsonTarjeta.color, jsonTarjeta.sombra);

    principalDiv.style.backgroundColor = jsonTarjeta.color;
    secundarioDiv.style.background = jsonTarjeta.sombra;

    var imagePreview = document.getElementById('imagePreview');
    imagePreview.src = base_url + jsonTarjeta.img;

    statusSvg("active", jsonTarjeta.imgName);
    statusEdit("active");
    idTarjetaFocus = jsonTarjeta.id;
};
//Face para editar color
bgColorInput.addEventListener('input', function () {
    colorChange = true;
    const selectedColor = bgColorInput.value;
    const colordegrade = (reducirTono(selectedColor, factorColor));

    principalDiv.style.backgroundColor = selectedColor;
    secundarioDiv.style.background = colordegrade;

    determinarColorTexto(selectedColor, colordegrade);
});
function reducirTono(colorHex, factor) {
    const r = parseInt(colorHex.slice(1, 3), 16);
    const g = parseInt(colorHex.slice(3, 5), 16);
    const b = parseInt(colorHex.slice(5, 7), 16);

    // Calcular el nuevo valor para R, G y B restando el factor
    const nuevoR = Math.min(255, r + factor);
    const nuevoG = Math.min(255, g + factor);
    const nuevoB = Math.min(255, b + factor);

    // Convertir los nuevos valores a formato hexadecimal
    const nuevoColorHex = `#${nuevoR.toString(16).padStart(2, '0')}${nuevoG.toString(16).padStart(2, '0')}${nuevoB.toString(16).padStart(2, '0')}`;

    return nuevoColorHex;
}

function calcularLuminancia(color) {
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;

    return 0.299 * r + 0.587 * g + 0.114 * b;
}

function determinarColorTexto(colorFondo, colorDegrade) {
    const luminancia = calcularLuminancia(colorFondo);
    const oscurancia = calcularLuminancia(colorDegrade);

    if (luminancia > 0.6) {
        principalDiv.classList.remove("text-light");
        principalDiv.classList.add("text-dark");
    } else {
        principalDiv.classList.remove("text-dark");
        principalDiv.classList.add("text-light");
    }
    if (oscurancia > 0.6) {
        secundarioDiv.classList.remove("text-light");
        secundarioDiv.classList.add("text-dark");
    } else {
        secundarioDiv.classList.remove("text-dark");
        secundarioDiv.classList.add("text-light");
    }
}
function determinarColor(colorFondo) {
    const luminancia = calcularLuminancia(colorFondo);
    if (luminancia > 0.8) {
        return "#000000cb";
    } else {
        return "white";
    }
}
function determinarColorbtn(colorFondo) {
    const luminancia = calcularLuminancia(colorFondo);
    if (luminancia > 0.8) {
        return "dark";
    } else {
        return "light";
    }
}

//Face ejecutar funciones
loginUser();
loadData();
statusSvg("inactive");
statusEdit("inactive");
const listaElementos = document.querySelector('.lista-elementos');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            listaElementos.classList.add('mostrar');
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(listaElementos);