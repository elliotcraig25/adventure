select cn.category_title, advt.adventure_title, ui.username, acon.adventure_id
from category_name cn
join adventure_category ac
on cn.category_id = ac.category_id
join adventure_control acon
on acon.adventure_id = ac.adventure_id
join adventure_title advt
on advt.adventure_id = acon.adventure_id
join user_info ui
on ui.user_id = acon.user_id
where cn.category_title = ${category_name};