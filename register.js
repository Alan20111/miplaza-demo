const base_url = "";
var recordar=localStorage.getItem('recordar');
if(recordar=="true"){
    window.location.href = "addcard.html";
};

function loginUser() {
    var user = $("#user").val();
    var contrasena = $("#contrasena").val();
    var checkbox = document.getElementById('recordar').checked;

    var jsonLogin = {
        user: user,
        contrasena: contrasena
    }
    checkLogin(jsonLogin, checkbox);
}

function checkLogin(jsonLogin, checkbox) {
    $.ajax({
        url: base_url + "/index.php/Admin/login",
        dataType: "json",
        type: "post",
        data: jsonLogin,
        success: function (datos, estado, jhrx) {
            if (datos.status == "true") {
                localStorage.setItem("recordar", checkbox);
                localStorage.setItem("user", jsonLogin.user);
                localStorage.setItem("contrasena", jsonLogin.contrasena);
                window.location.href = "addcard.html";
            } else {
                if (jsonLogin.user == "" || jsonLogin.contrasena == "") {
                    alert('Completa todos los datos');
                } else {
                    alert('Datos Incorrectos');
                }
            }
        },
        error: function (jhrx, estado, errorA) {
            console.log(errorA);
        }
    })
}
