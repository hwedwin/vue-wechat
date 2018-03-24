
drop database wechat;
create database wechat;
use wechat;

create table user (

	uid 			int auto_increment primary key,
	wechat_id 		varchar(32),
	password	 	varchar(32),
	username	 	varchar(24),
	gender	 		int,
	avatar	 		varchar(128),
	region		 	varchar(128),
	signup_date 	timestamp,
	unique(wechat_id)
);

create table message (

	mid 			int auto_increment primary key,
	sender		 	int references user(uid),
	receivers 		int references user(uid),
	send_date 		timestamp,
	content 		varchar(2048)

);

create table moment (

	mid 			int auto_increment primary key,
	uid 			int references user(uid),
	content 		varchar(256),
	images 			varchar(1024),
	post_date 		timestamp

);

create table moment_like (
	mid 			int references moment(mid),
	like_date 		timestamp,
	uid 			int references user(uid)
);

create table moment_comment (
	mid 			int references moment(mid),
	content 		varchar(256),
	uid 			int references user(uid),
	reply_to 		int references user(uid)
);


create table friend (
	fid_1		 	int references user(uid),
	fid_2		 	int references user(uid),
	add_date 		timestamp,
	check (fid_2 != fid_1)
);

insert into user values(null, "a", "a password", "a", 0, "none", "none", CURRENT_TIMESTAMP);
