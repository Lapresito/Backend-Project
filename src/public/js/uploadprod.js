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
    const response = await fetch("https://lapresito-shia.onrender.com/api/products", {
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
