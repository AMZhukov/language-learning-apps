// eslint-disable-line
import { userService } from '../services/user-service.js';

class UserController {
  // eslint-disable-next-line class-methods-use-this
  async register(req, res, next) {
    try {
      const { email, password, username } = req.body.registrationData;
      const userData = await userService.registration(email, password, username);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV,
      });
      return res.status(200).json(userData);
    } catch (error) {
      return next(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV,
      });
      return res.status(200).json(userData);
    } catch (error) {
      return next(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(200).json('');
    } catch (error) {
      return next(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      return next(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV,
      });
      return res.status(200).json(userData);
    } catch (error) {
      return next(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getUsers(req, res, next) {
    try {
      const allUsers = await userService.getAllUsers();
      return res.status(200).json(allUsers);
    } catch (error) {
      return next(error);
    }
  }
}

export const userController = new UserController();
