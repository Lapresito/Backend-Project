import config from '../config/config.js';

export let CartMethods;
export let ProductMethods;
export let ChatMethods;
export let TicketMethods;
export let UserMethods;


switch (config.persistence) {
  case 'MONGO':
    console.log('Persistence with Mongo')
    const { cartModel } = await import('../dao/mongo/classes/carts.dao.js');
    CartMethods = cartModel;
    const { productModel } = await import('../dao/mongo/classes/products.dao.js');
    ProductMethods = productModel;
    const { chatModel } = await import('../dao/mongo/classes/chat.dao.js');
    ChatMethods = chatModel;
    const { ticketModel } = await import('../dao/mongo/classes/tickets.dao.js');
    TicketMethods = ticketModel;
    const { userModel } = await import('../dao/mongo/classes/users.dao.js')
    UserMethods = userModel;

    break;
  case 'MEMORY':
    console.log('Persistence with Memory');
    const { ContactsMemory } = await import('./memory/contacts.memory.js');
    Contacts = ContactsMemory;

    break;
  default:
    break;
}