import express from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import realtimeRouter from './routes/realtime.router.js';
import sessionRouter from './routes/session.router.js';
import mockingRouter from './routes/mocking.router.js';
import usersRouter from './routes/user.router.js';
import path from 'path';
import handlebars from 'express-handlebars';
import passport from 'passport';
import config from './config/config.js';
import compression from 'express-compression';
import errorHandler from './middlewares/error.js'
import logger from './utils/logger.js';
import swaggerUiExpress from "swagger-ui-express";
import specs from './utils/swagger.js';
import { __dirname } from "./utils/dirname.js";
import { connectMongo } from './utils/mongo.js';
import { connectSocket } from './utils/sockets.js';
import { iniPassport } from './config/passport.config.js';


const app = express();
const PORT = config.port;
const mongoDBURL = config.mongoDbUrl;


app.use(express.json());
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
    extended: true
}));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(session({
      store: MongoStore.create({ mongoUrl: mongoDBURL, ttl: 86400 }),
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    })
);


iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use('/session', sessionRouter);
app.use('/mocking', mockingRouter);
app.use('/', viewsRouter);
app.use('/', realtimeRouter);


const httpServer = app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`App listening on port ${config.apiUrl}${PORT}`);
});

connectMongo();
connectSocket(httpServer);


app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Not Found"
    });
});

app.use(errorHandler);