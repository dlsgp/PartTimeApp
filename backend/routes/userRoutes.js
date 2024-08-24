const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const QRCode = require("qrcode");

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

      // JWT 토큰 생성 (환경변수에서 비밀키를 가져옵니다)
      const jwtSecret = process.env.JWT_SECRET || "default_secret_key";

      const accessToken = jwt.sign(
        { userId: id, userType: userType },
        jwtSecret,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign({ userId: id }, jwtSecret, {
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

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, "12345"); // 비밀키는 실제로는 환경변수로 관리해야 합니다.
    const userId = decoded.userId;

    // 새로운 accessToken을 발급
    const newAccessToken = jwt.sign({ userId }, "12345", { expiresIn: "1h" });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(401).json({ message: "Invalid refresh token" });
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

    const commuteInfo =
      commuteResult.rows.length > 0 ? commuteResult.rows[0] : {};
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
      insurance:
        commuteInfo[3] === "1"
          ? "예"
          : commuteInfo[3] === "0"
          ? "아니오"
          : null,
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
      `SELECT DISTINCT
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
      `SELECT S.SCHEDULE_NUM, S.REG_NUM, S.TYPE_NUM, S.NAME, S.SCH_STARTDATE, S.SCH_ENDDATE, S.SCH_WORKTIME, S.SCH_RESTTIME, S.COLOR, S.MEMO, S.RESTDATE, C.WORK_ID, R.NAME
       FROM SCHEDULE S
       JOIN COMMUTE C ON S.REG_NUM = C.REG_NUM
       JOIN REGISTER R ON C.WORK_ID = R.ID
       WHERE C.CEO_ID = :ceoId AND S.SCH_STARTDATE IS NOT NULL AND S.SCH_ENDDATE IS NOT NULL`,
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
    sch_startdate,
    sch_enddate,
    sch_workstarttime,
    sch_workendtime,
    sch_reststarttime,
    sch_restendtime,
    color,
    memo,
    workId,
  } = req.body;
  const dbConfig = req.app.get("dbConfig");
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `INSERT INTO SCHEDULE 
         (SCHEDULE_NUM, NAME, SCH_STARTDATE, SCH_ENDDATE, 
          SCH_WORKSTARTTIME, SCH_WORKENDTIME, 
          SCH_RESTSTARTTIME, SCH_RESTENDTIME, 
          COLOR, MEMO, WORK_ID)
       VALUES 
         (SCHEDULE_SEQ.NEXTVAL, :name, TO_DATE(:sch_startdate, 'YYYY-MM-DD'), TO_DATE(:sch_enddate, 'YYYY-MM-DD'), 
          TO_TIMESTAMP(:sch_workstarttime, 'YYYY-MM-DD HH24:MI:SS.FF'), TO_TIMESTAMP(:sch_workendtime, 'YYYY-MM-DD HH24:MI:SS.FF'), 
          TO_TIMESTAMP(:sch_reststarttime, 'YYYY-MM-DD HH24:MI:SS.FF'), TO_TIMESTAMP(:sch_restendtime, 'YYYY-MM-DD HH24:MI:SS.FF'), 
          :color, :memo, :workId)`,
      {
        name,
        sch_startdate,
        sch_enddate,
        sch_workstarttime,
        sch_workendtime,
        sch_reststarttime,
        sch_restendtime,
        color,
        memo,
        workId,
      },
      { autoCommit: true }
    );

    if (result.rowsAffected > 0) {
      res.status(200).json({ message: "일정이 추가되었습니다." });
    } else {
      res.status(400).json({ message: "일정 추가에 실패했습니다." });
    }
  } catch (err) {
    console.error("Error adding schedule:", err);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});


// 일정 수정
router.put("/schedules/:scheduleNum", async (req, res) => {
  const {
    name,
    sch_startdate,
    sch_enddate,
    sch_worktime,
    sch_resttime,
    color,
    memo,
    restdate,
    workId,
  } = req.body;

  // 날짜 데이터 유효성 검사
  if (!sch_startdate || !sch_enddate) {
    return res
      .status(400)
      .json({ message: "시작일과 종료일을 입력해야 합니다." });
  }

  // 날짜 포맷 검사
  if (isNaN(new Date(sch_startdate)) || isNaN(new Date(sch_enddate))) {
    return res
      .status(400)
      .json({ message: "유효한 날짜 형식을 입력해야 합니다." });
  }

  const { scheduleNum } = req.params;
  const dbConfig = req.app.get("dbConfig");
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `UPDATE SCHEDULE 
       SET NAME = :name, 
           SCH_STARTDATE = TO_DATE(:sch_startdate, 'YYYY-MM-DD'),
           SCH_ENDDATE = TO_DATE(:sch_enddate, 'YYYY-MM-DD'),
           SCH_WORKTIME = TO_TIMESTAMP(:sch_worktime, 'YYYY-MM-DD HH24:MI:SS.FF'),
           SCH_RESTTIME = :sch_resttime, 
           COLOR = :color, 
           MEMO = :memo, 
           RESTDATE = :restdate
       WHERE SCHEDULE_NUM = :scheduleNum`,
      {
        name,
        sch_startdate,
        sch_enddate,
        sch_worktime,
        sch_resttime,
        color,
        memo,
        restdate,
        scheduleNum,
      },
      { autoCommit: true }
    );

    if (result.rowsAffected > 0) {
      res.status(200).json({ message: "일정이 수정되었습니다." });
    } else {
      res.status(400).json({ message: "일정 수정에 실패했습니다." });
    }
  } catch (err) {
    console.error("Error updating schedule:", err);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// 알바생 전용 일정 조회
router.get("/myschedules", async (req, res) => {
  const workId = req.session.userId;  // 로그인된 유저의 ID를 기준으로 조회
  const dbConfig = req.app.get("dbConfig");
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT S.SCHEDULE_NUM, S.NAME, S.SCH_STARTDATE, S.SCH_ENDDATE,
              S.SCH_WORKSTARTTIME, S.SCH_WORKENDTIME, 
              S.SCH_RESTSTARTTIME, S.SCH_RESTENDTIME,
              S.COLOR, S.MEMO
       FROM SCHEDULE S
       WHERE S.WORK_ID = :workId AND S.SCH_STARTDATE IS NOT NULL AND S.SCH_ENDDATE IS NOT NULL`,
      [workId]
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

router.get("/employees", async (req, res) => {
  const ceoId = req.session.userId;
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT DISTINCT r.name, e.employ_date, e.exp_periodend, e.staff_number, c.hourwage
       FROM employ e
       JOIN register r ON e.work_id = r.id
       JOIN commute c ON e.work_id = c.work_id
       WHERE e.ceo_id = :ceoId
       ORDER BY r.name ASC`,
      [ceoId]
    );

    const employees = result.rows.map((row) => ({
      name: row[0],
      employ_date: row[1],
      exp_periodend: row[2],
      staff_number: row[3],
      hourwage: row[4],
    }));

    res.status(200).json(employees);
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

router.get("/generate-qr", (req, res) => {
  const { ceo_id } = req.query;

  if (!ceo_id) {
    return res.status(400).json({ success: false, message: "Missing ceo_id" });
  }

  const qrData = { ceo_id, uuid: require("crypto").randomUUID() };

  QRCode.toDataURL(JSON.stringify(qrData), (err, url) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "QR Code generation failed" });
    }
    res.json({ success: true, qrCodeUrl: url });
  });
});

// router.get("/generate-qr", (req, res) => {
//   const { userId } = req.query;
//   if (!userId) {
//     return res.status(400).json({ success: false, message: "Missing userId" });
//   }

//   const qrData = {
//     userId,
//     uuid: require("crypto").randomUUID(),
//   };

//   QRCode.toDataURL(JSON.stringify(qrData), (err, url) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "QR Code generation failed" });
//     }
//     res.json({ success: true, qrCodeUrl: url });
//   });
// });

// router.get("/generate-qr", (req, res) => {
//   const { ceo_id } = req.query;
//   const qrData = {
//     ceo_id,
//     uuid: require("crypto").randomUUID(),
//   };

//   QRCode.toDataURL(JSON.stringify(qrData), (err, url) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "QR Code generation failed" });
//     }
//     res.json({ success: true, qrCodeUrl: url });
//   });
// });

router.post("/attendance-check", async (req, res) => {
  const { userId, ceo_id } = req.body;
  const dbConfig = req.app.get("dbConfig");

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // EMPLOY 테이블에서 CEO_ID와 WORK_ID가 일치하는지 확인
    const result = await connection.execute(
      `SELECT * FROM EMPLOY WHERE CEO_ID = :ceo_id AND WORK_ID = :userId`,
      [ceo_id, userId]
    );

    if (result.rows.length > 0) {
      // 출석 체크 로직 추가 (출근 혹은 퇴근 시간 기록 등)
      res.status(200).json({ success: true, message: "출석 체크 성공" });
    } else {
      res.status(401).json({ success: false, message: "잘못된 사용자입니다." });
    }
  } catch (err) {
    console.error("Error during attendance check:", err);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
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

// router.post("/attendance-check", (req, res) => {
//   const { userId, ceo_id, uuid } = req.body;

//   // 서버에서 저장된 UUID와 비교
//   // 이 예시에서는 고유 UUID가 저장되어 있다고 가정하고 비교합니다.
//   const storedUUID = getStoredUUIDForUser(userId, ceo_id); // 저장된 UUID를 가져오는 함수

//   if (storedUUID === uuid) {
//     // 출석 체크 성공 로직
//     // 여기에서 출석 정보를 데이터베이스에 기록하거나 다른 처리를 수행
//     res.json({ success: true, message: "출석 체크 완료!" });
//   } else {
//     // 출석 체크 실패 로직
//     res.status(400).json({ success: false, message: "출석 체크 실패!" });
//   }
// });

router.get("/wage", async (req, res) => {
  const { work_id } = req.query;
  const dbConfig = req.app.get("dbConfig");

  if (!work_id) {
    return res.status(400).send("work_id is required");
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT WORKIN, WORKOUT, WORKTIME, PAY, HOURWAGE, RESTTIME_START, RESTTIME_END
       FROM COMMUTE
       WHERE WORK_ID = :work_id`,
      [work_id]
    );

    const commuteData = result.rows.map((row) => ({
      WORKIN: row[0],
      WORKOUT: row[1],
      WORKTIME: row[2],
      PAY: row[3],
      HOURWAGE: row[4],
      RESTTIME_START: row[5],
      RESTTIME_END: row[6],
    }));

    res.json(commuteData);
  } catch (err) {
    console.error("Error fetching wage data:", err);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

module.exports = router;

module.exports = router;
