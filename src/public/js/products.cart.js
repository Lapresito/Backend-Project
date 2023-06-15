const existingCart = localStorage.getItem('Cart ID:');
const API_URL = "http://localhost:8080/api/carts"
if(!existingCart){
    alert('no cart');
    const url = API_URL;
    const data= {}
    const options = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    }

    fetch(url, options)
    .then((response)=> response.json())
    .then((data)=>{
        console.log("Response:", data)
        alert(JSON.stringify(data.payload._id))
        const existingCart = localStorage.setItem("Cart ID:", data.payload._id)
    })
    .catch((error)=>{
        console.error("Error:", error)
    })
}

function addProductToCart(id){
    // alert("Add" + id + "to cart" + existingCart);
    const existingCart = localStorage.getItem('Cart ID:');
    console.log(existingCart)
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
        alert('Product added succesfully')
    })
    .catch((error)=>{
        console.error("Error:", error)
    })
}

function openCart(){
    const cart = localStorage.getItem('Cart ID:');
}