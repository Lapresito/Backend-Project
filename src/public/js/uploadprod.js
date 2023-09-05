// const formNewProduct = document.getElementById("form.products");
// formNewProduct.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     let newProduct = {
//         title: document.getElementById("title").value,
//         description: document.getElementById("description").value,
//         price: document.getElementById("price").value,
//         code: document.getElementById("code").value,
//         category: document.getElementById("category").value,
//         thumbnail: document.getElementById("thumbnail").value,
//         stock: document.getElementById("stock").value,
//         owner: document.getElementById("owner").value
//     };

//     if (
//         !newProduct.title ||
//         !newProduct.description ||
//         !newProduct.price ||
//         !newProduct.code ||
//         !newProduct.category ||
//         !newProduct.thumbnail ||
//         !newProduct.stock ||
//         !newProduct.owner
//     ) {
//         return alert("Empty fields, please fill in all the fields");
//     } else {
//         try {
//             const response = await fetch("http://localhost:8080/api/products", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({newProduct})
//             });

//             if (response.ok) {
//                 console.log("Product added successfully!!!!");
//             } else {
//                 console.error("Failed to add product");
//             }
//         } catch (error) {
//             console.error("An error occurred:", error);
//         }
//     }
// });


const formNewProduct = document.getElementById("form.products");

formNewProduct.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newProduct = getFormData();
    if (validateFormData(newProduct)) {
        try {
            await addProduct(newProduct);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    } else {
        alert("Empty fields, please fill in all the fields");
    }
});

function getFormData() {
    return {
        title: getValue("title"),
        description: getValue("description"),
        price: getValue("price"),
        code: getValue("code"),
        category: getValue("category"),
        thumbnail: getValue("thumbnail"),
        stock: getValue("stock"),
        owner: getValue("owner")
    };
}

function getValue(elementId) {
    return document.getElementById(elementId).value;
}

function validateFormData(newProduct) {
    return Object.values(newProduct).every(value => !!value);
}

async function addProduct(newProduct) {
    const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( newProduct )
    });

    if (response.ok) {
        console.log("Product added successfully!!!!");
        alert("Product added successfully!!!!")
    } else {
        console.error("Failed to add product");
    }
}
