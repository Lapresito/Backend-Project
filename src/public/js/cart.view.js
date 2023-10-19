
const url = "https://lapresito.onrender.com:8080/session/current"
fetch(url)
  .then(response => response.json())
  .then(data => {
    const user = data.user;
    let nick = document.querySelector('#userCart');
    let nameNode = document.createTextNode(` of ${user.firstName}`);
    nick.appendChild(nameNode);

  })
  .catch(error => {
    console.error('Error:', error);

  });


async function deleteProd(id){
  const cart = document.querySelector('#cart')
  const cartid = cart.textContent.trim()
  const baseUrl = 'https://lapresito.onrender.com:8080'; 
  const apiUrl = `${baseUrl}/api/carts/${cartid}/product/${id}`;
  fetch(apiUrl, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
})
.then(response => {
    if (response.ok) {
        console.log("DELETE Successful");
        // Puedes agregar código adicional si es necesario
    } else {
        console.error("Something went wrong");
    }
})
.catch(error => {
    console.error("Error in DELETE request:", error);
});

}




function purchase(){
// toDo generar validacion por stock

}

