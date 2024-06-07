const { mySqlPool } = require('../lib/utils/mysql_db');

// Get Student Info in MySQL
async function getStudentInfo(req, res, next) {
  const { id_number } = req.query;

  try {
    // For pool initialization, see above
    const [rows, fields] = await mySqlPool.query(
      'SELECT FName, LName, MName, Course, BDate, Gender, ProvAdd, CityAdd FROM sgis_personal  WHERE ID_No = ?',
      [Number(id_number)]
    );
    // Connection is automatically released when query resolves

    console.log(rows);
    res.json();
  } catch (err) {
    err.title = 'GET all departments';
    next(err);
  }
}

exports.getStudentInfo = getStudentInfo;
