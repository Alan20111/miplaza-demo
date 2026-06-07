const base_url = "http://localhost/Miplaza/";
var tarjetastotal;
var aco = 0;

const cargarcard = (entradas, observador) => {
    entradas.forEach((entrada) => {
        var id = entrada.target.id;
        id = "list-nav-" + (id.charAt(id.length - 1));

        // Verificar si el elemento existe
        var miElemento = document.getElementById(id);

        if (entrada.isIntersecting) {
            miElemento.scrollIntoView({ behavior: 'auto', block: 'nearest' });

            miElemento.classList.add("active");
            // Agrega la clase para la transición de aparición y para hacer visible
            entrada.target.classList.add('visible');
            entrada.target.classList.remove('opacity-0');
        } else {
            miElemento.classList.remove("active");
        }
    });
};
function loadData() {
    $.ajax({
        url: base_url + "index.php/Admin/readData",
        dataType: "json",
        type: "post",
        data: {},
        success: function (datos, estado, jhrx) {
            if (datos.status == 'success') {
                tarjetastotal = datos;
                renderTarjetas(datos.tarjetas);

                const observador = new IntersectionObserver(cargarcard, {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.6
                });
                tarjetastotal.tarjetas.forEach((tarjeta) => {
                    const elemento = document.getElementById('list-item-' + tarjeta.id);
                    if (elemento) {
                        // Agrega la clase inicial si el elemento ya está en la pantalla al cargar la página
                        if (elemento.getBoundingClientRect().top < window.innerHeight) {
                            elemento.classList.add('visible');
                            elemento.classList.remove('opacity-0');
                        }

                        // Observa el elemento
                        observador.observe(elemento);
                    }
                });
            }
        },
    });
}

function renderTarjetas(datosTarjetas) {
    var contenedor = document.getElementById('list-example');
    contenedor.innerHTML = '';

    datosTarjetas.forEach(function (valor, i, array) {

        // Crear el elemento li
        var listItem = document.createElement('li');
        listItem.className = "nav-item list-group p-0 rounded-5 list-nav m-1 w-100";

        // Crear el elemento a
        var enlace = document.createElement('a');
        enlace.className = "nav-link list-nav  list-group-item list-group-item-action"
        enlace.href = "#list-item-" + valor.id;
        enlace.innerHTML = "<p class='m-0 px-1 py-0' style='color: #70B34D; min-width:150px;'>" + valor.navtittle + "</p>";
        enlace.id = "list-nav-" + valor.id;
        // Agregar el elemento a como hijo del elemento li
        listItem.appendChild(enlace);

        // Agregar el elemento li al contenedor
        contenedor.appendChild(listItem);
    });
    ``


    var contenedorr = document.getElementById('list');
    contenedorr.innerHTML = '';

    datosTarjetas.forEach(function (valor, i, array) {
        var tarjetaDiv = document.createElement('div');
        tarjetaDiv.className = 'conteiner shadow opacity-0 rounded rounded-2';
        tarjetaDiv.id = 'list-item-' + valor.id;
        tarjetaDiv.style.background = "white";
        tarjetaDiv.style.margin = '0 0 20vh 0';
        tarjetaDiv.style.minHeight = "70vh";
        tarjetaDiv.style.height = "auto";
        tarjetaDiv.style.maxWidth = "768px";
        var tarjetaContenido = `
            <div class="row d-flex p-sm-5 p-4" style="height:100%">
                ${alternarHtml(datosTarjetas.length, i)}
            </div>
        `;
        tarjetaDiv.innerHTML = tarjetaContenido;
        contenedorr.appendChild(tarjetaDiv);

        aco++;

        if (aco === datosTarjetas.length) {
            var footer = document.createElement('footer');
            footer.className = 'position-relative pt-5 shadow';
            footer.innerHTML = `
            <ul class="nav justify-content-center">
        </ul>
        <div class="line"></div>
        <p>© MiPlaza.com © 2023 - Todos los derechos reservados</p>
        <div class="position-absolute bottom-0 end-0 m-2"><a href="../admin" title="Admin">
            <svg
            xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#795548"
            class="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z" />
            </svg></a></div>
            `;
            contenedorr.appendChild(footer);
        }
    });
}

var it = 0;
function alternarHtml(length, i) {
    var atribute = "";
    var atribute1 = "";
    
    it++;
    if (it == 1) {
        atribute = "asi1";
        atribute1 = "asi2";
    } else {
        it = 0;
        atribute = "asi2";
        atribute1 = "asi1";
    }
    const asides = `
        <div class="col-md-6 col-sm-12 d-flex flex-column justify-content-center position-relative ${atribute} px-3" >
            <div class="tittle position-relative img-card">
                <img src="${base_url}${tarjetastotal.tarjetas[i].img}" alt="" class=" object-fit-cover rounded rounded-3 h-100 w-100 position-absolute  start-50 translate-middle-x">
                <p class="w-100 rounded-bottom-3 fs-2 text-wrap text-center rounder rounder-1 px-2 display-6 position-absolute bottom-0 start-50 translate-middle-x m-0 text-${determinarColor(tarjetastotal.tarjetas[i].color)} " style="background: ${tarjetastotal.tarjetas[i].color};">
                    ${tarjetastotal.tarjetas[i].tittle}
                </p>
            </div>
            <div class="descripcion h-25 mt-5 mx-auto  text-wrap" style="max-length: 150%;">
                <p style="color:${tarjetastotal.tarjetas[i].color};">${tarjetastotal.tarjetas[i].descripcion}</p>
            </div>
        </div >
        <div class="col-md-6 col-sm-12 card-container ${atribute1} posiotion-relative" id="card-container-${tarjetastotal.tarjetas[i].id} px-3" style="height:65vh" >
            <div class="card-float  sticky-element" style="top:198px;"> 
                <p class="h4 h-25" style="color:${tarjetastotal.tarjetas[i].color};">
                    Actividades
                </p>
                <ul class="h-75 list-group list-group-flush rounded-3" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 40px 40px -7px;">
                    <li class="list-group-item ;" style="border-bottom: solid 1px ${tarjetastotal.tarjetas[i].color}; color:${tarjetastotal.tarjetas[i].color}">${tarjetastotal.tarjetas[i].act1}</li>
                    <li class="list-group-item ;" style="border-bottom: solid 1px ${tarjetastotal.tarjetas[i].color}; color:${tarjetastotal.tarjetas[i].color}">${tarjetastotal.tarjetas[i].act2}</li>
                    <li class="list-group-item ;" style="border-bottom: solid 1px ${tarjetastotal.tarjetas[i].color}; color:${tarjetastotal.tarjetas[i].color}">${tarjetastotal.tarjetas[i].act3}</li>
                    <li class="list-group-item ;" style="border-bottom: solid 1px ${tarjetastotal.tarjetas[i].color}; color:${tarjetastotal.tarjetas[i].color}">${tarjetastotal.tarjetas[i].act4}</li>
                    <li class="list-group-item ;" style="color:${tarjetastotal.tarjetas[i].color}">${tarjetastotal.tarjetas[i].act5}</li>
                </ul>
            </div>
        </div >
    `;
    return asides;
}

function calcularLuminancia(color) {
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;

    return 0.299 * r + 0.587 * g + 0.114 * b;
}

function determinarColor(colorFondo) {
    const luminancia = calcularLuminancia(colorFondo);
    if (luminancia > 0.75) {
        return "black";
    } else {
        return "light";
    }
}
    loadData();
