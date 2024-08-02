const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

// CORS 설정
app.use(cors());

// JSON 바디 파싱
app.use(express.json());

// Oracle DB 설정
oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_23_4" });

const dbConfig = {
  user: "system",
  password: "oracle",
  connectString: "localhost:1521/xe",
};

// dbConfig를 전역으로 설정하여 userRoutes에서 사용할 수 있도록 합니다.
app.set('dbConfig', dbConfig);

// 사용자 라우트
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
