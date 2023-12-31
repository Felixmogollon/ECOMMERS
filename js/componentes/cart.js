function cart(db,printProducts) {

    let cart = []

    // Elementos del Dom
    const productsDOM = document.querySelector('.products__container')
    const notifyDOM = document.querySelector('.notify')
    const cartDOM = document.querySelector('.cart__body')
    const countDOM = document.querySelector('.cart__count--item')
    const totalDOM =document.querySelector('.cart__total--item')
    const checkoutDOM = document.querySelector('.btn--buy')

    
// FUNCIONES


    function printCart() {

        let htmlCart = ''
        

        if (cart.length === 0) {
            htmlCart += `
                <div class="cart__empty">
                    <i class="bx bx-cart"></i>
                    <p class="cart__empty--text">No hay productos en el carrito</p>
                </div>
            `
            notifyDOM.classList.remove('show--notify')
            
        } else{
            for (const item of cart) {
                const product = db.find(p => p.id === item.id)
                htmlCart += `
                <article class="article">
                    <div class="article__image">
                        <img src="${product.image}"
                            alt="${product.name}">
                    </div>
                    <div class="article__content">
                        <h3 class="article__title">${product.name}</h3>
                        <span class="article__price">$${product.price}</span>
                        <div class="article__quantity">
                            <button type="button" class="article__quantity-btn 
                            article--minus" data-id="${item.id}">
                                <i class="bx bx-minus"></i>
                            </button>
                            <span class="article__quantity-text">${item.qty}</span>
                            <button type="button" class="article__quantity-btn" data-id="${item.id}">
                                <i class="bx bx-plus"></i>
                            </button>
                        </div>
                        <button type="button" class="article__btn remove-from-cart" data-id="${item.id}">
                            <i class="bx bx-trash"> </i>
                        </button>
                    </div>
                </article>
                `
                
            }
            notifyDOM.classList.add('show--notify')
        }

        cartDOM.innerHTML = htmlCart
        notifyDOM.innerHTML = showItemsCount()
        countDOM.innerHTML = showItemsCount()
        totalDOM.innerHTML=  showTotal() 

        
    }
    function addToCart (id,qty = 1) {
        const productFinded = db.find(i => i.id === id)

        if (productFinded.quantity > 0) {
            const itemFinded = cart.find(i => i.id === id)
            if (itemFinded) {
                console.log('El producto con el id '  +  " " + id  + " " + ' ya esta')
            
                if (validStock(id,qty + itemFinded.qty)) {
                    itemFinded.qty += qty
    
                    
                }else{
                    window.alert("Ya no hay existencias en bodega")
                }
                
            }else{
                console.log('El producto con el id ' + id + ' no esta')
                cart.push({id , qty})
            }
        } else  {
        window.alert('Ya no tenemos de este producto')
        }
        
        printCart()
        
    }

    function validStock(id,qty) {
        const productFinded = db.find(function(p){
            return p.id === id
        })
        
        return productFinded.quantity >= qty

        
    }


    function removeFromCart(id,qty = 1) {
        const itemFinded = cart.find(i => i.id === id)
        const result= itemFinded.qty -= qty
        if (result > 0) {
            console.log('Quedan productos con el id ' + id)
            itemFinded.qty -= qty
            
        } else{
            console.log('No quedan productos con el id ' + id)
            cart = cart.filter(i => i.id !== id)
        }
        printCart()

        
    }
    // removeFromCart(2)
    // removeFromCart(2)

    function deleteFromCart(id) {
        cart = cart.filter(i => i.id !== id)
        console.log('Se elimino el producto con el id ' + id)
        printCart()
        
    }
  

    function showItemsCount() {
        let suma = 0
        for (const item of cart) {
            suma += item.qty
            
        }
        return suma
        
    }

    function showTotal() {
        let total = 0
        for (const item of cart) {
            const productFinded = db.find(p => p.id === item.id)
            total += item.qty * productFinded.price
            
        }
        return total
    }

    function checkout() {
        for (const item of cart) {
            const productFinded = db.find(p => p.id === item.id)
            productFinded.quantity -= item.qty
        
    }

    cart = []
    printCart()
    printProducts()
    window.alert('Gracias por su compra ')
         } 

            printCart()


        // EVENTOS  

        productsDOM.addEventListener('click', function(e) {
            if (e.target.closest('.add--to--cart')) {
                const id = +e.target.closest('.add--to--cart').dataset.id
                addToCart(id)
                
            }
        })

        cartDOM.addEventListener('click', function(e){
            if (e.target.closest('.article--minus')) {
                const id = +e.target.closest('.article--minus').dataset.id
               removeFromCart(id)
                
            }

            if (e.target.closest('.article__quantity-btn')) {
                const id = +e.target.closest('.article__quantity-btn').dataset.id
                addToCart(id)
                
            }

            if (e.target.closest('.remove-from-cart')) {
                const id = +e.target.closest('.remove-from-cart').dataset.id
                deleteFromCart(id)
                
            }
        } )

        checkoutDOM.addEventListener('click', function () {
            checkout()
        })


 


    

    
}

export default cart