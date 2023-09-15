import loader from './componentes/loader.js'
import showMenu from './componentes/showmenu.js'
import showCart from './componentes/showcart.js'
import products from './componentes/products.js'
import getProducts from './helpers/getproducts.js'
import cart from './componentes/cart.js'
// import toggleDarkMode from './componentes/darkmode.js'
// ocultar el loader


// console.log("hola mundo")
loader()


//mostrar menu
showMenu()

//mostrar carrito

showCart()

//PRODUCTOS 

const {db,printProducts} = products(await getProducts())

//CARRITO
cart(db,printProducts)

//carrito
window.toggleDarkMode = function () {
    const body = document.body;

    // Agrega o elimina la clase 'dark-mode' del elemento 'body'
    body.classList.toggle('dark-mode');
}
