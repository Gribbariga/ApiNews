const { Comments, User } = require("../models/models");

class newsController {
  async getComments(req, res) {
    try {
      const { idNews, limit, page } = req.query;
      const currentPage = page ? page : 1;
      const currentLimit = limit ? limit : 1;
      let offset = currentPage * currentLimit - currentLimit;
      const com = await Comments.findAll({
        where: { NewsId: idNews },
        offset,
        limit,
      });
      const data = await Promise.all(
        com.map(async (item) => {
          const user = await User.findAll({ where: { id: item.UserId } });
          console.log(user);
          const login = user[0].dataValues.login;
          const data = { text: item.text, login };
          return data;
        })
      );
      console.log();
      return await res.json(data);
    } catch (e) {
      res.json(e.message);
    }

    // let comments;
    // comments = await Comments.findAll({
    //   where: { idNews },
    //   currentLimit,
    //   offset,
    // });
    // console.log(comments);
    // let data = comments.map(async (item) => {
    //   const user = await User.fi(item.idUser);
    //   return;
    // });
    // if (!idNews && !idUser) {
    //   comments = await Comments.findAndCountAll(limit, offset);
    // }
    // if (idNews && !idUser) {
    //   comments = await Comments.findAndCountAll({
    //     where: { idNews },
    //     limit,
    //     offset,
    //   });
    // }
    // if (!idNews && idUser) {
    //   comments = await Comments.findAndCountAll({
    //     where: { idUser },
    //     limit,
    //     offset,
    //   });
    // }
    // if (idNews && idUser) {
    //   comments = await Comments.findAndCountAll({
    //     where: { idNews, idUser },
    //     limit,
    //     offset,
    //   });
    // }
  }

  async postComments(req, res) {
    try {
      const { UserId, NewsId, text } = req.body;
      const com = await Comments.create({ NewsId, UserId, text });
      return res.json(com);
    } catch (e) {
      res.json(e.message);
    }
  }
}

module.exports = new newsController();
