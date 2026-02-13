<p>
Possibe Routes -
</p>

<p>
User Routes -
- create user - http://localhost:3000/createuser(Post)
- fields - email and password
- login user - http://localhost:3000/loginuser(Post)
- user list - http://localhost:3000/user(get)
</p>

Post Routes -
---

posts list - http://localhost:3000/post/getallpost(get)
---
posts by id - http://localhost:3000/post/getpostbyid/:id(get)
---
create post - http://localhost:3000/post/createPost(post)
---
image, postTitle, postDescription, user
---

delete post - http://localhost:3000/post/deletepost/:id(get)
---
update post - http://localhost:3000/post/updatepost/:id(post)
---
delete all post - http://localhost:3000/post/deletepost(get)
---

Comments Routes -
---

create Comment - http://localhost:3000/comments/getpostbyid/:postid(post)
---
comment, user
---
delete Comment - http://localhost:3000/comments/getpostbyid/:postid/deletecomment/:id(get)
---
update Comment - http://localhost:3000/comments/getpostbyid/:postid/updatecomments/:id(post)
---