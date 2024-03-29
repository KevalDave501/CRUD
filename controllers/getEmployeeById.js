const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/Database");

const getEmployeeById = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await sequelize.query(
      `SELECT id,
      firstName,
      lastName,
      email,
      password,
      gender,
      hobbies,
      department_id FROM employees WHERE id = ${id}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (result.length === 0) {
      return res.status(400).json({ error: "Employee Not Found" });
    }

    res.status(200).json({
      message: "Employees fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log("Error Detected", error);
  }
};

module.exports = getEmployeeById;
