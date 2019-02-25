insert into adventure_control (
    user_id,
    published
) values (
    $1,
    'true'
) returning adventure_id;
