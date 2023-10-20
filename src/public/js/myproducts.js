async function deleteItem(id) {
    try {
        const url = `https://lapresito-shia.onrender.com/api/products/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            console.log("Product deleted successfully");
            alert("Product deleted successfully, please reload the page")
        } else {
            console.error("Failed to delete product");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
