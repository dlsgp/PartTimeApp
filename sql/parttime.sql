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
	staff_num VARCHAR2(50) NOT NULL, /* 사원번호 */
	name VARCHAR(30) NOT NULL, /* 이름/대표자이름 */
	id VARCHAR2(50) NOT NULL, /* 아이디 */
	pwd VARCHAR2(50) NOT NULL, /* 비밀번호 */
	tel VARCHAR2(30) NOT NULL, /* 전화번호/대표자전번 */
	regNum VARCHAR2(50) NOT NULL, /* 주민/사업자등록번호 */
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
		insert into register values (1, 2, '000', '관리자', 'admin', '1234', '01055552222', '12345-6789101245572',
		'admin@gmail.com', '대구광역시 수성구', null,null, null, null, null, '01012345678', null);
        
        insert into register values (2, 1, '001', '이지니', 'wlsl', '33333', '01055552222', 'null',
		'ewlwlwlel@gmail.com', '대구광역시 수성구', null,10000, 1, '980521-2452897', 980521, '01012345678', null);
        
        insert into register (reg_num, type_num, name, id, pwd, tel, jobNum, email, join_date, birthNum, birth, phoneNum, add1)
        values (reg_seq.nextVal, 1,  '이철수', 'aaa', 'aaa', '01033332222', 'null',
		'aaa@gmail.com', '24/07/01 00:00:00.000000000', '', '','', '대구광역시 북구'  );
        
        insert into register (reg_num, type_num, name, id, pwd, tel, jobNum, email, join_date, birthNum, birth, phoneNum, add1)
        values (reg_seq.nextVal, 1,  '김철수', 'bbb', 'bbb', '01033332222', 'null',
		'bbb@gmail.com', '24/07/01 00:00:00.000000000', '', '','', '대구광역시 북구'  );
        
        insert into register (reg_num, type_num, name, id, pwd, tel, jobNum, email, join_date, birthNum, birth, phoneNum, add1)
        values (reg_seq.nextVal, 1,  '홍길동', 'ccc', 'ccc', '01033332222', 'null',
		'ccc@gmail.com', '24/07/01 00:00:00.000000000', '', '','', '대구광역시 북구'  );
        
        CREATE SEQUENCE reg_seq
        start with 1
        increment by 1
        minvalue 1;
        
        
				
		
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
       desc commute;
       desc scheduler;
       desc positiontype;
       
       alter table register drop column hourWage;
       alter table register drop column insurance;
       alter table commute add hourWage number;
       alter table commute rename column type to type_num;
       alter table commute add workTime timestamp;
       alter table commute add holiday_pay number;
       alter table commute add insurance char(1);
       alter table commute add pay number;
       alter table scheduler rename column type to type_num;
       alter table scheduler rename column workDate to sch_workDate;
       alter table scheduler rename column workTime to sch_workTime;
       alter table scheduler rename column restTime to sch_restTime;
       
       select * from register;
       
       select * from commute;
       
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
        alter table commute rename column resttime to resttime_start;
        ALTER TABLE commute ADD (resttime_end TIMESTAMP);

        alter table commute drop column worktime;
        alter table commute add worktime NUMBER; 
 
     
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
    
    select * from register;
    select * from commute;
    desc commute;
    desc register;
    desc positiontype;
    
 delete from commute;   
    
    
select r.reg_num, r.staff_num, r.name, p.type_name, c.hourWage, c.insurance, c.holiday_pay, c.etc, c.workTime, c.pay  	
from register r, positiontype p, commute c
where r.reg_num = c.reg_num and p.type_num = r.type_num 
and r.reg_num = 1
order by r.reg_num asc;



