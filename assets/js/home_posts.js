{
    let createPost = function(){
        let newPost = $('#new-post');
        newPost.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                // serialize converts data to the JSon format
                data: newPost.serialize(),
                success: function(data){
                    console.log(data);
                    console.log(data.data)
                    let newPostData = newPostDOM(data.data.post);
                    $('.container-list > ul').prepend(newPostData);
                    deletePost($(' .delete-post-btn', newPostData))
                },
                error: function(err){
                    console.log(err.responseText)
                }
            })
        })
        
    }

    // Create a method to add post in DOM

    let newPostDOM = function(post){
        return $(`<li id= post-${post._id}>
        <p>
            <small>
              <a class="delete-post-btn" href="/posts/destroy/${post._id}">X</a>
            </small>
          ${post.content}
          <br>
          ${post.user.name }
        </p>
        <div class="post-comments">
          <form action="/comments/create" method="post">
            <input type="text" name="content" placeholder="post a comment.." required />
            <input type="hidden" name="post" value="${post._id}" / required>
            <input type="submit" value="Add comment" />
          </form>
          
          <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
              
            </ul>
          </div>
        </div>
      </li>`);
    }


    // create a method to delete by clicking the delete link

    let deletePost = function(deleteLink){
        console.log("delete link", deleteLink)
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    console.log(data.data.post_id)
                    $(`#post-${data.data.post_id}`).remove()
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
            
        })
    }

    createPost();
    
}