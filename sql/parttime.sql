ALTER TABLE register
	DROP
		CONSTRAINT FK_positiontype_TO_register
		CASCADE;

ALTER TABLE commute
	DROP
		CONSTRAINT FK_register_TO_commute
		CASCADE;

ALTER TABLE scheduler
	DROP
		CONSTRAINT FK_register_TO_scheduler
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

ALTER TABLE scheduler
	DROP
		PRIMARY KEY
		CASCADE
		KEEP INDEX;


ALTER TABLE resume
	DROP
		PRIMARY KEY
		CASCADE
		KEEP INDEX;

/* 회원가입 테이블 삭제*/
DROP TABLE register 
	CASCADE CONSTRAINTS;

/* 직책유형 테이블 삭제*/
DROP TABLE positiontype 
	CASCADE CONSTRAINTS;

/* 출퇴근 테이블 삭제*/
DROP TABLE commute 
	CASCADE CONSTRAINTS;

/* 스케줄관리 테이블 삭제*/
DROP TABLE scheduler 
	CASCADE CONSTRAINTS;

/* 알바 이력 테이블 삭제*/
DROP TABLE resume 
	CASCADE CONSTRAINTS;

/* 회원가입 테이블 삭제*/
CREATE TABLE register (
	reg_num NUMBER NOT NULL, /* 번호 */
	type NUMBER NOT NULL, /* 분류 */
	staff_num VARCHAR2(50), /* 사원번호 */
	name VARCHAR(30) NOT NULL, /* 이름/대표자이름 */
	id VARCHAR2(50) NOT NULL, /* 아이디 */
	pwd VARCHAR2(50) NOT NULL, /* 비밀번호 */
	tel VARCHAR2(30) NOT NULL, /* 전화번호/대표자전번 */
	regNum VARCHAR2(50), /* 주민/사업자등록번호 */
	email VARCHAR2(100), /* 이메일 */
	address VARCHAR2(200) NOT NULL, /* 주소 */
	join_date TIMESTAMP , /* 입사일 */
	hourWage DECIMAL(6) , /* 시급 */
	insurance CHAR(1)  /* 4대보험유무 */
    );

ALTER TABLE register
	ADD
		CONSTRAINT PK_register
		PRIMARY KEY (
			reg_num,
			type
		);

/* 직책유형 */
CREATE TABLE positiontype (
	type NUMBER NOT NULL, /* 분류 */
	type_name VARCHAR2(30) NOT NULL /* 분류이름 */
);

ALTER TABLE positiontype
	ADD
		CONSTRAINT PK_positiontype
		PRIMARY KEY (
			type
		);

/* 출퇴근 */
CREATE TABLE commute (
	reg_num NUMBER NOT NULL, /* 번호 */
	type NUMBER NOT NULL, /* 분류 */
	workIn TIMESTAMP NOT NULL, /* 출근시간 */
	workOut TIMESTAMP NOT NULL, /* 퇴근시간 */
	restTime TIMESTAMP NOT NULL, /* 휴게시간 */
	etc DECIMAL(7) /* 기타 */
);

ALTER TABLE commute
	ADD
		CONSTRAINT PK_commute
		PRIMARY KEY (
			reg_num,
			type
		);


/* 스케줄관리 */
CREATE TABLE scheduler (
    schedule_num NUMBER NOT NULL, /* 번호 */
    reg_num NUMBER NOT NULL, /* 번호2 */
    type NUMBER NOT NULL, /* 분류 */
    name VARCHAR2(30) NOT NULL, /* 이름 */
    workDate DATE NOT NULL, /* 근무날짜 */
    workTime TIMESTAMP NOT NULL, /* 근무시간 */
    restTime TIMESTAMP NOT NULL, /* 휴게시간 */
    color VARCHAR2(20) NOT NULL, /* 일정색상 */
    memo VARCHAR2(2000) NOT NULL, /* 메모 */
    restDate CHAR(1) NOT NULL /* 휴무일 */
);


ALTER TABLE scheduler
	ADD
		CONSTRAINT PK_scheduler
		PRIMARY KEY (
			schedule_num,
			reg_num,
			type
		);

/* 알바 이력 */
CREATE TABLE resume (
	history_num NUMBER NOT NULL, /* 이력 번호 */
	type NUMBER NOT NULL, /* 분류 */
	reg_num NUMBER NOT NULL, /* 번호 */
	comName varchar2(50) NOT NULL, /* 직장명 */
	comAdd VARCHAR2(200) NOT NULL, /* 직장주소 */
	todo VARCHAR2(60) NOT NULL, /* 직무 */
	past_joinDate DATE NOT NULL, /* 입사일 */
	past_leaveDate DATE NOT NULL /* 퇴사일 */
);


