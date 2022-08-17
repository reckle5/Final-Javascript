class Producto{
    constructor(id=1, nombre="", precio=1, tipo="", imagen){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.tipo = tipo
        this.imagen = imagen
    }
}
//array de productos
const productos = [
    {id:1, nombre:"Alisa", precio:850,  tipo:"N14", imagen:'../imagenes/alisa.png'},
    {id:2, nombre:"White", precio:1200, tipo:"N°16", imagen:'../imagenes/white.png' },
    {id:3, nombre:"Golden", precio:850, tipo:"N14", imagen:'../imagenes/golden.png'},
    {id:4, nombre:"Wooden Like" , precio:450, tipo:"N°8", imagen:'../imagenes/m6.png'},
    {id:5, nombre:"Daisy", precio:680, tipo:"N°12", imagen:'../imagenes/maceta amarrilla.png'},
    {id:6, nombre:"Marga", precio:680, tipo:"N°12", imagen:'../imagenes/m5.png'},
    {id:7, nombre:"Mate", precio:680, tipo:"N°12", imagen:'../imagenes/maceta mate.png'},
    {id:8, nombre:"Fatima", precio:850, tipo:"N14", imagen:'../imagenes/m7.png'},
    {id:9, nombre:"Brains", precio:680, tipo:"N°12", imagen:'../imagenes/macetabrains.png'},
    {id:10, nombre:"Llama", precio:680, tipo:"N°12", imagen:'../imagenes/llama.png'},
    {id:11, nombre:"Homero", precio:750, tipo:"N°10",imagen: '../imagenes/m4.png'},
    {id:12, nombre:"Perfect", precio:450, tipo:"N°8", imagen:'../imagenes/m8.png'},
    {id:13,nombre:"Parma",  precio:600, tipo:"Tussor Rayas", imagen:'../imagenes/almohadones parma.jpeg'},
    {id:14,nombre:"Invierno Pack x3",  precio:2300,  tipo:"Piel Sintetica, Tussor", imagen:'../imagenes/almo.jpg'},
    {id:15,nombre:"Vikings Pack x3", precio: 2300,  tipo:"Piel Sintetica, Tussor", imagen:'../imagenes/pakx3.png'},
    {id:16,nombre:"Tussor Pack x3", precio:1950, tipo:"Tussor Liso", imagen:'../imagenes/car5.jpg'},
    {id:17,nombre:"Tussor silla", precio:440, tipo:"Tussor Liso", imagen:'../imagenes/almopra silla.png'},
    {id:18,nombre:"Grey Pack x2",  precio:2200, tipo:"Piel Sintetica, Tussor Print", imagen:'../imagenes/amoha gris.jpg'},
    {id:19,nombre:"Tussor",  precio:440,  tipo:"Tussor Liso", imagen:'../imagenes/tussor.png'},
    {id:20,nombre:"Pack Bohemian",  precio:2100, tipo: "Tussor Rayas, Decorado", imagen:'../imagenes/pack 3 boho.webp'},
    {id:21,nombre:"Della",  precio:1500, tipo: "Seda", imagen:'../imagenes/della.jpg'}
]

let carrito = []

// definiendo constantes
const input1 = document.getElementById("input1");
const botonBusqueda = document.getElementById("botonBusqueda");
const botonCarrito= document.getElementById("botonCarrito");
const miCarrito = document.getElementById("miCarrito");
const divProductos = document.getElementById("divProductos");
const misProductos = document.getElementById("misProductos");

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


// inyectando html
productos.forEach(producto => {
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

// creando array y llmando al storage con los productos de mi carrito
const agregarAlCarrito = (productoId) => {
    let item = productos.find((producto) => producto.id === productoId)
    carrito.push(item)
    console.log(carrito)
localStorage.setItem('carrito', JSON.stringify(carrito))
}

//inyectando html de mi carrito
        botonCarrito.addEventListener("click", () =>{
            let arrayStorage = JSON.parse(localStorage.getItem("carrito"))
            divProductos.innerHTML = "",
             
            arrayStorage.forEach((carrit,indice) =>{
    
                divProductos.innerHTML+=`
    
                <div class="card mb-3" style="max-width: 540px;" id="carrit${indice}">
                  <div class="row g-0">
                       <div class="col-md-4">
                           <img src="${carrit.imagen}" class="img-fluid rounded-start" alt="...">
                        </div>
                      <div class="col-md-8">
                          <div class="card-body">
                             <h5 class="card-title">${carrit.nombre}</h5>
                              <p class="card-text">${carrit.precio}</p>
                             <button class="btn btn-danger"><ion-icon name="trash-outline"></ion-icon></button></button>
                         </div>
                      </div>
                   </div>
                </div>
                `
        })
            // haciendo funcional el boton de eliminar, borrando productos del dom, array y storage
            arrayStorage.forEach((carrit, indice) => {
                let botonCarr = document.getElementById(`carrit${indice}`).lastElementChild.lastElementChild
                botonCarr.addEventListener('click', () => {
                    document.getElementById(`carrit${indice}`).remove()
                   carrito.splice(indice,1)
                   localStorage.setItem('carrito', JSON.stringify(carrito))
                    console.log(`${carrit.nombre} Eliminada`)
                })
            }) 
        }) 

// llamando a API de geolocalizacion para calcular costos de envio
    const envios = document.getElementById("envios")
 
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
