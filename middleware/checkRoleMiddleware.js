const jwt = require("jsonwebtoken");

module.exports = (role) => {
  return (req, res, next) => {
    if (req.method === "OPTION") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "не авторизован" });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).json({ message: "Нет доступа" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "не авторизован" });
    }
  };
};
