function addComment(){
    // Data to frist load
    const data = {
        "comments": [
        {
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
        },
        {
            "content": "The most important thing is to code every day.",
            "createdAt": "1 month ago",
            "score": 7,
            "user": {
            "image": { 
                "png": "assets/images/avatars/image-juliusomo.png",
                "webp": "assets/images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
            },
            "replies": []
        },
        {
            "content": "When we hit the lack of knowledge, it's the best opportunity to improve our skills. That's why I like these challenges.",
            "createdAt": "2 days ago",
            "score": 142,
            "user": {
            "image": { 
                "png": "assets/images/avatars/image-amyrobson.png",
                "webp": "assets/images/avatars/image-amyrobson.webp"
            },
            "username": "amyrobson"
            },
            "replies": []
        }
        ]
    }
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
        const fix = clone.querySelector('.counter-fix');

        // Set propoerties
        avatar.src = data.comments[i].user.image.png;
        username.innerHTML = data.comments[i].user.username;
        at.innerHTML = data.comments[i].createdAt;
        content.innerHTML = data.comments[i].content;
        score.innerHTML = data.comments[i].score;
        fix.innerHTML = data.comments[i].score;

        // Choose controls
        if (data.comments[i].user.username !== "juliusomo") {
            const rmDel = clone.querySelector('.delete');
            const rmEdt = clone.querySelector('.edit');
            const rmYou = clone.querySelector('.user-flag');
            rmDel.remove();
            rmEdt.remove();
            rmYou.remove();
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
                clone.firstElementChild.classList.add("reply-comment");
                const avatar = clone.querySelector('.avatar');
                const username = clone.querySelector('.username');
                const at = clone.querySelector('.when');
                const content = clone.querySelector('.content');
                const score = clone.querySelector('.counter');
                const fix = clone.querySelector('.counter-fix');
                const reply = clone.querySelector('.replyingTo');
                // Set propoerties
                avatar.src = data.comments[i].replies[j].user.image.png;
                username.innerHTML = data.comments[i].replies[j].user.username;
                at.innerHTML = data.comments[i].replies[j].createdAt;
                score.innerHTML = data.comments[i].replies[j].score;
                fix.innerHTML = data.comments[i].replies[j].score;
                reply.innerHTML = '@';
                reply.innerHTML += data.comments[i].replies[j].replyingTo;
                content.innerHTML += data.comments[i].replies[j].content;
                // Choose controls
                if (data.comments[i].replies[j].user.username !== "juliusomo") {
                    const rmDel = clone.querySelector('.delete');
                    const rmEdt = clone.querySelector('.edit');
                    const rmYou = clone.querySelector('.user-flag');
                    rmDel.remove();
                    rmEdt.remove();
                    rmYou.remove();
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
} //add comments from assets
addComment();

function scoreIterator(e){
   // Get clicked element
    const click = e.target;
    let parent;
    if (click.closest('.reply-comment')) {
        parent = click.closest('.reply-comment');
    } else {
        parent = click.closest('.comment');
    }
    
    // Get counter value
    const fixed = parent.querySelector('.counter-fix');
    const ref = parseInt(fixed.textContent);
    const counter = parent.querySelector('.counter');
    let value = parseInt(counter.textContent);

    // Compare if it is increment or decrement
    if(click.classList.contains('increment') && value <= ref){
        value += 1;
    } else if(click.classList.contains('decrement') && value >= ref){
        value -= 1;
    }

    // Update counter
    counter.textContent = value;
} // change upvotes and downvotes

function deleteComment(e) {
    // Change focus to delete screen
    let filter = document.querySelector('.gray-overlay');
    filter.style.display = 'block';
    let confirmWindow = document.querySelector('.confirm-window');
    confirmWindow.style.display = 'flex';
    // Get clicked element
    const click = e.target;
    let parent;
    if (click.closest('.reply-comment')) {
        parent = click.closest('.reply-comment');

    } else {
        parent = click.closest('.comment');
    }
    // Get bt element
    const cancelBt =document.querySelector('.cancel-bt');
    const confirmBt =document.querySelector('.delete-bt');
    // Cancel
    function closeConfirmWindow() {
        filter.style.display = 'none';
        confirmWindow.style.display = 'none';
    }
    cancelBt.addEventListener("click", function(event) {
        event.preventDefault();
        closeConfirmWindow();
    });
    // Confirm
    function confirmDelete(){
        parent.remove();
        closeConfirmWindow();
    }
    confirmBt.addEventListener("click", function(event) {
        event.preventDefault();
        confirmDelete();
    });
    


} // remove comment

function commentOnPost(event){
    event.preventDefault();
    // Form values
    const form = document.getElementById('comment-form');
    const comment = document.querySelector("textarea").value;
    form.reset();

    //Cloning template and getting template classes
    const template = document.getElementById('comment-template');
    const commentsSection = document.getElementById('comments-section');

    const clone = document.importNode(template.content, true);
    
    const avatar = clone.querySelector('.avatar');
    const username = clone.querySelector('.username');
    const at = clone.querySelector('.when');
    const content = clone.querySelector('.content');
    const score = clone.querySelector('.counter');
    const fix = clone.querySelector('.counter-fix');
    
    // Set propoerties
    avatar.src = 'assets/images/avatars/image-juliusomo.png';
    username.innerHTML = 'juliusomo';
    at.innerHTML = 'now';
    content.innerHTML = comment;
    score.innerHTML = 0;
    fix.innerHTML = 0;
    
    // Remove reply control
    const rmRpl = clone.querySelector('.reply');
    rmRpl.remove();
    
    // If it contains text Add to DOM
    if (comment){
        commentsSection.appendChild(clone);
    }
    
} // comment on main

function answerComment(e){
    // Get clicked element
    const click = e.target;
    let parent;
    if (click.closest('.reply-comment')) {
        parent = click.closest('.reply-comment');

    } else {
        parent = click.closest('.comment');
    }

    //Cloning template and getting template classes
    const template = document.getElementById('comment-template');
    const commentsSection = document.getElementById('comments-section');

    const clone = document.importNode(template.content, true);
    clone.firstElementChild.classList.add("reply-comment");
    
    const avatar = clone.querySelector('.avatar');
    const username = clone.querySelector('.username');
    const at = clone.querySelector('.when');
    const content = clone.querySelector('.content');
    const score = clone.querySelector('.counter');
    const fix = clone.querySelector('.counter-fix');
    const reply = clone.querySelector('.replyingTo');
    
    // Set propoerties
    avatar.src = 'assets/images/avatars/image-juliusomo.png';
    username.innerHTML = 'juliusomo';
    at.innerHTML = 'now';
    reply.innerHTML = '@';
    reply.innerHTML += parent.querySelector('.username').textContent;
    score.innerHTML = 0;
    fix.innerHTML = 0;

    // Remove reply control
    const rmRpl = clone.querySelector('.reply');
    rmRpl.remove();

    // Change button to reply
    let sendBt = document.querySelector('.send-comment-bt');
    sendBt.style.display = 'none';
    let replyBt = document.querySelector('.send-answer-bt');
    replyBt.style.display = 'block';

    // Add reply sender
    replyBt.addEventListener('click', sendAnswer);
    function sendAnswer(event){
        event.preventDefault();
        // Form values
        const form = document.getElementById('comment-form');
        const comment = document.querySelector("textarea").value;
        form.reset();
        content.innerHTML += comment;
        // If it contains text Add to DOM
        if (comment){
            commentsSection.appendChild(clone);
        }
        // Change button back ro send
        replyBt.style.display = 'none';
        sendBt.style.display = 'block';
        // Discard class changes
        clone.firstElementChild.classList.remove("reply-comment");
    }

}

function editComment(e) {
    // Get clicked element
    const click = e.target;
    let parent;
    if (click.closest('.reply-comment')) {
        parent = click.closest('.reply-comment');

    } else {
        parent = click.closest('.comment');
    }

    // Get class to edit comment
    let edit = parent.querySelector('.content');
    let reply = parent.querySelector('.replyingTo').textContent;

    // Change button to edit
    let sendBt = document.querySelector('.send-comment-bt');
    sendBt.style.display = 'none';
    let editBt = document.querySelector('.send-edit-bt');
    editBt.style.display = 'block';

    // Add reply sender
    editBt.addEventListener('click', sendAnswer);
    function sendAnswer(event){
        event.preventDefault();

        // Form values
        const form = document.getElementById('comment-form');
        const comment = document.querySelector("textarea").value;
        form.reset();

        // If it contains text Add to DOM
        if (comment){
            if (click.closest('.reply-comment')) {
                edit.innerHTML = reply + ' ';
                edit.innerHTML += comment;
            } else {
                edit.innerHTML = comment;
            }

        }

        // Change button back ro send
        editBt.style.display = 'none';
        sendBt.style.display = 'block';
    }
}

