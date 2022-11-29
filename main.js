const elTableList = document.querySelector(".table-list");
const elPostList = document.querySelector(".post-list");
const elCommentList = document.querySelector(".comment-list");
const elTemplate = document.querySelector(".template").content;
const elPostTemplate = document.querySelector(".post-template").content;
const elCommentTemplate = document.querySelector(".comment-template").content;
const templateFragment = document.createDocumentFragment();

function renderUsers(array, node){

    array.forEach(element => {
        const templateFragmentClone = elTemplate.cloneNode(true);
        templateFragmentClone.querySelector(".table-list__id").textContent = element.id;
        templateFragmentClone.querySelector(".table-list__username").textContent = element.username;
        templateFragmentClone.querySelector(".table-list__name").textContent = element.name;
        templateFragmentClone.querySelector(".table-list__email").href = `mailto:${element.email}`;
        templateFragmentClone.querySelector(".table-list__email").textContent = element.email;
        
        templateFragmentClone.querySelector(".table-list__geo").href = `https://www.google.com/maps/place/${element.address.geo.lat},${element.address.geo.lng}`;
        templateFragmentClone.querySelector(".table-list__adress-email").textContent = element.website;
        templateFragmentClone.querySelector(".table-list__phone").href = `tel:${element.phone}`;

        templateFragmentClone.querySelector(".table-list__company-title").textContent = element.company.name;
        templateFragmentClone.querySelector(".table-list__catch").textContent = element.company.catchPhrase;
        templateFragmentClone.querySelector(".table-list__bs").textContent = element.company.bs;
        templateFragmentClone.querySelector(".table-list__btn").dataset.id = element.id

        templateFragment.appendChild(templateFragmentClone);
    })
    node.appendChild(templateFragment)
}
function renderPost(array, node){
    
    node.innerHTML = null;

    array.forEach(element =>{
        const postFragmentClone = elPostTemplate.cloneNode(true);
        postFragmentClone.querySelector(".post-list__title").textContent = element.id;
        postFragmentClone.querySelector(".post-list__title").textContent = element.title;
        postFragmentClone.querySelector(".post-list__text").textContent = element.body;
        postFragmentClone.querySelector(".post-list__id").textContent = element.id;
        postFragmentClone.querySelector(".post-list__btn").dataset.id = element.id;
        templateFragment.appendChild(postFragmentClone);
    })
    node.appendChild(templateFragment);
};
function renderComment(array, node){
    
    node.innerHTML = null;

    array.forEach(element =>{
        const commentFragmentClone = elCommentTemplate.cloneNode(true);
        commentFragmentClone.querySelector(".comment-list__name").textContent = element.name;
        commentFragmentClone.querySelector(".comment-list__text").textContent = element.body;
        commentFragmentClone.querySelector(".comment-list__id").textContent = element.id;
        templateFragment.appendChild(commentFragmentClone);
    })
    node.appendChild(templateFragment);
};
async function getUsers(url){
    try {
        const response = await (await fetch(url)).json();
        renderUsers(response,elTableList);
    } 
    catch (error) {
        console.log(error);
    }
}
getUsers("https://jsonplaceholder.typicode.com/users");

elTableList.addEventListener("click", evt=> {
    if(evt.target.matches(".table-list__btn")){
        elCommentList.innerHTML = null;
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            const filterPost = data.filter((element => {
                return element.userId == evt.target.dataset.id;
            }));
            renderPost(filterPost, elPostList);
        })
    }
    
});
elPostList.addEventListener("click", evt=> {
    if(evt.target.matches(".post-list__btn")){
        fetch("https://jsonplaceholder.typicode.com/comments")
        .then(res => res.json())
        .then(data => {
            const filterComment = data.filter(element =>{
                return element.postId == evt.target.dataset.id;
            });
            renderComment(filterComment, elCommentList);
        })
    }
})