const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// 이메일 전송 설정
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'gusrl45612@gmail.com',
    pass: 'jqrrthumrngyqdmv',
  },
});

//인증번호 저장을 위한 객체
const verificationCodes = {};

// 로그인 엔드포인트
router.post("/login", async (req, res) => {
  const { id, password } = req.body;
  const dbConfig = req.app.get("dbConfig");

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
router.post("/signup", async (req, res) => {
  const { username, password, name, birth, add1, email, tel } = req.body;
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `INSERT INTO register (reg_num, type, id, pwd, name, tel, email, add1, birth)
      VALUES (reg_num_seq.NEXTVAL, 1, :username, :password, :name, :tel, :email, :add1, TO_DATE(:birth, 'YYYY-MM-DD'))`,
      [username, password, name, tel, email, add1, birth],
      { autoCommit: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Signup successful", user: result });
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

// 사업자 회원가입 엔드포인트
router.post("/bsignup", async (req, res) => {
  const { username, password, name, add1, businessNumber, email, tel } =
    req.body;
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `INSERT INTO register (reg_num, type, id, pwd, name, tel, email, add1, regNum)
      VALUES (reg_num_seq.NEXTVAL, 2, :username, :password, :name, :tel, :email, :add1, :businessNumber)`,
      [username, password, name, tel, email, add1, businessNumber],
      { autoCommit: true }
    );

    res.json({
      success: true,
      message: "Business signup successful",
      user: result,
    });
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

// 비밀번호 찾기 인증번호 전송 엔드포인트
router.post("/send-verification-code", async (req, res) => {
  const { id, email } = req.body;
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT email FROM register WHERE id = :id AND email = :email`,
      [id, email]
    );

    if (result.rows.length > 0) {
      const verificationCode = crypto.randomBytes(3).toString("hex").toUpperCase();
      verificationCodes[email] = verificationCode;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "비밀번호 재설정 인증번호",
        text: `인증번호는 ${verificationCode} 입니다.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: "Failed to send email" });
        } else {
          res.status(200).json({ message: "Verification code sent" });
        }
      });
    } else {
      res.status(400).json({ message: "Invalid user or email" });
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

// 인증번호 검증 엔드포인트
router.post("/verify-code", async (req, res) => {
  const { email, verificationCode } = req.body;

  if (verificationCodes[email] === verificationCode) {
    res.status(200).json({ success: true, message: "Code verified" });
  } else {
    res.status(400).json({ success: false, message: "Invalid verification code" });
  }
});

// 인증번호 검증 및 비밀번호 재설정
router.post("/reset-password", async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;
  const dbConfig = req.app.get("dbConfig");

  if (verificationCodes[email] !== verificationCode) {
    return res.status(400).json({ message: "Invalid verification code" });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `UPDATE register SET pwd = :newPassword WHERE email = :email`,
      [newPassword, email],
      { autoCommit: true }
    );

    if (result.rowsAffected > 0) {
      res.status(200).json({ message: "Password reset successful" });
    } else {
      res.status(400).json({ message: "Failed to reset password" });
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

module.exports = router;
