// data del ecommers


// function getProducts() {
//     return window.fetch('https://ecommercebackend.fundamentos-29.repl.co/').then((res) => res.json()).
//     then((data) => data).
//     catch((err) => {console.log(err)})
    
// }


// export default getProducts

async function getProducts() {
    try {
        const res = await window.fetch('https://services-academlo-shopping.onrender.com/') 
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error) 
        throw error 
    }
}

export default getProducts