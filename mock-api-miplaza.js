/* Capa de simulación MiPlaza — datos ficticios, login que entra, CRUD en memoria. Nada se envía a un servidor. */
(function(){
  function shade(hex){ try{ return (typeof reducirTono==='function')? reducirTono(hex,50): hex; }catch(e){ return hex; } }
  window._mockTarjetas = [
    {id:1,img:"profesionals.jpg",color:"#70B34D",sombra:shade("#70B34D"),tittle:"Gerente de Tienda",navtittle:"Gerencia",descripcion:"Responsable general de la sucursal MiPlaza.",act1:"Supervisar al personal",act2:"Controlar inventario",act3:"Atención a clientes",act4:"Reportes de ventas",act5:"Gestión de proveedores",imgName:"profesionals.jpg"},
    {id:2,img:"carnes-people.png",color:"#1A56B2",sombra:shade("#1A56B2"),tittle:"Encargado de Carnicería",navtittle:"Carnicería",descripcion:"Manejo del área de carnes frías y frescas.",act1:"Cortar y pesar producto",act2:"Mantener cadena de frío",act3:"Limpieza del área",act4:"Control de mermas",act5:"Atención al cliente",imgName:"carnes-people.png"},
    {id:3,img:"referencia.jpg",color:"#dc3545",sombra:shade("#dc3545"),tittle:"Cajera Principal",navtittle:"Cajas",descripcion:"Cobro y atención en el punto de venta.",act1:"Cobro de productos",act2:"Manejo de efectivo",act3:"Cierre de caja",act4:"Aplicar promociones",act5:"Atención al cliente",imgName:"referencia.jpg"},
    {id:4,img:"referencia1.jpg",color:"#f59e0b",sombra:shade("#f59e0b"),tittle:"Almacenista",navtittle:"Almacén",descripcion:"Control de bodega y acomodo de mercancía.",act1:"Recibir mercancía",act2:"Acomodar anaqueles",act3:"Revisar caducidades",act4:"Surtir tienda",act5:"Inventarios",imgName:"referencia1.jpg"}
  ];
  if(window.jQuery){
    jQuery.ajax = function(opts){ opts=opts||{}; var url=(opts.url||"")+"";
      setTimeout(function(){ try{
        if(/Admin\/login/i.test(url)) opts.success && opts.success({status:"true",Status:"True"},"success",{});
        else if(/Admin\/readData/i.test(url)) opts.success && opts.success({status:"success",tarjetas:window._mockTarjetas},"success",{});
        else opts.success && opts.success({status:"success"},"success",{});
      }catch(e){console.log("mock",e);} },120);
      return {done:function(){return this;},fail:function(){return this;},always:function(){return this;}};
    };
  }
  window.loadData = function(){ window.renderTarjetasvar=window._mockTarjetas; if(typeof renderTarjetas==='function') renderTarjetas(window._mockTarjetas); };
  function readForm(){ var $=window.jQuery; var g=function(id){var e=document.getElementById(id);return e?e.value:"";};
    var color=g('formColor')||"#70B34D"; var prev=document.getElementById('imagePreview');
    var img=(prev&&prev.src&&prev.src.indexOf('data:')===0)?prev.src:"imagenDefault.jpg";
    return {color:color,img:img,tittle:g('formTittle')||"Nuevo puesto",navtittle:g('formTittle-nav')||"Nuevo",
      descripcion:g('formArea')||"Descripción del puesto.",act1:g('formAct1')||"Actividad 1",act2:g('formAct2')||"Actividad 2",
      act3:g('formAct3')||"Actividad 3",act4:g('formAct4')||"Actividad 4",act5:g('formAct5')||"Actividad 5"}; }
  window.saveData = function(){ var d=readForm();
    if(window.booleanEdit==="true" && window.idTarjetaFocus){
      var c=window._mockTarjetas.find(function(t){return t.id===window.idTarjetaFocus;});
      if(c){ Object.assign(c,d,{sombra:shade(d.color)}); }
    } else {
      window._mockTarjetas.push(Object.assign({id:Date.now(),sombra:shade(d.color),imgName:"nuevo.jpg"},d));
    }
    window.booleanEdit="false"; window.renderTarjetasvar=window._mockTarjetas; renderTarjetas(window._mockTarjetas);
    try{ if(typeof cleanInputs==='function') cleanInputs(); if(typeof statusEdit==='function') statusEdit('inactive'); }catch(e){}
    alert("Tarjeta guardada (demo). No se envía a ningún servidor.");
  };
  window.upload = window.saveData;
  window.deleteCards = function(){ if(window.idTarjetaFocus){
      window._mockTarjetas=window._mockTarjetas.filter(function(t){return t.id!==window.idTarjetaFocus;});
      window.renderTarjetasvar=window._mockTarjetas; renderTarjetas(window._mockTarjetas);
      try{ if(typeof cleanInputs==='function') cleanInputs(); if(typeof statusEdit==='function') statusEdit('inactive'); }catch(e){}
      alert("Tarjeta eliminada (demo).");
  } };
  function hint(){ var loginEl=document.getElementById('user'); if(loginEl){ var f=loginEl.closest('form')||loginEl.parentNode;
      var h=document.createElement('div'); h.textContent="Demo: ingresa cualquier usuario y contraseña para entrar.";
      h.style.cssText="margin:10px auto;max-width:340px;font-size:13px;color:#fff;background:rgba(0,0,0,.55);padding:7px 12px;border-radius:8px;text-align:center;"; f.insertBefore(h,f.firstChild); } }
  function init(){ hint(); if(document.getElementById('contenedor')){ try{ window.loadData(); }catch(e){console.log(e);} } }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();
