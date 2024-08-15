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

// jwt 토큰 생성
const jwt = require("jsonwebtoken");

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
      const userType = result.rows[0][0];

      req.session.userId = id;
      
      // JWT 토큰 생성
      const accessToken = jwt.sign(
        { userId: id, userType: userType },
        "12345", // 비밀키 추후 변경
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign({ userId: id }, "12345", { // 비밀키 추후 변경
        expiresIn: "7d",
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        userType: userType,
        userId: id,
        accessToken, // accessToken 추가
        refreshToken, // refreshToken 추가
      });
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
        message: "잘못된 아이디 혹은 이메일입니다.",
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

router.get("/user-and-commute-info/:userId", async (req, res) => {
  const { userId } = req.params;
  const dbConfig = req.app.get("dbConfig");

  console.log("Fetching user and commute info for ID:", userId);

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // 사용자 정보를 가져옵니다.
    const userResult = await connection.execute(
      `SELECT reg_num, id, name, tel, email, add1, add2 FROM register WHERE id = :userId`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }

    const userInfo = userResult.rows[0];
    console.log("User Info:", userInfo);

    // 근무 정보를 가져옵니다.
    const commuteResult = await connection.execute(
      `SELECT hourwage, workin, workout, insurance 
       FROM commute 
       WHERE work_id = :userId`,
      [userId]
    );

    console.log("Commute Info:", commuteResult.rows);

    // 사원번호, 입사일, 수습기간 정보를 가져옵니다.
    const employResult = await connection.execute(
      `SELECT staff_number, employ_date, exp_periodstart, exp_periodend 
       FROM employ 
       WHERE work_id = :userId`,
      [userId]
    );

    console.log("Employ Info:", employResult.rows);

    const commuteInfo = commuteResult.rows.length > 0 ? commuteResult.rows[0] : {};
    const employInfo = employResult.rows.length > 0 ? employResult.rows[0] : {};

    res.status(200).json({
      reg_num: userInfo[0],
      id: userInfo[1],
      name: userInfo[2],
      tel: userInfo[3],
      email: userInfo[4],
      add1: userInfo[5],
      add2: userInfo[6],
      hourwage: commuteInfo[0] || null,
      workin: commuteInfo[1] || null,
      workout: commuteInfo[2] || null,
      insurance: commuteInfo[3] === '1' ? '예' : commuteInfo[3] === '0' ? '아니오' : null,
      staff_number: employInfo[0] || null,
      employ_date: employInfo[1] || null,
      exp_periodstart: employInfo[2] || null,
      exp_periodend: employInfo[3] || null,
    });
  } catch (err) {
    console.error("Error fetching user and commute info:", err);
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
          res.status(200).json({
            message: "사원번호와 출퇴근 정보가 성공적으로 저장되었습니다.",
          });
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
  const {
    id,
    // name,
    hourwage,
    bonuswage,
    etcwage,
    insurance,
    worktime,
    // worktime1,
    // worktime2,
    // worktime3,
    // worktime4,
    // worktime5,
  } = req.body;
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
      res
        .status(200)
        .json({ message: "급여 정보가 성공적으로 업데이트되었습니다." });
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

// 일정 조회
router.get("/schedules", async (req, res) => {
  const ceoId = req.session.userId;
  const dbConfig = req.app.get("dbConfig");
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT S.SCHEDULE_NUM, S.REG_NUM, S.TYPE_NUM, S.NAME, S.SCH_WORKDATE, S.SCH_WORKTIME, S.SCH_RESTTIME, S.COLOR, S.MEMO, S.RESTDATE, C.WORK_ID, R.NAME
           FROM SCHEDULE S
           JOIN COMMUTE C ON S.REG_NUM = C.REG_NUM
           JOIN REGISTER R ON C.WORK_ID = R.ID
           WHERE C.CEO_ID = :ceoId`,
      [ceoId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// 일정 추가
router.post("/schedules", async (req, res) => {
  const {
    name,
    sch_workdate,
    sch_worktime,
    sch_resttime,
    color,
    memo,
    restdate,
    workId,
  } = req.body;
  const ceoId = req.session.userId;
  const dbConfig = req.app.get("dbConfig");
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // REGISTER 테이블에서 REG_NUM과 TYPE_NUM을 가져옵니다.
    const regResult = await connection.execute(
      `SELECT REG_NUM, TYPE_NUM FROM REGISTER WHERE ID = :workId`,
      { workId }
    );

    if (regResult.rows.length === 0) {
      return res.status(400).json({ message: "유효한 직원 ID가 아닙니다." });
    }

    const [REG_NUM, TYPE_NUM] = regResult.rows[0];

    if (!REG_NUM || !TYPE_NUM) {
      return res.status(400).json({ message: "등록된 REG_NUM 또는 TYPE_NUM이 없습니다." });
    }

    const result = await connection.execute(
      `INSERT INTO SCHEDULE (SCHEDULE_NUM, REG_NUM, TYPE_NUM, NAME, SCH_WORKDATE, SCH_WORKTIME, SCH_RESTTIME, COLOR, MEMO, RESTDATE)
       VALUES (SCHEDULE_SEQ.NEXTVAL, :regNum, :typeNum, :name, TO_DATE(:sch_workdate, 'YYYY-MM-DD'), TO_TIMESTAMP(:sch_worktime, 'YYYY-MM-DD HH24:MI:SS.FF'), :sch_resttime, :color, :memo, :restdate)`,
      {
        regNum: REG_NUM,  // 추출된 REG_NUM 사용
        typeNum: TYPE_NUM,  // 추출된 TYPE_NUM 사용
        name,
        sch_workdate,
        sch_worktime,
        sch_resttime,
        color,
        memo,
        restdate,
      },
      { autoCommit: true }
    );

    if (result.rowsAffected > 0) {
      res.status(200).json({ message: "일정이 추가되었습니다." });
    } else {
      res.status(400).json({ message: "일정 추가에 실패했습니다." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});


// 값 가져오기
router.get("/work-ids", async (req, res) => {
  const ceoId = req.session.userId;
  console.log("ceoId:", ceoId); // 로그로 ceoId 확인

  if (!ceoId) {
    return res.status(400).json({ error: "ceoId is missing from session" });
  }

  const dbConfig = req.app.get("dbConfig");
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT c.work_id, r.name
       FROM SYSTEM.COMMUTE c
       JOIN SYSTEM.REGISTER r ON c.reg_num = r.reg_num
       WHERE c.ceo_id = :ceoId`,
      [ceoId]
    );
    console.log("Database result:", result.rows); // 데이터베이스 결과 확인
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// router.get("/work-ids", async (req, res) => {
//   const ceoId = req.session.userId; // 세션에서 ceoId 가져오기
//   const dbConfig = req.app.get("dbConfig");
//   console.log("ceoId:", ceoId);
//   let connection;

//   try {
//     connection = await oracledb.getConnection(dbConfig);

//     // commute 테이블에서 ceoId로 검색하여 모든 work_id와 name 가져오기
//     const result = await connection.execute(
//       `SELECT c.WORK_ID, r.NAME
//        FROM COMMUTE c
//        JOIN REGISTER r ON c.WORK_ID = r.ID
//        WHERE c.CEO_ID = :ceoId`,
//       [ceoId]
//     );
//     console.log("Database result:", result.rows);

//     const workIds = result.rows.map((row) => ({
//       work_id: row[0],
//       name: row[1],
//     }));

//     res.json(workIds);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Database error" });
//   } finally {
//     if (connection) {
//       await connection.close();
//     }
//   }
// });

// router.get('/work-ids', async (req, res) => {
//     const ceoId = req.session.userId; // 로그인한 사용자의 ID 가져오기
//     const dbConfig = req.app.get('dbConfig');
//     let connection;

//     try {
//         connection = await oracledb.getConnection(dbConfig);
//         const result = await connection.execute(
//             `SELECT WORK_ID, NAME FROM COMMUTE WHERE CEO_ID = :ceoId`,
//             [ceoId]
//         );

//         if (result.rows.length > 0) {
//             // 데이터가 있을 때만 응답
//             const workIds = result.rows.map(row => ({
//                 work_id: row[0],
//                 name: row[1]
//             }));
//             res.json(workIds);
//         } else {
//             res.json([]); // 데이터가 없을 경우 빈 배열 반환
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Database error' });
//     } finally {
//         if (connection) {
//             await connection.close();
//         }
//     }
// });

module.exports = router;
