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
    id,
    name,
    password,
    role,
    email,
  } = req.body;

  const user = {
    id,
    name,
    password,
    role,
    email,
  };

  return user;
};

// Get All Users
router.get('/', async (req, res) => {
  logger.debug('[ Get ] API:/user/');
  res.json(await UserController.getUsers());
});

// Get User by id
router.get('/:id', async (req, res) => {
  logger.debug(`[ Get ] API:/user/${req.params.id}`);
  res.json(await UserController.getUser(req.params.id));
});


// Create a new user
router.post('/', async (req, res) => {
  logger.debug('[ Post ] API:/user/');
  const user = getUser(req);
  res.json(await UserController.insertUser(user));
});

// Update a User by id
router.put('/', async (req, res) => {
  logger.debug('[ Put ] API:/user/');
  const user = getUser(req);
  res.json(await UserController.updateUser(user));
});

// Remove a User by id
router.delete('/', async (req, res) => {
  const {
    id,
  } = req.body;
  logger.debug('[ Delete ] API:/user/');
  res.json(await UserController.deleteUser(id));
});


module.exports = router;
