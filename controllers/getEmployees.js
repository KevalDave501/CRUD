const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/Database");

const getEmployees = async (req, res) => {
  try {
    const users = await sequelize.query(
      `SELECT id, firstName, lastName, email, password, gender, hobbies, department.department_name FROM employees LEFT JOIN department ON employees.department_id = department.department_id WHERE employees.is_deleted = 0`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

module.exports = getEmployees;
