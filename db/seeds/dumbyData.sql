insert into user_info (
    username,
    password
) values (
    'tester1',
    'pass'
);

insert into user_info (
    username,
    password
) values (
    'tester2',
    'pass'
);

insert into user_info (
    username,
    password
) values (
    'tester3',
    'pass'
);

insert into user_info (
    username,
    password
) values (
    'tester4',
    'pass'
);

insert into user_info (
    username,
    password
) values (
    'tester5',
    'pass'
);

insert into adventure_control (
    user_id,
    published
) values (
    1,
    'true'
);

insert into adventure_title (
    adventure_id,
    adventure_title
) values (
    1,
    'alpha demo 1'
);

insert into adventure_category (
    adventure_id,
    category_id
) values (
    1, 
    1
);

insert into category_name (
    category_title
) values (
    'popular'
);

insert into adventure_info (
    adventure_id,
    z_id, 
    z_type,
    z,
    a,
    b,
    c
) values (
    1,
    'zb',
    'default',
    'In this room there are three door...',
    'ZBA: Enter the left door',
    'ZBB: Enter the middle door',
    'ZBC: Enter the right door'
);