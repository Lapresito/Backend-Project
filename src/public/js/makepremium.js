async function makePremium(email) {
    console.log(email);

    const baseUrl = 'https://lapresito-shia.onrender.com'; 
    const apiUrl = `${baseUrl}/api/users/premium/${email}`;

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        if (response.ok) {
            console.log("Been premium successful");
        } else {
            console.error("Something went wrong");
        }
    })
    .catch(error => {
        console.error("Error in POST request", error);
    });

    alert('restart the page to see the changes')
}
