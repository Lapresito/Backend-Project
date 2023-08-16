import config from '../config/config.js';
import logger from '../utils/logger.js';

export let CartMethods;
export let ProductMethods;
export let ChatMethods;
export let TicketMethods;
export let UserMethods;


switch (config.persistence) {
  case 'MONGO':
    logger.info('Persistence with Mongo')
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
  case 'FS':
    logger.info('Persistence with FileSystem');
    const { cartManager } = await import('../dao/fs/classes/CartsManager.js');
    CartMethods = cartManager;
    const { productManager } = await import('../dao/fs/classes/ProductManager.js');
    ProductMethods = productManager;

    break;
  default:
    break;
}