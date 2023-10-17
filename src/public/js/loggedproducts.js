

const existingCart = document.querySelector(".userCart").id;

const API_URL = "http://localhost:8080/api/carts"


const user = document.getElementById('userMail').textContent


//toDo deshabiitar boton a los productos sin stock
async function addProductToCart(id) {
    const options1 = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    
    try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`, options1);
        
        if (response.ok) {
            const productData = await response.json();
            console.log('Response from first fetch:', productData);
            
            if(productData.payload.owner === user){
               return alert('You cant add your own product')
            }
        } else {
            console.error("Failed to fetch product");
        }
    } catch (error) {
        console.error("Error:", error);
    }

    const url = API_URL + `/${existingCart}/product/${id}`;
    const data = {};
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    
    try {
        const response = await fetch(url, options);

        if (response.ok) {
            console.log('Product added successfully');
        } else {
            console.error("Failed to add product to cart");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


