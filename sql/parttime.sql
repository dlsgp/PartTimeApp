/* exerd 시작 */

ALTER TABLE register
	DROP
		CONSTRAINT FK_positiontype_TO_register
		CASCADE;

ALTER TABLE commute
	DROP
		CONSTRAINT FK_register_TO_commute
		CASCADE;

ALTER TABLE commute
	DROP
		CONSTRAINT FK_employ_TO_commute
		CASCADE;

ALTER TABLE schedule
	DROP
		CONSTRAINT FK_register_TO_schedule
		CASCADE;

ALTER TABLE resume
	DROP
		CONSTRAINT FK_register_TO_resume
		CASCADE;

ALTER TABLE register
	DROP
		PRIMARY KEY
		CASCADE
		KEEP INDEX;

ALTER TABLE positiontype
	DROP
		PRIMARY KEY
		CASCADE
		KEEP INDEX;

ALTER TABLE commute
	DROP
		PRIMARY KEY
		CASCADE
		KEEP INDEX;

ALTER TABLE myPage
	DROP
		PRIMARY KEY
		CASCADE
		KEEP INDEX;

ALTER TABLE payManager
	DROP
		PRIMARY KEY
		CASCADE
		KEEP INDEX;

ALTER TABLE schedule
	DROP
		PRIMARY KEY
		CASCADE
		KEEP INDEX;

ALTER TABLE registerCeo
	DROP
		PRIMARY KEY
		CASCADE
		KEEP INDEX;

ALTER TABLE resume
	DROP
		PRIMARY KEY
		CASCADE
		KEEP INDEX;

ALTER TABLE company
	DROP
		PRIMARY KEY
		CASCADE
		KEEP INDEX;

ALTER TABLE employ
	DROP
		PRIMARY KEY
		CASCADE
		KEEP INDEX;

/* 회원가입 */
DROP TABLE register 
	CASCADE CONSTRAINTS;

/* 직책유형 */
DROP TABLE positiontype 
	CASCADE CONSTRAINTS;

/* 출퇴근 */
DROP TABLE commute 
	CASCADE CONSTRAINTS;

/* 마이페이지 */
DROP TABLE myPage 
	CASCADE CONSTRAINTS;

/* 급여관리 */
DROP TABLE payManager 
	CASCADE CONSTRAINTS;

/* 스케줄관리 */
DROP TABLE schedule 
	CASCADE CONSTRAINTS;

/* 업주회원가입 */
DROP TABLE registerCeo 
	CASCADE CONSTRAINTS;

/* 알바 이력 */
DROP TABLE resume 
	CASCADE CONSTRAINTS;

/* 기업 */
DROP TABLE company 
	CASCADE CONSTRAINTS;

/* 고용 */
DROP TABLE employ 
	CASCADE CONSTRAINTS;

/* 회원가입 */
CREATE TABLE register (
	reg_num NUMBER NOT NULL, /* 번호 */
	type_num NUMBER NOT NULL, /* 분류 */
	name VARCHAR2(30), /* 이름/대표자이름 */
	id VARCHAR2(30), /* 아이디 */
	pwd VARCHAR2(50), /* 비밀번호 */
	jobNum VARCHAR2(50), /* 사업자등록번호 */
	email VARCHAR(50), /* 이메일 */
	tel VARCHAR2(30), /* 전화번호 */
	phoneNum VARCHAR2(30), /* 대표자 전화번호 */
	birth VARCHAR2(30), /* 생년월일 */
	birthNum VARCHAR2(30), /* 주민번호 */
	add1 VARCHAR2(100), /* 주소 */
	add2 VARCHAR2(100), /* 상세주소 */
	reg_date DATE /* 가입일 */
);

COMMENT ON TABLE register IS '회원가입';

COMMENT ON COLUMN register.reg_num IS '번호';

COMMENT ON COLUMN register.type_num IS '분류';

COMMENT ON COLUMN register.name IS '이름/대표자이름';

COMMENT ON COLUMN register.id IS '아이디';

COMMENT ON COLUMN register.pwd IS '비밀번호';

COMMENT ON COLUMN register.jobNum IS '사업자등록번호';

COMMENT ON COLUMN register.email IS '이메일';

COMMENT ON COLUMN register.tel IS '전화번호';

COMMENT ON COLUMN register.phoneNum IS '대표자 전화번호';

