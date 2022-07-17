const express = require('express');
const mysql = require('mysql2/promise');
const joi = require('joi');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authentication');

const router = express.Router();

const accountsSchema = joi.object({
  groupId: joi.string().required(),
  userId: joi.string().required(),
});

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query(
      `SELECT * FROM accounts 
      JOIN egzam.groups ON accounts.group_id=egzam.groups.id 
      JOIN users ON accounts.user_id=users.id`,
    );
    await con.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', isLoggedIn, async (req, res) => {
  const { group_id: groupId, user_id: userId } = req.body;
  try {
    await accountsSchema.validateAsync({ groupId, userId });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query('INSERT INTO accounts SET ?', {
      group_id: groupId,
      user_id: userId,
    });
    await con.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