/* 기본키 외래키 제약 */

ALTER TABLE resume
	ADD
		CONSTRAINT PK_resume
		PRIMARY KEY (
			history_num,
			type,
			reg_num
		);

ALTER TABLE register
	ADD
		CONSTRAINT FK_positiontype_TO_register
		FOREIGN KEY (
			type
		)
		REFERENCES positiontype (
			type
		);

ALTER TABLE commute
	ADD
		CONSTRAINT FK_register_TO_commute
		FOREIGN KEY (
			reg_num,
			type
		)
		REFERENCES register (
			reg_num,
			type
		);

ALTER TABLE scheduler
	ADD
		CONSTRAINT FK_register_TO_scheduler
		FOREIGN KEY (
			reg_num,
			type
		)
		REFERENCES register (
			reg_num,
			type
		);

ALTER TABLE resume
	ADD
		CONSTRAINT FK_register_TO_resume
		FOREIGN KEY (
			reg_num,
			type
		)
		REFERENCES register (
			reg_num,
			type
		);
		
		
		/* register 테이블 auto increment */
		create sequence reg_num_seq
		start with 1
		increment by 1
		minvalue 1;
		
		
		/* 데이터 삽입*/
		insert into register values (1, 2, '000', '관리자', 'Mainadmin', '1234', '01055552222', '920102-1111111',
		'admin@gmail.com', '대구광역시 수성구', null, null, null);
		
		insert into register values (2, 1, '001', '이지니', 'wlsl', '33333', '01030305050', '950505-2130456',
		'ewlwlwlel@gmail.com', '대구광역시 수성구', TO_DATE('2024-07-01'), 12000, 1);
		
		
		insert into positiontype values (1, '개인회원');
		insert into positiontype values (2, '기업회원');
		
		/* 입력값 확인 */
		select * from register;
		select * from positiontype;
		select * from commute;
		select * from resume;
		select * from scheduler;
        
       alter table register RENAME COLUMN type TO typeName;
       alter table register RENAME COLUMN regNum To jobNum;
       alter table register modify staff_num NULL;
        alter table register modify jobNum NULL;
        alter table register modify staff_num NULL;
       
       desc register ;
       
       
       alter table register RENAME COLUMN type TO typeName;
       
     alter table register add birthNum varchar2(30);
     alter table register add birth varchar2(30);
     alter table register add birthNum varchar2(30);
     alter table register add phoneNum varchar2(30);
      alter table register modify address NULL;
      
       alter table register RENAME COLUMN address TO add1;
        alter table register add add2 varchar2(200);
        
        alter table register drop column add2;
        alter table register add add1 varchar2(200);
        alter table register add add2 varchar2(200);
        
        alter table register rename column typeName to type_num;
        
        alter table positiontype rename column type to type_num;
        alter table positiontype rename column type to type_name;
           
     
     
    private int reg_num;
	private int typeName;
	private String name;
	private String id;
	private String pwd;
	private String pwd2;
	private String tel;
	private String phoneNum;
	private String birthNum;
	private String birth;
	private String jobNum;
	private String email;
	private String address;
	private int user_manager;
	private boolean userIdExist; 
	private boolean userLogin;   
	
CREATE TABLE register (
  reg_num NUMBER NOT NULL, /* 번호 */
  type NUMBER NOT NULL, /* 분류 */
  staff_num VARCHAR2(50), /* 사원번호, 필수 필드가 아닌 것으로 수정 */
  name VARCHAR(30) NOT NULL, /* 이름/대표자이름 */
  id VARCHAR2(50) NOT NULL, /* 아이디 */
  pwd VARCHAR2(50) NOT NULL, /* 비밀번호 */
  tel VARCHAR2(30) NOT NULL, /* 전화번호/대표자전번 */
  birth VARCHAR2(50), /* 주민/사업자등록번호, 필수 필드가 아닌 것으로 수정 */
  email VARCHAR2(100), /* 이메일 */
  add1 VARCHAR2(200) NOT NULL, /* 주소 */
  join_date TIMESTAMP, /* 입사일 */
  hourWage DECIMAL(6), /* 시급 */
  insurance CHAR(1) /* 4대보험유무 */
  regNum VARCHAR2(15), NOT NULL,
);

DROP TABLE register 
	CASCADE CONSTRAINTS;
    
SELECT sequence_name, min_value, max_value, increment_by, last_number
FROM all_sequences
WHERE sequence_name = 'REG_NUM_SEQ'

ALTER TABLE register
ADD (regNum VARCHAR2(15));

UPDATE register
SET regNum = 'default_value';

ALTER TABLE register
MODIFY (regNum VARCHAR2(15) NOT NULL);


SELECT type FROM register;