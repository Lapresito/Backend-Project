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
    if(!newProduct.title || !newProduct.description || !newProduct.price|| !newProduct.code|| !newProduct.category || !newProduct.thumbnail || !newProduct.stock){
       return alert('Empty fields, please add all the statements')
    }
    socket.emit("newProduct", newProduct);
    socket.on('updatedProducts', (data) => {
        try {
            console.log(data);
            document.getElementById("dynamicProducts").innerHTML = data.reduce((acc, item) => {
                return acc + `<div id=${item.id} style="display: flex; flex-direction: column; justify-content: center; align-items: center; border: solid 3px blue; width: 100%">
                <h2>${item.title}</h2>
                <img src="${item.thumbnail}" style="max-width: 100px; max-height: 200px">
                <h3>Price: ${item.price}</h3>
                <p>Stock: ${item.stock}</p>
                <button onclick="deleteProduct(${item.id})" > Delete </button>
                </div>`;
            }, '');
        } catch (error) {
            throw new Error(error.message)
        }


    })
});


function deleteProduct(id){

    socket.emit("deleteProduct", id)
    socket.on('updatedProducts', (data) => {
        try {
            console.log(data);
            document.getElementById("dynamicProducts").innerHTML = data.reduce((acc, item) => {
                return acc + `<div id=${item.id} style="display: flex; flex-direction: column; justify-content: center; align-items: center; border: solid 3px blue; width: 100%">
                <h2>${item.title}</h2>
                <img src="${item.thumbnail}" style="max-width: 100px; max-height: 200px">
                <h3>Price: ${item.price}</h3>
                <p>Stock: ${item.stock}</p>
                <button onclick="deleteProduct(${item.id})" > Delete </button>
                </div>`;
            }, '');
        } catch (error) {
            throw new Error(error.message)
        }
    })
}