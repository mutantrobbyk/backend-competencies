insert into credentials(user_id, hash, is_admin)
values (${user_id}, ${hash}, false);

select u.user_id, email, is_admin from user_info u
join credentials c on c.user_id = u.user_id
where u.user_id = ${user_id};