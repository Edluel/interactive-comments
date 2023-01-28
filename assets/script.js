const data = {
    "comments": [
      {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "user": {
          "image": { 
            "png": "assets/images/avatars/image-amyrobson.png",
            "webp": "assets/images/avatars/image-amyrobson.webp"
          },
          "username": "amyrobson"
        },
        "replies": []
      },
      {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "user": {
          "image": { 
            "png": "assets/images/avatars/image-maxblagun.png",
            "webp": "assets/images/avatars/image-maxblagun.webp"
          },
          "username": "maxblagun"
        },
        "replies": [
          {
            "id": 3,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "user": {
              "image": { 
                "png": "assets/images/avatars/image-ramsesmiron.png",
                "webp": "assets/images/avatars/image-ramsesmiron.webp"
              },
              "username": "ramsesmiron"
            }
          },
          {
            "id": 4,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": { 
                "png": "assets/images/avatars/image-juliusomo.png",
                "webp": "assets/images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          }
        ]
      }
    ]
}

function addComment(){
    //Cloning template and getting template classes
    const template = document.getElementById('comment-template');
    const commentsSection = document.getElementById('comments-section');

    for (let i = 0; i < data.comments.length; i++) {
        const clone = document.importNode(template.content, true);
        const avatar = clone.querySelector('.avatar');
        const username = clone.querySelector('.username');
        const at = clone.querySelector('.when');
        const content = clone.querySelector('.content');
        const score = clone.querySelector('.counter');

        // Set propoerties
        avatar.src = data.comments[i].user.image.png;
        username.innerHTML = data.comments[i].user.username;
        at.innerHTML = data.comments[i].createdAt;
        content.innerHTML = data.comments[i].content;
        score.innerHTML = data.comments[i].score;

        // Choose controls
        if (data.comments[i].user.username !== "juliusomo") {
            const rmDel = clone.querySelector('.delete');
            const rmEdt = clone.querySelector('.edit');
            rmDel.remove();
            rmEdt.remove();
        }
        else {
            const rmRpl = clone.querySelector('.reply');
            rmRpl.remove();
        }

        // Add to DOM
        commentsSection.appendChild(clone);

        // Add replies
        if(data.comments[i].replies.some(el => el !== null)){
            for (let j = 0; j < data.comments[i].replies.length; j++) {
                // Get template
                const clone = document.importNode(template.content, true);
                const avatar = clone.querySelector('.avatar');
                const username = clone.querySelector('.username');
                const at = clone.querySelector('.when');
                const content = clone.querySelector('.content');
                const score = clone.querySelector('.counter');
                // Set propoerties
                avatar.src = data.comments[i].replies[j].user.image.png;
                username.innerHTML = data.comments[i].replies[j].user.username;
                at.innerHTML = data.comments[i].replies[j].createdAt;
                content.innerHTML = data.comments[i].replies[j].content;
                score.innerHTML = data.comments[i].replies[j].score;
                // Choose controls
                if (data.comments[i].replies[j].user.username !== "juliusomo") {
                    const rmDel = clone.querySelector('.delete');
                    const rmEdt = clone.querySelector('.edit');
                    rmDel.remove();
                    rmEdt.remove();
                }
                else {
                    const rmRpl = clone.querySelector('.reply');
                    rmRpl.remove();
                }             
                // Add to DOM
                commentsSection.appendChild(clone);
            }  
        }
    }
}

addComment();

