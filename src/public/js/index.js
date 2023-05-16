const socket = io()

// handler

socket.on('testing_messages', (data)=>{
    
    console.log(data)

})