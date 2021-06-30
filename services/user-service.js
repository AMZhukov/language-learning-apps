// eslint-disable-line
import Shortid from 'shortid';
import bcryptjs from 'bcryptjs';
import { User } from '../models/User.js';
import { mailService } from './mail-service.js';
import { tokenService } from './token-service.js';
import { UserDto } from '../dtos/user-dto.js';
import { ApiErrors } from '../exceptions/ApiErrors.js';

class UserService {
  // eslint-disable-next-line class-methods-use-this
  async registration(email, password, username) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiErrors.BadRequest('На данную почту уже зарегистрирован аккаунт');
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    const activationLink = Shortid.generate();
    const user = new User({
      username,
      email,
      password: hashedPassword,
      activationLink,
    });
    // eslint-disable-next-line consistent-return
    await user.save((error) => {
      if (error) {
        throw ApiErrors.BadRequest(`${error}`);
      }
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.CLIENT_URL}/api/activate${activationLink}`,
    );
    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  async activate(activateLink) {
    const user = await User.findOne({ activateLink });
    if (!user) {
      throw ApiErrors.BadRequest('Некорректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
  }

  // eslint-disable-next-line class-methods-use-this
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiErrors.BadRequest('Пользователь не найден');
    }
    const isMatch = await bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      throw ApiErrors.BadRequest('Пользователь не найден');
    }
    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  async logout(refreshToken) {
    await tokenService.deleteToken(refreshToken);
  }

  // eslint-disable-next-line class-methods-use-this
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiErrors.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findRefreshToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiErrors.UnauthorizedError();
    }
    const user = await User.findById(userData.id);
    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  async getAllUsers() {
    const users = await User.find();
    return users;
  }
}

export const userService = new UserService();
