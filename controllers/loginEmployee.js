const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const sequelize = require("../utils/Database");

const JWT_SECRET = "uisdw782783dfjkf";

const loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const existingEmployee = await sequelize.query(
    `SELECT email, password FROM employees WHERE email = '${email}'`,
    { type: QueryTypes.SELECT }
  );

  console.log(existingEmployee);

  if (existingEmployee.length === 0) {
    return res.status(400).json({ error: "Email not found" });
  }

  const passwordMatch = await bcrypt.compare(
    password,
    existingEmployee[0].password
  );

  if (!passwordMatch) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  if (passwordMatch) {
    const token = jwt.sign(
      {
        email: existingEmployee[0].email,
      },
      JWT_SECRET
    );
    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  }
};

module.exports = loginEmployee;