COMMENT ON COLUMN register.birth IS '생년월일';

COMMENT ON COLUMN register.birthNum IS '주민번호';

COMMENT ON COLUMN register.add1 IS '주소';

COMMENT ON COLUMN register.add2 IS '상세주소';

COMMENT ON COLUMN register.reg_date IS '가입일';

ALTER TABLE register
	ADD
		CONSTRAINT PK_register
		PRIMARY KEY (
			reg_num,
			type_num
		);

/* 직책유형 */
CREATE TABLE positiontype (
	type_num NUMBER NOT NULL, /* 분류 */
	type_name VARCHAR2(30) NOT NULL /* 분류이름 */
);

COMMENT ON TABLE positiontype IS '직책유형';

COMMENT ON COLUMN positiontype.type_num IS '분류';

COMMENT ON COLUMN positiontype.type_name IS '분류이름';

ALTER TABLE positiontype
	ADD
		CONSTRAINT PK_positiontype
		PRIMARY KEY (
			type_num
		);

/* 출퇴근 */
CREATE TABLE commute (
	reg_num NUMBER NOT NULL, /* 번호 */
	type_num NUMBER NOT NULL, /* 분류 */
	ceo_id VARCHAR2(50) NOT NULL, /* 기업 아이디 */
	work_id VARCHAR2(50) NOT NULL, /* 고용자 아이디 */
	workIn TIMESTAMP, /* 출근시간 */
	workOut TIMESTAMP, /* 퇴근시간 */
	restTime_start TIMESTAMP, /* 휴게시작시간 */
	restTime_end TIMESTAMP, /* 휴게끝시간 */
	workTime1 NUMBER, /* 1주차 근무시간 */
	workTime2 NUMBER, /* 2주차 근무시간 */
	workTime3 NUMBER, /* 3주차 근무시간 */
	workTime4 NUMBER, /* 4주차 근무시간 */
	workTime5 NUMBER, /* 5주차 근무시간 */
	workTime NUMBER, /* 총 근무시간 */
	hourWage NUMBER, /* 시급 */
	holiday_pay NUMBER, /* 주휴수당 */
	insurance VARCHAR2(10), /* 4대보험유무 */
	etc NUMBER, /* 기타급여 */
	pay1 NUMBER, /* 1주차 급여 */
	pay2 NUMBER, /* 2주차 급여 */
	pay3 NUMBER, /* 3주차 급여 */
	pay4 NUMBER, /* 4주차 급여 */
	pay5 NUMBER, /* 5주차 급여 */
	pay NUMBER /* 총 급여 */
);

COMMENT ON TABLE commute IS '출퇴근';

COMMENT ON COLUMN commute.reg_num IS '번호';

COMMENT ON COLUMN commute.type_num IS '분류';

COMMENT ON COLUMN commute.ceo_id IS '기업 아이디';

COMMENT ON COLUMN commute.work_id IS '고용자 아이디';

COMMENT ON COLUMN commute.workIn IS '출근시간';

COMMENT ON COLUMN commute.workOut IS '퇴근시간';

COMMENT ON COLUMN commute.restTime_start IS '휴게시작시간';

COMMENT ON COLUMN commute.restTime_end IS '휴게끝시간';

COMMENT ON COLUMN commute.workTime1 IS '1주차 근무시간';

COMMENT ON COLUMN commute.workTime2 IS '2주차 근무시간';

COMMENT ON COLUMN commute.workTime3 IS '3주차 근무시간';

COMMENT ON COLUMN commute.workTime4 IS '4주차 근무시간';

COMMENT ON COLUMN commute.workTime5 IS '5주차 근무시간';

COMMENT ON COLUMN commute.workTime IS '총 근무시간';

COMMENT ON COLUMN commute.hourWage IS '시급';

COMMENT ON COLUMN commute.holiday_pay IS '주휴수당';

COMMENT ON COLUMN commute.insurance IS '4대보험유무';

COMMENT ON COLUMN commute.etc IS '기타급여';

COMMENT ON COLUMN commute.pay1 IS '1주차 급여';

COMMENT ON COLUMN commute.pay2 IS '2주차 급여';

COMMENT ON COLUMN commute.pay3 IS '3주차 급여';

COMMENT ON COLUMN commute.pay4 IS '4주차 급여';