INSERT INTO commute VALUES (
    63,
    1,
    TO_TIMESTAMP('2024-08-02 09:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    TO_TIMESTAMP('2024-08-02 13:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    TO_TIMESTAMP('2024-08-02 11:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    0,
    10000,
    100000,
    1,
    300000,
    TO_TIMESTAMP('2024-08-02 12:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    800,
    'Mainadmin',
    'wlsl'
    
);

select * from register;

INSERT INTO commute VALUES (
    43,
    1,
    TO_TIMESTAMP('2024-08-03 09:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    TO_TIMESTAMP('2024-08-03 13:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    TO_TIMESTAMP('2024-08-03 11:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    0,
    10000,
    100000,
    1,
    300000,
    TO_TIMESTAMP('2024-08-03 12:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    800,
    'Mainadmin',
    'bbb'
);

 alter table commute drop column ceo_id;
  alter table commute drop column work_id;
alter table commute add ceo_id varchar2(50);
alter table commute add work_id varchar2(50);


select * from commute;
select * from register;
desc commute;


INSERT INTO commute VALUES (
    1,
    1,
    TO_TIMESTAMP('2024-08-04 09:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    TO_TIMESTAMP('2024-08-04 13:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    TO_TIMESTAMP('2024-08-04 11:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    0,
    10000,
    100000,
    1,
    300000,
    TO_TIMESTAMP('2024-08-04 12:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    800
);

INSERT INTO commute VALUES (
    commute_seq.NEXTVAL,
    1,
    TO_TIMESTAMP('2024-08-02 09:30:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    TO_TIMESTAMP('2024-08-02 13:30:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    TO_TIMESTAMP('2024-08-02 11:30:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    0,
    10000,
    100000,
    1,
    300000,
    TO_TIMESTAMP('2024-08-02 12:30:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    800
);

INSERT INTO commute VALUES (
    1,
    1,
    TO_TIMESTAMP('2024-08-03 09:30:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    TO_TIMESTAMP('2024-08-03 13:30:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    TO_TIMESTAMP('2024-08-03 11:30:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    0,
    10000,
    100000,
    1,
    300000,
    TO_TIMESTAMP('2024-08-03 12:30:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    800
);

INSERT INTO commute VALUES (
    63,
    1,
    TO_TIMESTAMP('2024-08-04 09:30:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    TO_TIMESTAMP('2024-08-04 13:30:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    TO_TIMESTAMP('2024-08-04 11:30:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    0,
    10000,
    100000,
    1,
    300000,
    TO_TIMESTAMP('2024-08-04 12:30:00.000000', 'YYYY-MM-DD HH24:MI:SS.FF'),
    800,
    'Mainadmin',
    'wlsl'
);

alter table 

desc commute;
select * from register;


drop table comopany;
drop table employ;

create table company(
com_order number,
ceo_id number not null);

alter table company ADD
		CONSTRAINT PK_company
		PRIMARY KEY (
			ceo_id
		);
                

create table employ(
em_num number,
work_id number
);

alter table employ add ceo_id number not null;

ALTER TABLE employ
ADD CONSTRAINT fk_company_to_employ
FOREIGN KEY (ceo_id)
REFERENCES company(ceo_id);

alter table employ add reg_num number;
alter table employ add type_num number;

ALTER TABLE employ
ADD CONSTRAINT fk_register_to_employ
FOREIGN KEY (reg_num)
REFERENCES register (reg_num);

ALTER TABLE employ
ADD CONSTRAINT fk_register_to_employ
FOREIGN KEY (type_num)
REFERENCES register (type_num);

SELECT acc.table_name AS referenced_table, acc.column_name AS referenced_column
FROM user_constraints uc
JOIN user_cons_columns acc
  ON uc.constraint_name = acc.constraint_name
WHERE uc.constraint_name = (
  SELECT r_constraint_name
  FROM user_constraints
  WHERE constraint_name = 'FK_REGISTER_TO_EMPLOY'
);



ALTER TABLE register
ADD CONSTRAINT uk_register_type_num UNIQUE (type_num);

SELECT type_num, COUNT(*)
FROM register
GROUP BY type_num
HAVING COUNT(*) > 1;

DELETE FROM register
WHERE rowid NOT IN (
  SELECT MIN(rowid)
  FROM register
  GROUP BY type_num
);

-- 고유 키 제약 조건 추가
ALTER TABLE register
ADD CONSTRAINT uk_register_type_num UNIQUE (type_num);

ALTER TABLE employ
ADD CONSTRAINT fk_register_to_employ
FOREIGN KEY (type_num)
REFERENCES register (type_num);


desc employ;
desc company;

insert into company values(
company_seq.NEXTVAL, 1
);

CREATE SEQUENCE company_seq
start with 1
increment by 1
minvalue 1;

GRANT SELECT ON company_seq TO system;

insert into employ values (
employ.NEXTVAL, 2, 1
);

---
INSERT INTO employ (em_num, work_id, ceo_id)
VALUES (employ_seq.NEXTVAL, 2, 1);
Insert Into employ values(employ_seq.NextVAL, 11, 1);
Insert Into employ values(employ_seq.NextVAL, 13, 1);


CREATE SEQUENCE employ_seq
start with 1
increment by 1
minvalue 1;

GRANT SELECT ON employ_seq TO system;

select * from employ;


SELECT constraint_name
FROM user_constraints
WHERE table_name = 'REGISTER'
  AND constraint_type = 'U';

ALTER TABLE register
DROP CONSTRAINT UK_REGISTER_REG_NUM;

desc employ;

ALTER TABLE employ
ADD CONSTRAINT FK_employ_register
FOREIGN KEY (reg_num, type_num)
REFERENCES register (reg_num, type_num);

select name, tel, email, add1 from register where id='wlsl';

select * from company;
select * from employ;
select * from register;


ALTER TABLE commute ADD ceo_id NUMBER;

ALTER TABLE commute
ADD CONSTRAINT fk_ceo
FOREIGN KEY (ceo_id) REFERENCES company(ceo_id);

desc commute;


    
    create sequence employ_seq
		start with 1
		increment by 1
		minvalue 1;

alter table register drop column staff_num;         --staff_num register에서 빼기

alter table employ add staff_number number;
alter table employ drop column reg_num;
alter table employ drop column type_num;
alter table employ drop constraint FK_COMPANY_TO_EMPLOY;    --fk 제약조건 삭제
alter table employ drop constraint FK_EMPLOY_REGISTER;

desc register;

drop table employ;

create table employ(
em_num number,
ceo_id varchar2(50),
work_id varchar2(50),
staff_number varchar2(50)
);



insert into employ ( em_num, ceo_id, work_id, staff_number)
	values (employ_seq.nextVAL ,'Mainadmin','wlsl', '001');
      

select r.reg_num, r.name, c.hourWage, c.insurance, c.holiday_pay, c.etc, c.workTime, c.pay  	
			from register r, positiontype p, commute c
			where r.reg_num = c.reg_num and p.type_num = r.type_num 
			and r.reg_num = #{reg_num}
			order by r.reg_num asc;

select * from positiontype;
select * from commute;
select * from register;
select * from employ;



alter table register add add2 varchar2(200);

delete from register where reg_num = 45;
delete from register where reg_num = 46;
delete from register where reg_num = 47;

select r.reg_num, r.name, c.hourWage, c.insurance, c.holiday_pay, c.etc, c.workTime, c.pay  	
			from  c.insurance, c.holiday_pay, c.etc, c.workTime, c.pay  
			where r.reg_num = c.reg_num and p.type_num = r.type_num 
			and r.reg_num = 1
			order by r.reg_num asc;
            
select e.staff_number, r.name, c.hourWage,  c.insurance, c.holiday_pay, c.etc, c.workTime, c.pay  
from employ e, register r, commute c
where e.ceo_id = '1';

select e.staff_number, r.name, c.hourWage,  c.insurance, c.holiday_pay, c.etc, c.workTime, c.pay  
			from employ e, register r, commute c
			where r.id = e.work_id
			and e.ceo_id = (
            select id from register where reg_num = 1
            );
            
insert into employ staff_number values (2) = (
select em_num, ceo_id, work_id from employ where id='wlsl');           




 	insert into employ (em_num, ceo_id, work_id, staff_number)
	values (employ_seq.nextVAL , 'Mainadmin' , 'ccc', '1000' );
	
UPDATE commute c
SET 
    hourWage = 30000, 
    insurance = '1',
    holiday_pay = 20000, 
    etc = 10000, 
    workTime = 2000, 
    pay = 50000
WHERE c.reg_num IN (
    SELECT r.reg_num
    FROM register r
    WHERE r.reg_num = 2
);

update commute
		set c.hourWage = 30000, c.insurance = '1', c.holiday_pay = 20000, c.etc = 10000, c.workTime = 2000, c.pay=50000
		join commute c on r.reg_num = c.reg_num
		where r.id = 'wlsl';

commit;

SELECT r.id, r.name, c.hourWage, c.insurance, c.holiday_pay, c.etc, c.workTime, c.pay  
        FROM register r
        JOIN commute c ON r.reg_num = c.reg_num
        WHERE r.id = 'wlsl';
        
desc register; 

update employ set employ_date = '2024-03-03', exp_period='2024-09-30' where work_id='wlsl';

select r.id, r.name, c.hourWage, c.insurance, c.holiday_pay, c.etc, c.workTime, c.pay  
        from register r
        join commute c on r.reg_num = c.reg_num
        where r.id = 'bbb';
        
select e.staff_number, r.name, e.hourWage,  c.insurance, c.holiday_pay, c.etc, c.workTime, c.pay, r.id  
			from employ e, register r, commute c
			where r.id = e.work_id
			and e.ceo_id = (
            select id from register where reg_num = 2;       
commit;

select * from commute;

select * from register;
        
INSERT INTO register VALUES (
    1, 
    1, 
    'aaa', 
    'aaa', 
    'aaa', 
    '010-3232-3232', 
    NULL, 
    'aaa@email.com', 
    NULL, 
    '010101-4386787', 
    '010101', 
    NULL, 
    '대구 수성구', 
    NULL, 
    NULL, 
);


        
desc register;     
        
commit;
desc employ;
    

ALTER TABLE employ
	ADD
		CONSTRAINT PK_employ
		PRIMARY KEY (
			ceo_id,
			work_id
		);
ALTER TABLE employ
    ADD CONSTRAINT PK_employ
    PRIMARY KEY (ceo_id, work_id);

select * from commute;

desc commute;

commit;

ALTER TABLE commute DROP COLUMN ceo_id;

ALTER TABLE commute ADD ceo_id VARCHAR(50);
ALTER TABLE commute ADD work_id VARCHAR(50);

commit;


