require('dotenv').config()
const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

const getAll = async (req, res) => {
    res.status(200).send({okk : true});
  }

  module.exports = {
    getAll
}
