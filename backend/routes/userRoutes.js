const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// 이메일 전송 설정
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gusrl45612@gmail.com",
    pass: "jqrrthumrngyqdmv",
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
      `SELECT type FROM register WHERE id = :id AND pwd = :password`,
      [id, password]
    );

    if (result.rows.length > 0) {
      const userType = result.rows[0][0];
      console.log("User type:", userType);
      console.log(result.rows);
      res.status(200).json({
        success: true,
        message: "Login successful",
        userType: userType,
        userId: id,
      });
      console.log("userId:", id);

    } else {
      res
        .status(401)
        .json({ success: false, message: "잘못된 자격 증명입니다" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "인터넷 서버 오류 500" });
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
  const { id, password, name, birth, add1, add2, email, tel } = req.body;
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `INSERT INTO register (reg_num, type, id, pwd, name, tel, email, add1, add2, birth)
      VALUES (reg_num_seq.NEXTVAL, 1, :id, :password, :name, :tel, :email, :add1, :add2, :birth)`,
      [id, password, name, tel, email, add1, add2, birth],
      { autoCommit: true }
    );

    res
      .status(200)
      .json({ success: true, message: "회원가입 성공", user: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "인터넷 서버 오류 500" });
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
  const { id, password, name, add1, businessNumber, email, tel } = req.body;
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `INSERT INTO register (reg_num, type, id, pwd, name, tel, email, add1, regNum)
      VALUES (reg_num_seq.NEXTVAL, 2, :id, :password, :name, :tel, :email, :add1, :businessNumber)`,
      [id, password, name, tel, email, add1, businessNumber],
      { autoCommit: true }
    );

    res.json({
      success: true,
      message: "사업자 회원가입 성공",
      user: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "인터넷 서버 오류 500" });
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
      const verificationCode = crypto
        .randomBytes(3)
        .toString("hex")
        .toUpperCase();
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
          res
            .status(500)
            .json({ success: false, message: "이메일 전송에 실패했습니다." });
        } else {
          res.status(200).json({
            success: true,
            message: "인증 번호 발송에 성공하였습니다.",
          });
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: "잘못된 아이디 혹은 패스워드입니다.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "인터넷 서버 오류 500" });
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
    res.status(200).json({ success: true, message: "코드 검증 완료" });
  } else {
    res
      .status(400)
      .json({ success: false, message: "잘못된 인증 코드입니다." });
  }
});

// 인증번호 검증 및 비밀번호 재설정
router.post("/reset-password", async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;
  const dbConfig = req.app.get("dbConfig");

  if (verificationCodes[email] !== verificationCode) {
    return res.status(400).json({ message: "잘못된 인증 코드입니다." });
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
      res.status(200).json({ message: "비밀번호 초기화 성공" });
    } else {
      res.status(400).json({ message: "비밀번호 초기화에 실패하였습니다" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "인터넷 서버 오류 500" });
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

router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const dbConfig = req.app.get("dbConfig");

  console.log("Fetching user info for ID:", userId); // 아이디 확인용 로그

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT id, name, tel, email, add1, add2 FROM register WHERE id = :userId`,
      [userId]
    );

    if (result.rows.length > 0) {
      const userInfo = result.rows[0];
      console.log("result.rows:", result.rows); // 값 확인용
      res.status(200).json({
        id: userInfo[0],
        name: userInfo[1],
        tel: userInfo[2],
        email: userInfo[3],
        add1: userInfo[4],
        add2: userInfo[5]
      });
    } else {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "인터넷 서버 오류 500" });
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

router.post("/update-user", async (req, res) => {
  const { id, tel, email, add1, add2 } = req.body;
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `UPDATE register 
       SET tel = :tel, email = :email, add1 = :add1, add2 = :add2 
       WHERE id = :id`,
      { tel, email, add1, add2, id },
      { autoCommit: true }
    );

    if (result.rowsAffected > 0) {
      res.status(200).json({ message: "정보가 성공적으로 수정되었습니다." });
    } else {
      res.status(400).json({ message: "정보 수정에 실패했습니다." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "인터넷 서버 오류 500" });
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
