


const url = "http://localhost:8080/session/current"
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
