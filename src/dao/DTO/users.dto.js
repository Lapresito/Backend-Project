

export class UserDTO{

    constructor(user){

        this.firstName = user.firstName,
        this.lastName = user.lastName,
        this.email = user.email,
        this.rol = user.rol,
        this.cart = user.cart,
        this.purchases = user.purchases
    }
}

