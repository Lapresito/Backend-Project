console.log('hola')

const existingCart = document.querySelector(".userCart").id;
console.log(existingCart)
const API_URL = "http://localhost:8080/api/carts"

//toDo deshabiitar boton a los productos sin stock
async function addProductToCart(id){
    const url = API_URL + `/${existingCart}/product/${id}`
    const data = {}
    const options = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(url, options)
    .then((response)=> response.json())
    .then(()=>{
        console.log('Product added successfully')
    })
    .catch((error)=>{
        console.error("Error:", error)
    })


}

