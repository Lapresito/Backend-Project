import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import fetch from 'node-fetch'
import config from '../config/config.js';
import logger from '../utils/logger.js';
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import { UserModel } from '../dao/mongo/models/users.model.js';
import { CartService } from '../services/carts.service.js';

const cartService = new CartService
const LocalStrategy = local.Strategy;

export function iniPassport() {
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ email: username });
        if (!user) {
          logger.warn('User not found with email ' + username);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password[0])) {
          logger.warn('Invalid password');
          return done(null, false);
        }

        await UserModel.updateOne({ email: user.email },{ last_connection: Date.now() } )

        return done(null, user);
      } catch (error) {
        logger.fatal(error)
        return done(error);
      }
    })
  );

  passport.use('register', new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { email, firstName, lastName } = req.body;
          let user = await UserModel.findOne({ email: username });
          if (user) {
            logger.warn('User already exists');
            return done(null, false);
          }

          let userCart = await cartService.addCart()
          logger.info(userCart)
          const newUser = {
            email,
            firstName,
            lastName,
            rol: 'user',
            password: createHash(password),
            cart: userCart._id,
            last_connection: Date.now()
          };
          let userCreated = await UserModel.create(newUser);
          await UserModel.updateOne({ email: newUser.email }, { last_connection: Date.now() } )
          logger.info('User Registration succesful');
          return done(null, userCreated);
        } catch (error) {
          logger.error('Error in register');
          logger.error(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: `https://lapresito-shia.onrender.com/session/githubcallback`,
      },
      async (accesToken, _, profile, done) => {
        try {
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: 'Bearer ' + accesToken,
              'X-Github-Api-Version': '2022-11-28',
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error('Cannot get a valid email for this user'));
          }
          profile.email = emailDetail.email;

          let user = await UserModel.findOne({ email: profile.email });
          if (!user) {
            let userCart = await cartService.addCart()
            const newUser = {
              email: profile.email,
              firstName: profile._json.name || profile._json.login || 'Avatar',
              lastName: profile._json.name ||'Avatar',
              password: null,
              rol: 'user',
              cart: userCart._id,
              last_connection: Date.now()
            };
            let userCreated = await UserModel.create(newUser);
            logger.info('User registration succesful');
            return done(null, userCreated);
          } else {
            logger.warn('User already exists');
            return done(null, user);
          }
        } catch (error) {
          logger.error('Error in authentication with github');
          logger.error(error)
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => { done(null, user._id) });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
    });
}