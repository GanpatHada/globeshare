export function postsHandler(posts){
    let updatedPosts=posts.reduce((acc,cur)=>{
        const postIndex=posts.findIndex(post=>post.postId===cur.postId);
        if(postIndex ===  -1)
             acc.push(cur);
        else acc[postIndex]=cur;
        return acc;

    },[])
    return updatedPosts
}