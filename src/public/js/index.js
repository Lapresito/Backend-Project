// FRONT-END
const socket = io()

// Real time products
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
                return acc + `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; border: solid 3px blue; width: 100%">
                <h2>${item.title}</h2>
                <img src="${item.thumbnail}" style="max-width: 100px; max-height: 200px">
                <h3>Price: ${item.price}</h3>
                <p>Stock: ${item.stock}</p>
                <button onclick="deleteProduct('${item._id}')" > Delete </button>
                </div>`;
            }, '');
        } catch (error) {
            throw new Error(error.message)
        }


    })
});


function deleteProduct(_id){

    socket.emit("deleteProduct", _id)
    socket.on('updatedProducts', (data) => {
        try {
            console.log(data);
            document.getElementById("dynamicProducts").innerHTML = data.reduce((acc, item) => {
                return acc + `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; border: solid 3px blue; width: 100%">
                <h2>${item.title}</h2>
                <img src="${item.thumbnail}" style="max-width: 100px; max-height: 200px">
                <h3>Price: ${item.price}</h3>
                <p>Stock: ${item.stock}</p>
                <button onclick="deleteProduct('${item._id}')" > Delete </button>
                </div>`; 
            }, '');
        } catch (error) {
            throw new Error(error.message)
        }
    })
}

//Chat 


let userEmail = '';
async function getEmail(){
    const { value: email } = await Swal.fire({
      title: 'Input email address to chat',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address'
    });
  
    if (email) {
      Swal.fire(`Entered email: ${email}`);
    }
  
    userEmail = email;
  }
getEmail();

const typePlace = document.getElementById('type-place');
typePlace.addEventListener('keyup', ({ key }) =>{
    if(key === 'Enter'){
        socket.emit('newMessage', {
            user: userEmail,
            message: typePlace.value
        })
        typePlace.value = ''
    }});

    socket.on('updatedMessages', (newMessage)=>{   
            document.getElementById("chat-box").innerHTML = newMessage.reduce((acc, item) => {
                return acc + `<div class="oneUserMsg">
                <h3>${item.user}</h2>
                <p>${item.message}</p>
                </div>`; 
            }, '');
    })
    
function addProductToCart(){
    
}