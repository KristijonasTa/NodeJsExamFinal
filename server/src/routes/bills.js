const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authentication');

const router = express.Router();

const billsSchema = joi.object({
  group_id: joi.number().required(),
  amount: joi.number().required(),
  description: joi.string().required(),
});

router.get('/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [bills] = await con.query(
      `SELECT group_id, amount, description from bills JOIN egzam.groups ON egzam.groups.id=bills.group_id HAVING group_id=${Number(
        id,
      )}`,
    );
    await con.end();
    return res.json(bills);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const billsBody = req.body;
    try {
      await billsSchema.validateAsync(billsBody);
    } catch (err) {
      return res.status(400).json(err);
    }
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query('INSERT INTO bills SET ?', billsBody);
    await con.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
