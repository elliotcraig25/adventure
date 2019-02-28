select z, a, b, c, d, z_type
from adventure_info
where adventure_id = $1 and z_id = $2;