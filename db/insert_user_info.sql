insert into user_info(email)
values (${email})
returning *;