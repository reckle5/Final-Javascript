class Producto{
    constructor(id=1, nombre="", precio=1, tipo="", imagen, cantidad=1, prod){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.tipo = tipo
        this.imagen = imagen
        this.cantidad = cantidad
        this.prod = prod
    }
}

let carrito = []

// definiendo constantes
const input1 = document.getElementById("input1");
const botonBusqueda = document.getElementById("botonBusqueda");
const botonCarrito= document.getElementById("botonCarrito");
const miCarrito = document.getElementById("miCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const misProductos = document.getElementById("misProductos");
const cantidad = document.getElementById("cantidad");
const envios = document.getElementById("envios");
const prodMaceta = document.getElementById("macetas")
const prodAlmohadon = document.getElementById("almohadones")
const prodTodos = document.getElementById("todos");
const almohadon = productos.filter ( (almo) => almo.prod === "almohadon");
const maceta = productos.filter((maceta) => maceta.prod === "maceta");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const precioTotal = document.getElementById("precioTotal");
const finalizarCompra = document.getElementById("finalizarCompra");

//BOTON DE BUSQUEDA
botonBusqueda.addEventListener("click", () => {
    console.log(input1.value);
})


//USANDO EL OPERADOR TERNARIO PARA CONSULTAR Y CREAR EL STORAGE
let carritoStorage = (localStorage.getItem('carrito')) ? carrito = JSON.parse(localStorage.getItem('carrito')) : localStorage.setItem('carrito', JSON.stringify(carrito))

    //FUNCION PARA INYECTAR HTML
function inyectar(prod){
 prod.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("productos")
        div.innerHTML = ""
        div.innerHTML = `
        <div class="card " style="width: 18rem;">
        <div class="img-productos"><img src="${producto.imagen}" class="card-img-top img-productos" alt=""></div>
        <div class="card-body prod ">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Marca: ${producto.tipo}</p>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <button class="btn btn-outline-success" id="agregar${producto.id}">Agregar al carrito</button>
            </div>
    
            `
            misProductos.appendChild(div)

            const boton = document.getElementById(`agregar${producto.id}`)
            boton.addEventListener("click", () => agregarAlCarrito(producto.id))
            boton.addEventListener("click", () => {
                Toastify({
                    text: `${producto.nombre} se ha agregado al carrito`,
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right, #136939, #4d9585)",
        
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
                })   
    })  
}


// Agregando Evento a las opciones de productos para que se modifique el DOM 


inyectar(productos)

prodMaceta.addEventListener("click", ()=>{
    misProductos.innerHTML =""
    inyectar(maceta)
})

prodAlmohadon.addEventListener("click",()=>{
    misProductos.innerHTML =""
    inyectar(almohadon)
})

prodTodos.addEventListener("click",()=>{
    misProductos.innerHTML =""
    inyectar(productos)
})

//FUNCION PARA ACTUALIZAR EL DOM Y EL LOCAL STORAGE
function actualizarCarrito(){

    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod)=>{
        const div = document.createElement("div")
        div.className = ("productoEnCarrito")
        div.innerHTML=`
    
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
               <div class="col-md-4">
                  <img src="${prod.imagen}" class="img-fluid rounded-start" alt="...">
                </div>
              <div class="col-md-8">
                  <div class="card-body">
                     <h5 class="card-title">${prod.nombre}</h5>
                      <p class="card-text">$${prod.precio}</p>
                      <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
                     <button  onclick="eliminarCarrito(${prod.id})"class="btn btn-danger"><ion-icon name="trash-outline"></ion-icon></button></button>
                 </div>
               
              </div>
           </div>
        </div>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
}

//FUNCION PARA ELIMINAR UN PRODUCTOS DEL CARRITO
const eliminarCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
    actualizarCarrito() 
   
}

//CREANDO ARRAY Y LLAMANDO AL STORAGE CON LOS PRODUCTOS DE MI CARRITO 
function agregarAlCarrito(productoId) {
    const existe = carrito.some((producto) => producto.id === productoId)

    if(existe){
        const producto = carrito.map(producto =>{
            if(producto.id === productoId){
               producto.cantidad++  // SI EL PRODUCTO YA SE ENCUENTA EN MI ARRAY AUMENTA LA CANTIDAD SIN REPETIR EL PROD EN EL DOM
            }
        })
}else{
    const item = productos.find((producto) => producto.id === productoId)
    carrito.push(item)
}
actualizarCarrito()
}

//POR CADA PROD QUE RECORRO EN EL CARRITO, AL ACUMULADOR LE SUMA LA PROPIEDAD PRECIO
precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)


//Vaciar carrito
function vaciar() {
    carrito.length = 0
    precioTotal.innerText = 0
    
    actualizarCarrito()
    }

vaciarCarrito.addEventListener("click", () =>{
    vaciar()
})

//ALERTA DE COMPRA REALIZADA
finalizarCompra.addEventListener("click", ()=>{
    Swal.fire({
       icon:'success',
       title: 'Su compra ha sido realizada con existo'
     })
     vaciar()
    
})

botonCarrito.addEventListener("click", actualizarCarrito())

console.table(carrito)
   
// LLAMANDO A LA API DE GEOLOCALIZACION PARA CALCULAR COSTOS DE ENVIO
    function Geolocalizacion(){
      fetch("http://ipwho.is/?fields=country,region,city,postal")
         .then(response => response.json())
         .then(({country,region,city,postal}) => {

            
             Swal.fire({
                title:'Su Cotizacion Aproximada a ',
                text: `${country}, ${region}. Ciudad de ${city}, CP:${postal} es de: $800`,   
    })

})
}

envios.addEventListener("click", () => {
    Geolocalizacion()
})
