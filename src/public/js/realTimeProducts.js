// FRONT-END

const socket = io()

//Data ingresada input

const formNewProduct = document.getElementById("form.products")

formNewProduct.addEventListener("submit", (e) => {
    e.preventDefault();
    let newProduct = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        category: document.getElementById("category").value,
        thumbnail: document.getElementById("thumbnail").value,
        stock: document.getElementById("stock").value
    }
    socket.emit("newProduct", newProduct);
    socket.on('updatedProducts', (data) => {
        try {
            console.log(data);
            document.getElementById("dynamicProducts").innerHTML = data.reduce((acc, item) => {
                return acc + `<h2>${item.title}</h2>
                <img src="${item.thumbnail}" alt="">
                <h3>Price: ${item.price}</h3>
                <p>Stock: ${item.stock}</p>`;
            }, '');
        } catch (error) {
            throw new Error(error.message)
        }


    })
});



// Recibo nueva lista