COMMENT ON COLUMN commute.pay5 IS '5주차 급여';

COMMENT ON COLUMN commute.pay IS '총 급여';

ALTER TABLE commute
	ADD
		CONSTRAINT PK_commute
		PRIMARY KEY (
			reg_num,
			type_num,
			ceo_id,
			work_id
		);

/* 마이페이지 */
CREATE TABLE myPage (
	staff_num VARCHAR2(20) NOT NULL, /* 사원번호 */
	name VARCHAR(20) NOT NULL, /* 이름 */
	class VARCHAR(10) NOT NULL, /* 직급 */
	tel INT(11) NOT NULL, /* 전화번호 */
	regNum INT(25) NOT NULL, /* 주민/사업자등록번호 */
	email VARCHAR(50), /* 이메일 */
	address VARCHAR(100) NOT NULL, /* 주소 */
	joinDate DATE NOT NULL, /* 입사일 */
	insurance CHAR(1) NOT NULL, /* 4대보험유무 */
	workTime TIMESTAMP NOT NULL, /* 근무시간 */
	restTime TIMESTAMP NOT NULL, /* 휴게시간 */
	etc DECIMAL(7), /* 기타 */
	restDate CHAR(1) NOT NULL, /* 휴무일 */
	totalWorkTime TIMESTAMP NOT NULL, /* 총근무시간 */
	expectSum DECIMAL(8) NOT NULL /* 예상급여금액 */
);

COMMENT ON TABLE myPage IS '마이페이지';

COMMENT ON COLUMN myPage.staff_num IS '사원번호';

COMMENT ON COLUMN myPage.name IS '이름';

COMMENT ON COLUMN myPage.class IS '직급';

COMMENT ON COLUMN myPage.tel IS '전화번호';

COMMENT ON COLUMN myPage.regNum IS '주민/사업자등록번호';

COMMENT ON COLUMN myPage.email IS '이메일';

COMMENT ON COLUMN myPage.address IS '주소';

COMMENT ON COLUMN myPage.joinDate IS '입사일';

COMMENT ON COLUMN myPage.insurance IS '4대보험유무';

COMMENT ON COLUMN myPage.workTime IS '근무시간';

COMMENT ON COLUMN myPage.restTime IS '휴게시간';

COMMENT ON COLUMN myPage.etc IS '기타';

COMMENT ON COLUMN myPage.restDate IS '휴무일';

COMMENT ON COLUMN myPage.totalWorkTime IS '총근무시간';

COMMENT ON COLUMN myPage.expectSum IS '예상급여금액';

ALTER TABLE myPage
	ADD
		CONSTRAINT PK_myPage
		PRIMARY KEY (
			staff_num
		);

/* 급여관리 */
CREATE TABLE payManager (
	pay_num INT(255) NOT NULL, /* 번호 */
	staff_num INT(255) NOT NULL, /* 사원번호 */
	hourWage DECIMAL(6) NOT NULL, /* 시급 */
	insurance CHAR(1) NOT NULL, /* 4대보험유무 */
	bonus DECIMAL(7) NOT NULL, /* 주휴수당 */
	etc DECIMAL(7), /* 기타 */
	weekWork1 TIMESTAMP NOT NULL, /* 1주근무시간(분) */
	weekWork2 TIMESTAMP NOT NULL, /* 2주근무시간(분) */
	weekWork3 TIMESTAMP NOT NULL, /* 3주근무시간(분) */
	weekWork4 TIMESTAMP NOT NULL, /* 4주근무시간(분) */
	weekWork5 TIMESTAMP, /* 5주근무시간(분) */
	sum DECIMAL(8) NOT NULL /* 전체급여 */
);

COMMENT ON TABLE payManager IS '급여관리';

COMMENT ON COLUMN payManager.pay_num IS '번호';

COMMENT ON COLUMN payManager.staff_num IS '사원번호';

COMMENT ON COLUMN payManager.hourWage IS '시급';

COMMENT ON COLUMN payManager.insurance IS '4대보험유무';

COMMENT ON COLUMN payManager.bonus IS '주휴수당';

COMMENT ON COLUMN payManager.etc IS '기타';

COMMENT ON COLUMN payManager.weekWork1 IS '1주근무시간(분)';

COMMENT ON COLUMN payManager.weekWork2 IS '2주근무시간(분)';

