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
const divProductos = document.getElementById("divProductos");
const misProductos = document.getElementById("misProductos");
const cantidad = document.getElementById("cantidad");
const envios = document.getElementById("envios");

// boton Busqueda
botonBusqueda.addEventListener("click", () => {
    console.log(input1.value);
})


// consultado y creando storage
/*if(localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
} else {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}*/

//USANDO EL OPERADOR TERNARIO PARA CONSULTAR Y CREAR EL STORAGE
let carritoStorage = (localStorage.getItem('carrito')) ? carrito = JSON.parse(localStorage.getItem('carrito')) : localStorage.setItem('carrito', JSON.stringify(carrito))
const mace = document.getElementById("macetas")


const existe = productos.filter((maceta) => maceta.prod === "maceta") 


// inyectando html

function inyectar(prod){
 prod.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("productos")
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

const existe2 = productos.filter ( (almo) => almo.prod === "almohadon")
console.log(existe)
mace.addEventListener("click", () => {
    inyectar(existe2)
})
function eliminarCarrito(prodId){
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
    actualizarCarrito() 
   
}

function actualizarCarrito(){

    divProductos.innerHTML = "",

    carrito.forEach((prod)=>{
        divProductos.innerHTML+=`
    
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
               <div class="col-md-4">
                  <img src="${prod.imagen}" class="img-fluid rounded-start" alt="...">
                </div>
              <div class="col-md-8">
                  <div class="card-body">
                     <h5 class="card-title">${prod.nombre}</h5>
                      <p class="card-text">${prod.precio}</p>
                      <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
                     <button  onclick="eliminarCarrito(${prod.id})"class="btn btn-danger"><ion-icon name="trash-outline"></ion-icon></button></button>
                 </div>
              </div>
           </div>
        </div>
        `
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
}


// creando array y llmando al storage con los productos de mi carrito
function agregarAlCarrito(productoId) {
   

    const existe = carrito.some((producto) => producto.id === productoId)

    if(existe){
        const producto = carrito.map(producto =>{
            if(producto.id === productoId){
               producto.cantidad++
            }
        })
}else{
    const item = productos.find((producto) => producto.id === productoId)
    carrito.push(item)
}
actualizarCarrito()
}

botonCarrito.addEventListener("click", actualizarCarrito())
//inyectando html de mi carrito
   
// llamando a API de geolocalizacion para calcular costos de envio
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
