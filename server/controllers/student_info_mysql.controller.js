const { mySqlPool } = require('../lib/utils/mysql_db');

// Get Student Info in MySQL
async function getStudentInfo(req, res, next) {
  const { id_number } = req.params;

  try {
    const [studentRows, studentFields] = await mySqlPool.query(
      'SELECT ID_No, FName, LName, MName, Course, BDate, Gender FROM sgis_personal WHERE ID_No = ?',
      [Number(id_number)]
    );

    const [contactRows, contactFields] = await mySqlPool.query(
      'SELECT ConName, Address, ContactNo FROM sgis_contactper WHERE ID_No = ?',
      [Number(id_number)]
    );
    // Connection is automatically released when query resolves

    let message = '';
    if (studentRows.length === 0) {
      message = 'Student not found';
    }

    res.json({
      studentInfo: { ...studentRows[0], ...contactRows[0] },
      message,
    });
  } catch (err) {
    err.title = 'GET all departments';
    next(err);
  }
}

exports.getStudentInfo = getStudentInfo;
