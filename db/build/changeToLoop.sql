update adventure_info
set z_type = $1
where adventure_id = $3 and z_id = $2;