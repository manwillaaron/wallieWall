insert into w_user (
    first_name,
    last_name,
    username, 
    email,
    password,
    profile_pic
    )VALUES(
    ${firstName},
    ${lastName},
    ${username},
    ${email},
    ${password},
    ${profilePic}  
)
returning id, first_name, last_name, username, password, email, profile_pic;