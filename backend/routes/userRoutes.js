const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');

// 로그인 엔드포인트
router.post('/login', async (req, res) => {
  const { id, password } = req.body;
  const dbConfig = req.app.get('dbConfig');
  
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM register WHERE id = :id AND pwd = :password`,
      [id, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: result.rows[0],
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

// 회원가입 엔드포인트
router.post('/signup', async (req, res) => {
  const { username, password, name, birth, add1, email, tel } = req.body;
  const dbConfig = req.app.get('dbConfig');
  
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `INSERT INTO register (reg_num, type, id, pwd, name, tel, email, add1, birth)
      VALUES (reg_num_seq.NEXTVAL, 1, :username, :password, :name, :tel, :email, :add1, TO_DATE(:birth, 'YYYY-MM-DD'))`,
      [username, password, name, tel, email, add1, birth],
      { autoCommit: true }
    );

    res.status(200).json({ success: true, message: "Signup successful", user: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

router.post("/bsignup", async (req, res) => {
  const { username, password, name, add1, businessNumber, email, tel } = req.body;
  const dbConfig = req.app.get('dbConfig');

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `INSERT INTO register (reg_num, type, id, pwd, name, tel, email, add1, regNum)
      VALUES (reg_num_seq.NEXTVAL, 2, :username, :password, :name, :tel, :email, :add1, :businessNumber)`,
      [username, password, name, tel, email, add1, businessNumber],
      { autoCommit: true }
    );

    res.json({ success: true, message: "Business signup successful", user: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

module.exports = router;