COMMENT ON COLUMN payManager.weekWork3 IS '3주근무시간(분)';

COMMENT ON COLUMN payManager.weekWork4 IS '4주근무시간(분)';

COMMENT ON COLUMN payManager.weekWork5 IS '5주근무시간(분)';

COMMENT ON COLUMN payManager.sum IS '전체급여';

ALTER TABLE payManager
	ADD
		CONSTRAINT PK_payManager
		PRIMARY KEY (
			pay_num,
			staff_num
		);

/* 스케줄관리 */
CREATE TABLE schedule (
	schedule_num NUMBER NOT NULL, /* 스케줄 관리 번호 */
	reg_num NUMBER NOT NULL, /* 번호 */
	type_num NUMBER NOT NULL, /* 분류 */
	name VARCHAR(20), /* 이름 */
	sch_workDate DATE, /* 근무날짜 */
	sch_workTime TIMESTAMP, /* 근무시간 */
	sch_restTime VARCHAR2(50), /* 휴게시간 */
	color VARCHAR(20), /* 일정색상 */
	memo VARCHAR2(2000), /* 메모 */
	restDate VARCHAR2(20) /* 휴무일 */
);

COMMENT ON TABLE schedule IS '스케줄관리';

COMMENT ON COLUMN schedule.schedule_num IS '스케줄 관리 번호';

COMMENT ON COLUMN schedule.reg_num IS '번호';

COMMENT ON COLUMN schedule.type_num IS '분류';

COMMENT ON COLUMN schedule.name IS '이름';

COMMENT ON COLUMN schedule.sch_workDate IS '근무날짜';

COMMENT ON COLUMN schedule.sch_workTime IS '근무시간';

COMMENT ON COLUMN schedule.sch_restTime IS '휴게시간';

COMMENT ON COLUMN schedule.color IS '일정색상';

COMMENT ON COLUMN schedule.memo IS '메모';

COMMENT ON COLUMN schedule.restDate IS '휴무일';

ALTER TABLE schedule
	ADD
		CONSTRAINT PK_schedule
		PRIMARY KEY (
			schedule_num,
			reg_num,
			type_num
		);

/* 업주회원가입 */
CREATE TABLE registerCeo (
	num INT(255) NOT NULL, /* 번호 */
	id VARCHAR(30) NOT NULL, /* 아이디 */
	pwd VARCHAR(30) NOT NULL, /* 비밀번호 */
	tel INT(11) NOT NULL, /* 전화번호 */
	ceoName VARCHAR(20) NOT NULL, /* 대표자명 */
	ceoTel INT(11), /* 대표자전화번호 */
	regNum INT(25) NOT NULL, /* 사업자등록번호 */
	email VARCHAR(50) NOT NULL, /* 이메일 */
	address VARCHAR(100) NOT NULL /* 주소 */
);

COMMENT ON TABLE registerCeo IS '업주회원가입';

COMMENT ON COLUMN registerCeo.num IS '번호';

COMMENT ON COLUMN registerCeo.id IS '아이디';

COMMENT ON COLUMN registerCeo.pwd IS '비밀번호';

COMMENT ON COLUMN registerCeo.tel IS '전화번호';

COMMENT ON COLUMN registerCeo.ceoName IS '대표자명';

COMMENT ON COLUMN registerCeo.ceoTel IS '대표자전화번호';

COMMENT ON COLUMN registerCeo.regNum IS '사업자등록번호';

COMMENT ON COLUMN registerCeo.email IS '이메일';

COMMENT ON COLUMN registerCeo.address IS '주소';

ALTER TABLE registerCeo
	ADD
		CONSTRAINT PK_registerCeo
		PRIMARY KEY (
			num
		);

/* 알바 이력 */
CREATE TABLE resume (
	history_num NUMBER NOT NULL, /* 이력 번호 */
	type_num NUMBER NOT NULL, /* 분류 */
	reg_num NUMBER NOT NULL, /* 번호 */
	comName varchar2(50), /* 직장명 */
	comAdd VARCHAR2(100), /* 직장주소 */
	todo VARCHAR(60), /* 직무 */
	past_join_date DATE, /* 입사일 */
	past_leaveDate DATE /* 퇴사일 */
);

COMMENT ON TABLE resume IS '알바 이력';

COMMENT ON COLUMN resume.history_num IS '이력 번호';

