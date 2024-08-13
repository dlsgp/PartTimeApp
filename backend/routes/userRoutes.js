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
      `SELECT type_num FROM register WHERE id = :id AND pwd = :password`,
      [id, password]
    );

    if (result.rows.length > 0) {
      req.session.userId = id;
      // console.log("Login - userID :", userId);
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
      `INSERT INTO register (reg_num, type_num, id, pwd, name, tel, email, add1, add2, birth)
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
  const { id, password, name, add1, jobnum, email, tel } = req.body;
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `INSERT INTO register (reg_num, type_num, id, pwd, name, tel, email, add1, jobnum)
      VALUES (reg_num_seq.NEXTVAL, 2, :id, :password, :name, :tel, :email, :add1, :jobnum)`,
      [id, password, name, tel, email, add1, jobnum],
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
      `SELECT reg_num, id, name, tel, email, add1, add2 FROM register WHERE id = :userId`,
      [userId]
    );

    if (result.rows.length > 0) {
      const userInfo = result.rows[0];
      console.log("result.rows:", result.rows); // 값 확인용
      res.status(200).json({
        reg_num: userInfo[0],
        id: userInfo[1],
        name: userInfo[2],
        tel: userInfo[3],
        email: userInfo[4],
        add1: userInfo[5],
        add2: userInfo[6],
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

// router.post("/update-staffnum", async (req, res) => {
//   const { id, staffNum, employDate, expPeriodStart, expPeriodEnd } = req.body;
//   const ceoId = req.session.userId; // 세션에서 ceoId 가져오기
//   const dbConfig = req.app.get("dbConfig");

//   if (!ceoId) {
//     return res.status(401).json({ message: "로그인이 필요합니다." });
//   }

//   let connection;

//   try {
//     connection = await oracledb.getConnection(dbConfig);

//     const result = await connection.execute(
//       `INSERT INTO employ (em_num, staff_number, ceo_id, work_id, employ_date, exp_periodstart, exp_periodend)
//        VALUES (em_num_seq.NEXTVAL, :staffNum, :ceoId, :id, TO_DATE(:employDate, 'YYYY-MM-DD'), 
//        TO_DATE(:expPeriodStart, 'YYYY-MM-DD'), TO_DATE(:expPeriodEnd, 'YYYY-MM-DD'))`,
//       { staffNum, ceoId, id, employDate, expPeriodStart, expPeriodEnd },
//       { autoCommit: true }
//     );

//     if (result.rowsAffected > 0) {
//       res.status(200).json({ message: "사원번호가 성공적으로 저장되었습니다." });
//     } else {
//       res.status(400).json({ message: "사원번호 저장에 실패했습니다." });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "인터넷 서버 오류 500" });
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// });

router.post("/update-staffnum", async (req, res) => {
  const { id, staffNum, employDate, expPeriodStart, expPeriodEnd } = req.body;
  const ceoId = req.session.userId; // 세션에서 ceoId 가져오기
  const dbConfig = req.app.get("dbConfig");

  if (!ceoId) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // employ 테이블에 데이터 삽입
    const result = await connection.execute(
      `INSERT INTO employ (em_num, staff_number, ceo_id, work_id, employ_date, exp_periodstart, exp_periodend)
       VALUES (em_num_seq.NEXTVAL, :staffNum, :ceoId, :id, TO_DATE(:employDate, 'YYYY-MM-DD'), 
       TO_DATE(:expPeriodStart, 'YYYY-MM-DD'), TO_DATE(:expPeriodEnd, 'YYYY-MM-DD'))`,
      { staffNum, ceoId, id, employDate, expPeriodStart, expPeriodEnd },
      { autoCommit: false } // 이 시점에 커밋하지 않음
    );

    if (result.rowsAffected > 0) {
      // register 테이블에서 reg_num과 type_num 조회
      const regCheck = await connection.execute(
        `SELECT reg_num, type_num FROM register WHERE id = :id`,
        { id }
      );

      if (regCheck.rows.length > 0) {
        const regNum = regCheck.rows[0][0];
        const typeNum = regCheck.rows[0][1];

        // commute 테이블에 데이터 삽입
        const commuteResult = await connection.execute(
          `INSERT INTO commute (reg_num, type_num, ceo_id, work_id)
           VALUES (:regNum, :typeNum, :ceoId, :id)`,
          { regNum, typeNum, ceoId, id },
          { autoCommit: true } // 이 시점에서 커밋
        );

        if (commuteResult.rowsAffected > 0) {
          res.status(200).json({ message: "사원번호와 출퇴근 정보가 성공적으로 저장되었습니다." });
        } else {
          throw new Error("출퇴근 정보 저장에 실패했습니다.");
        }
      } else {
        throw new Error("해당 ID에 대한 등록 정보가 없습니다.");
      }
    } else {
      res.status(400).json({ message: "사원번호 저장에 실패했습니다." });
    }
  } catch (err) {
    console.error(err);
    await connection.rollback(); // 오류 발생 시 롤백
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

router.post("/update-salary", async (req, res) => {
  const { id, name, hourwage, bonuswage, etcwage, insurance, worktime, worktime1, worktime2, worktime3, worktime4, worktime5 } = req.body;
  const ceoId = req.session.userId; // 세션에서 ceoId 가져오기
  const dbConfig = req.app.get("dbConfig");

  if (!ceoId) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // commute 테이블에 데이터 업데이트
    const commuteUpdate = await connection.execute(
      `UPDATE commute
       SET hourwage = :hourwage, holiday_pay = :bonuswage, etc = :etcwage, insurance = :insurance, 
              workTime = :worktime
       WHERE ceo_id = :ceoId AND work_id = :id`,
      {
        hourwage,
        bonuswage,
        etcwage,
        insurance,
        // worktime1: worktime1 || null,
        // worktime2: worktime2 || null,
        // worktime3: worktime3 || null,
        // worktime4: worktime4 || null,
        // worktime5: worktime5 || null,
        worktime,
        ceoId,
        id,
      },
      { autoCommit: true }
    );

    if (commuteUpdate.rowsAffected > 0) {
      res.status(200).json({ message: "급여 정보가 성공적으로 업데이트되었습니다." });
    } else {
      res.status(400).json({ message: "급여 정보 업데이트에 실패했습니다." });
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



router.get("/salary", async (req, res) => {
  const ceoId = req.session.userId; // 세션에서 ceoId 가져오기
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT 
        c.reg_num, c.type_num, c.ceo_id, c.work_id, c.workin, c.workout, 
        c.resttime_start, c.resttime_end, c.worktime1, c.worktime2, c.worktime3, 
        c.worktime4, c.worktime5, c.worktime, c.hourwage, c.holiday_pay, 
        c.insurance, c.etc, c.pay1, c.pay2, c.pay3, c.pay4, c.pay5, c.pay,
        r.name, e.staff_number, e.employ_date
       FROM COMMUTE c
       JOIN REGISTER r ON c.work_id = r.id
       LEFT JOIN EMPLOY e ON c.ceo_id = e.ceo_id AND c.work_id = e.work_id
       WHERE c.ceo_id = :ceoId`,
      [ceoId]
    );
    
    const formattedResult = result.rows.map((row) => ({
      REG_NUM: row[0],
      TYPE_NUM: row[1],
      CEO_ID: row[2],
      WORK_ID: row[3],
      WORKIN: row[4],
      WORKOUT: row[5],
      RESTTIME_START: row[6],
      RESTTIME_END: row[7],
      WORKTIME1: row[8],
      WORKTIME2: row[9],
      WORKTIME3: row[10],
      WORKTIME4: row[11],
      WORKTIME5: row[12],
      WORKTIME: row[13],
      HOURWAGE: row[14],
      HOLIDAY_PAY: row[15],
      INSURANCE: row[16],
      ETC: row[17],
      PAY1: row[18],
      PAY2: row[19],
      PAY3: row[20],
      PAY4: row[21],
      PAY5: row[22],
      PAY: row[23],
      NAME: row[24],
      STAFF_NUMBER: row[25],
      EMPLOY_DATE: row[26],
    }));

    res.status(200).json(formattedResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
});

// 아이디 중복 확인
router.get("/check-id/:id", async (req, res) => {
  const { id } = req.params;
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT COUNT(*) FROM register WHERE id = :id`,
      [id]
    );

    const isDuplicated = result.rows[0][0] > 0;

    if (isDuplicated) {
      res
        .status(200)
        .json({ duplicated: true, message: "이미 사용 중인 아이디입니다." });
    } else {
      res
        .status(200)
        .json({ duplicated: false, message: "사용 가능한 아이디입니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
});

// 이메일 중복 확인
router.get("/check-email/:email", async (req, res) => {
  const { email } = req.params;
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT COUNT(*) FROM register WHERE email = :email`,
      [email]
    );

    const isDuplicated = result.rows[0][0] > 0;

    if (isDuplicated) {
      res
        .status(200)
        .json({ duplicated: true, message: "이미 사용 중인 이메일입니다." });
    } else {
      res
        .status(200)
        .json({ duplicated: false, message: "사용 가능한 이메일입니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
});

// 사업자등록번호 중복 확인
router.get("/check-jobnum/:jobnum", async (req, res) => {
  const { jobnum } = req.params;
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT COUNT(*) FROM register WHERE jobnum = :jobnum`,
      [jobnum]
    );

    const isDuplicated = result.rows[0][0] > 0;

    if (isDuplicated) {
      res.status(200).json({
        duplicated: true,
        message: "이미 사용 중인 사업자등록번호입니다.",
      });
    } else {
      res.status(200).json({
        duplicated: false,
        message: "사용 가능한 사업자등록번호입니다.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
});

module.exports = router;
