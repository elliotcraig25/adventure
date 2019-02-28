insert into user_info (
    username,
    password
) values (
    ${user},
    ${pass}
) returning username, profile_pic, user_id;