COMMENT ON COLUMN resume.type_num IS '분류';

COMMENT ON COLUMN resume.reg_num IS '번호';

COMMENT ON COLUMN resume.comName IS '직장명';

COMMENT ON COLUMN resume.comAdd IS '직장주소';

COMMENT ON COLUMN resume.todo IS '직무';

COMMENT ON COLUMN resume.past_join_date IS '입사일';

COMMENT ON COLUMN resume.past_leaveDate IS '퇴사일';

ALTER TABLE resume
	ADD
		CONSTRAINT PK_resume
		PRIMARY KEY (
			history_num,
			type_num,
			reg_num
		);

/* 기업 */
CREATE TABLE company (
	com_order NUMBER, /* 번호 */
	ceo_id VARCHAR2(50) NOT NULL /* 기업 아이디 */
);

COMMENT ON TABLE company IS '기업';

COMMENT ON COLUMN company.com_order IS '번호';

COMMENT ON COLUMN company.ceo_id IS '기업 아이디';

ALTER TABLE company
	ADD
		CONSTRAINT PK_company
		PRIMARY KEY (
			ceo_id
		);

/* 고용 */
CREATE TABLE employ (
	em_num NUMBER, /* 순번 */
	staff_number NUMBER, /* 사원번호 */
	ceo_id VARCHAR2(50) NOT NULL, /* 기업 아이디 */
	work_id VARCHAR2(50) NOT NULL, /* 고용자 아이디 */
	employ_date DATE, /* 입사일 */
	exp_periodStart DATE, /* 수습기간 시작 */
	exp_periodEnd DATE /* 수습기간 끝 */
);

COMMENT ON TABLE employ IS '고용';

COMMENT ON COLUMN employ.em_num IS '순번';

COMMENT ON COLUMN employ.staff_number IS '사원번호';

COMMENT ON COLUMN employ.ceo_id IS '기업 아이디';

COMMENT ON COLUMN employ.work_id IS '고용자 아이디';

COMMENT ON COLUMN employ.employ_date IS '입사일';

COMMENT ON COLUMN employ.exp_periodStart IS '수습기간 시작';

COMMENT ON COLUMN employ.exp_periodEnd IS '수습기간 끝';

ALTER TABLE employ
	ADD
		CONSTRAINT PK_employ
		PRIMARY KEY (
			ceo_id,
			work_id
		);

ALTER TABLE register
	ADD
		CONSTRAINT FK_positiontype_TO_register
		FOREIGN KEY (
			type_num
		)
		REFERENCES positiontype (
			type_num
		);

ALTER TABLE commute
	ADD
		CONSTRAINT FK_register_TO_commute
		FOREIGN KEY (
			reg_num,
			type_num
		)
		REFERENCES register (
			reg_num,
			type_num
		);

ALTER TABLE commute
	ADD
		CONSTRAINT FK_employ_TO_commute
		FOREIGN KEY (
			ceo_id,
			work_id
		)
		REFERENCES employ (
			ceo_id,
			work_id
		);

ALTER TABLE schedule
	ADD
		CONSTRAINT FK_register_TO_schedule
		FOREIGN KEY (
			reg_num,
			type_num
		)
		REFERENCES register (
			reg_num,
			type_num
		);

ALTER TABLE resume
	ADD
		CONSTRAINT FK_register_TO_resume
		FOREIGN KEY (
			reg_num,
			type_num
		)
		REFERENCES register (
			reg_num,
			type_num
		);
        
/* exerd 끝 */

commit;

CREATE SEQUENCE register_seq start with 1 increment by 1 minvalue 1;  --sequence 생성
CREATE SEQUENCE employ_seq start with 1 increment by 1 minvalue 1; 
CREATE SEQUENCE commute_seq start with 1 increment by 1 minvalue 1; 
CREATE SEQUENCE company_seq start with 1 increment by 1 minvalue 1; 
CREATE SEQUENCE schedule_seq start with 1 increment by 1 minvalue 1; 
CREATE SEQUENCE resume_seq start with 1 increment by 1 minvalue 1; 

insert into positiontype values (1, '개인회원');    -- positiontype insert into
insert into positiontype values (2, '기업회원');


