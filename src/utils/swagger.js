import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from "./dirname.js";


const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'E-commerce documentation',
            description: 'An e-commerce project for a backend course'
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

const specs = swaggerJSDoc(swaggerOptions);


export default specs;