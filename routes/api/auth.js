/**
 * User Routes for '/user' URL
 * @author Sagrika Aggarwal
 */
const express = require('express');

const {
  logger,
} = require('../../config/logger');
const UserController = require('../../controllers/user');

const router = express.Router();

/**
 * Build a complete User object from user body.
 * @param {express.Application.User} req
 */
const getUser = (req) => {
  const {
    email,
    password,
  } = req.body;

  const user = {
    email,
    password,
  };

  return user;
};

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access   Public

router.post('/', async (req, res) => {
  logger.debug('[ Post ] API:/auth/');
  const user = getUser(req);
  res.json(await UserController.authUser(user));
});

module.exports = router;