insert into register values(register_seq.NEXTVAL, 2, '관리자a', 'admina', '1234', '123456789-123453', 'admina@email.com', '053-234-4839', '010-5345-4837',
'851223', NULL, '대구 수성구 고모로 31', '앞', TO_DATE(SYSDATE, 'YYYY-MM-DD') ); -- SYSDATE는 오늘 날짜 기입할때 사용 / register insert into 관리자
insert into register values(register_seq.NEXTVAL, 1, 'aaa', 'aaa','aaa', NULL, 'aaa@email.com', '010-3927-5843', NULL, --register insert into 직원 aaa
'020418', '020418-4283823', '대구 중구 경상감영길 2', '길', TO_DATE('2024-08-10', 'YYYY-MM-DD') );
insert into register values(register_seq.NEXTVAL, 1, 'bbb', 'bbb','bbb', NULL, 'bbb@email.com', '010-7346-2243', NULL,
'010924', '010924-4386132', '대구 동구 동촌로 46-9', '뒤', TO_DATE('2024-08-10', 'YYYY-MM-DD') );
insert into register values(register_seq.NEXTVAL, 1, 'ccc', 'ccc','ccc', NULL, 'ccc@email.com', '010-9482-4810', NULL,
'000722', '000722-3214207', '대구 달성군 구지면 가천1길 43', '옆', TO_DATE('2024-08-10', 'YYYY-MM-DD') );
insert into register values(register_seq.NEXTVAL, 1, 'ddd', 'ddd','ddd', NULL, 'ddd@email.com', '010-1284-3264', NULL,
'970320', '970320-3940291', '대구 군위군 의흥면 가지골길 34-9', '위', TO_DATE('2024-08-11', 'YYYY-MM-DD') );

insert into register values(register_seq.NEXTVAL, 2, '관리자b', 'adminb', '1234', '4930284-12382453', 'adminb@email.com', '02-482-3954', '010-3843-4920',
'901209', NULL, '서울 종로구 북촌로 31-6', '앞', TO_DATE('2024-08-11', 'YYYY-MM-DD') );
insert into register values(register_seq.NEXTVAL, 1, 'eee', 'eee','eee', NULL, 'eee@email.com', '010-9382-5839', NULL,
'990328', '990328-1837242', '서울 강남구 가로수길 5', '길', TO_DATE('2024-08-11', 'YYYY-MM-DD') );
insert into register values(register_seq.NEXTVAL, 1, 'fff', 'fff','fff', NULL, 'fff@email.com', '010-4829-2910', NULL,
'000823', '000823-4289370', '서울 은평구 갈현로 181', '뒤', TO_DATE('2024-08-11', 'YYYY-MM-DD') );
insert into register values(register_seq.NEXTVAL, 1, 'ggg', 'ggg','ggg', NULL, 'ggg@email.com', '010-4189-1242', NULL,
'980204', '980204-1327483', '서울 동대문구 서울시립대로 5', '옆', TO_DATE('2024-08-12', 'YYYY-MM-DD') );
insert into register values(register_seq.NEXTVAL, 1, 'hhh', 'hhh','hhh', NULL, 'hhh@email.com', '010-6434-5628', NULL,
'970826', '970826-2324644', '경기 부천시 소사구 경인로 4', '위', TO_DATE('2024-08-12', 'YYYY-MM-DD') );


insert into employ values(1, 001, 'admina', 'aaa', TO_DATE('2024-08-11', 'YYYY-MM-DD' ), TO_DATE('2024-08-11', 'YYYY-MM-DD' ), TO_DATE('2024-11-10', 'YYYY-MM-DD' ) ); --employ insert into
insert into employ values(2, 002, 'admina', 'bbb', TO_DATE('2024-08-11', 'YYYY-MM-DD' ), TO_DATE('2024-08-11', 'YYYY-MM-DD' ), TO_DATE('2024-11-10', 'YYYY-MM-DD' ) );
insert into employ values(3, 003, 'admina', 'ccc', TO_DATE('2024-08-11', 'YYYY-MM-DD' ), TO_DATE('2024-08-11', 'YYYY-MM-DD' ), TO_DATE('2024-11-10', 'YYYY-MM-DD' ) );
insert into employ values(4, 004, 'admina', 'ddd', TO_DATE('2024-08-12', 'YYYY-MM-DD' ), TO_DATE('2024-08-11', 'YYYY-MM-DD' ), TO_DATE('2024-11-11', 'YYYY-MM-DD' ) );

