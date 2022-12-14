const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJWT = (id, email, login, role) => {
  return jwt.sign(
    {
      id: id,
      email: email,
      login: login,
      role: role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

class userController {
  async registration(req, res, next) {
    try {
      const { email, password, login, role } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("Некоректный email или password"));
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest("Пользователь с таким email уже существует")
        );
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        email,
        login,
        role,
        password: hashPassword,
      });
      const token = generateJWT(user.id, user.email, user.login, user.role);
      return res.json(token);
    } catch (e) {
      res.json(e.message);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.internal("пользователь не найдет"));
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal("Неверный пароль"));
      }
      const token = generateJWT(user.id, user.email, user.login);
      return res.json(token);
    } catch (e) {
      res.json(e.message);
    }
  }

  async check(req, res) {
    try {
      const token = generateJWT(req.user.id, req.user.email, req.user.login);
      return res.json({ token });
    } catch (e) {
      res.json(e.message);
    }
  }
}

module.exports = new userController();
