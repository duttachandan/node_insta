<p>
Possibe Routes -
</p>

<p>
User Routes -
create user - http://localhost:3000/createuser(Post)
<br>
fields - email and password
<br>
login user - http://localhost:3000/loginuser(Post)
<br>
user list - http://localhost:3000/user(get)
<br>
</p>

<p>
Post Routes -
</p>
<p>
posts list - http://localhost:3000/post/getallpost(get)
<br>
posts by id - http://localhost:3000/post/getpostbyid/:id(get)
<br>
create post - http://localhost:3000/post/createPost(post)
<br>
image, postTitle, postDescription, user
<br>
delete post - http://localhost:3000/post/deletepost/:id(get)
<br>
update post - http://localhost:3000/post/updatepost/:id(post)
<br>
delete all post - http://localhost:3000/post/deletepost(get)
</p>

<p>
Comments Routes -
<br>
create Comment - http://localhost:3000/comments/getpostbyid/:postid(post)
<br>
comment, user
<br>
delete Comment - http://localhost:3000/comments/getpostbyid/:postid/deletecomment/:id(get)
<br>
update Comment - http://localhost:3000/comments/getpostbyid/:postid/updatecomments/:id(post)
</p>
