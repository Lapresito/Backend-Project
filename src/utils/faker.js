import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from 'uuid';



export const generateProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: faker.image.imageUrl(),
    code: uuidv4(),
    stock: faker.datatype.number(),
    status: faker.datatype.boolean(),
    category: faker.commerce.department(),
  };
};