const express = require('express');
const mysql = require('mysql2/promise');
const joi = require('joi');
const isLoggedIn = require('../middleware/authentication');
const DB_CONFIG = require('../../config');

const router = express.Router();

const groupSchema = joi.object({
  name: joi.string().required(),
});

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query('SELECT * FROM egzam.groups');
    await connection.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', isLoggedIn, async (req, res) => {
  const { name } = req.body;
  try {
    await groupSchema.validateAsync({ name });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [response] = await con.query('INSERT INTO egzam.groups SET ?', {
      name,
    });
    await con.end();
    return res.json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
