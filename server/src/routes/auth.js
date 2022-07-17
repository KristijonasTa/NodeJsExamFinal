const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const DB_CONFIG = require('../../config');

const router = express.Router();

const authSchema = joi.object({
  fullName: joi.string().required(),
  email: joi.string().email({ tlds: { allow: false } }),
  password: joi.string().min(4).required(),
});

const authLoginSchema = joi.object({
  email: joi.string().email({ tlds: { allow: false } }),
  password: joi.string().min(4).required(),
});

router.post('/register', async (req, res) => {
  const { full_name: fullName, email, password } = req.body;
  try {
    await authSchema.validateAsync({ fullName, email, password });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query(
      `SELECT * FROM users WHERE full_name="${fullName}"`,
    );
    if (rows.length > 0) {
      return res.status(400).json({
        status: 'Bad request',
        error: 'User already exist',
      });
    }
    const [response] = await con.query('INSERT INTO users SET ?', {
      full_name: fullName,
      email,
      password: hashedPass,
    });
    await con.end();
    const token = jwt.sign(
      {
        id: response.insertId,
        full_name: fullName,
        email,
      },
      process.env.JWT_SECRET,
    );
    return res.json({
      db: response,
      token,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    await authLoginSchema.validateAsync({ email, password });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [user] = await connection.query(
      `SELECT * FROM users WHERE email="${email}"`,
    );
    await connection.end();
    if (user.length === 0) {
      return res
        .status(400)
        .json({ status: 'Bad Request!', error: 'User not found!' });
    }
    const compare = await bcrypt.compare(password, user[0].password);
    if (!compare) {
      return res
        .status(400)
        .json({ status: 'Bad Request!', error: 'Password is incorrect!' });
    }
    const token = jwt.sign(
      {
        id: user[0].id,
        email,
      },
      process.env.JWT_SECRET,
    );
    return res.json({
      user: {
        id: user[0].id,
        email: user[0].email,
        created_at: user[0].created_at,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
