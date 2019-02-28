select adt.adventure_title, ui.username
from adventure_control ac
join adventure_title adt
on adt.adventure_id = ac.adventure_id
join user_info ui
on ui.user_id = ac.user_id
where ac.adventure_id = ${id};