const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/Database");

const deleteEmployee = async (req, res) => {
  const { id } = req.body;

  try {
    const result = await sequelize.query(
      `UPDATE employees SET is_deleted = true WHERE id = ${id}`,
      {
        type: QueryTypes.UPDATE,
      }
    );

    if (result[1] === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = deleteEmployee;