insert into employ values(1, 0010, 'adminb', 'eee', TO_DATE('2024-08-11', 'YYYY-MM-DD' ), TO_DATE('2024-08-11', 'YYYY-MM-DD' ), TO_DATE('2024-09-10', 'YYYY-MM-DD' ) );
insert into employ values(2, 0020, 'adminb', 'fff', TO_DATE('2024-08-12', 'YYYY-MM-DD' ), TO_DATE('2024-08-11', 'YYYY-MM-DD' ), TO_DATE('2024-09-11', 'YYYY-MM-DD' ) );
insert into employ values(3, 0030, 'adminb', 'ggg', TO_DATE('2024-08-12', 'YYYY-MM-DD' ), TO_DATE('2024-08-11', 'YYYY-MM-DD' ), TO_DATE('2024-09-11', 'YYYY-MM-DD' ) );
insert into employ values(4, 0040, 'adminb', 'hhh', TO_DATE('2024-08-14', 'YYYY-MM-DD' ), TO_DATE('2024-08-11', 'YYYY-MM-DD' ), TO_DATE('2024-09-13', 'YYYY-MM-DD' ) );


insert into commute values(2, 1, 'admina', 'aaa', TO_TIMESTAMP('2024-08-11 09:00:00', 'YYYY-MM-DD HH24'), TO_TIMESTAMP('2024-08-11 14:00:00.000000','YYYY-MM-DD HH24:MI:SS.FF'), --commute insert into
NULL, NULL, NULL, 300, NULL, NULL, NULL, 300, 9860,NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 49300 ); 
insert into commute values(3, 1, 'admina', 'bbb', TO_TIMESTAMP('2024-08-11 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-08-11 14:00:00','YYYY-MM-DD HH24:MI:SS'), 
NULL, NULL, NULL, 300, NULL, NULL, NULL, 300, 9860,NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 49300 ); 
insert into commute values(4, 1, 'admina', 'ccc', TO_TIMESTAMP('2024-08-11 14:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-08-11 22:00:00','YYYY-MM-DD HH24:MI:SS'), 
TO_TIMESTAMP('2024-08-11 17:00:00','YYYY-MM-DD HH24:MI:SS'),  TO_TIMESTAMP('2024-08-11 17:30:00','YYYY-MM-DD HH24:MI:SS'), 
NULL, 300, NULL, NULL, NULL, 300, 9860,NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 49300 ); 
insert into commute values(5, 1, 'admina', 'ddd', TO_TIMESTAMP('2024-08-12 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-08-12 14:00:00','YYYY-MM-DD HH24:MI:SS'), 
NULL, NULL, NULL, 300, NULL, NULL, NULL, 300, 9860,NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 49300 );

insert into commute values(7, 1, 'adminb', 'eee', TO_TIMESTAMP('2024-08-11 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-08-11 14:00:00','YYYY-MM-DD HH24:MI:SS'), 
NULL, NULL, NULL, 300, NULL, NULL, NULL, 300, 9860,NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 49300 ); 
insert into commute values(8, 1, 'adminb', 'fff', TO_TIMESTAMP('2024-08-12 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-08-12 14:00:00','YYYY-MM-DD HH24:MI:SS'), 
NULL, NULL, NULL, 300, NULL, NULL, NULL, 300, 9860,NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 49300 ); 
insert into commute values(9, 1, 'adminb', 'ggg', TO_TIMESTAMP('2024-08-12 14:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-08-12 22:00:00','YYYY-MM-DD HH24:MI:SS'), 
TO_TIMESTAMP('2024-08-11 17:00:00','YYYY-MM-DD HH24:MI:SS'),  TO_TIMESTAMP('2024-08-11 17:30:00','YYYY-MM-DD HH24:MI:SS'), 
NULL, 300, NULL, NULL, NULL, 300, 9860,NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 49300 ); 
insert into commute values(10, 1, 'adminb', 'hhh', TO_TIMESTAMP('2024-08-14 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-08-14 14:00:00','YYYY-MM-DD HH24:MI:SS'), 
NULL, NULL, NULL, 300, NULL, NULL, NULL, 300, 9860,NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 49300 ); 

insert into company values(company_seq.NEXTVAL, 'admina'); --insert into company
insert into company values(company_seq.NEXTVAL, 'adminb');

commit;
