create table user_info (
    user_id serial primary key,
    username varchar(60),
    password varchar(60),
    profile_pic text
);

create table adventure_control (
    adventure_id serial primary key,
    user_id int, 
    analytics_id serial not null,
    published text
);

create table adventure_title (
    adventure_id int, 
    adventure_title varchar(60)
);

create table adventure_category (
    adventure_id int,
    category_id int
);

create table category_name (
    category_id serial,
    category_title varchar(60)
);

create table adventure_info (
    info_id serial primary key,
    adventure_id int,
    z_id text,
    z_type text,
    z varchar(280),
    a varchar(140),
    b varchar(140),
    c varchar(140),
    d varchar(140)
);