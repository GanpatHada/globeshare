import { nanoid } from "nanoid";

export function postsHandler(posts, newPosts) {
  let updatedPosts = [...posts, ...newPosts];
  updatedPosts = updatedPosts.reduce((acc, cur) => {
    const postIndex = updatedPosts.findIndex(
      (post) => post.postId === cur.postId
    );
    if (postIndex === -1) acc.push(cur);
    else acc[postIndex] = cur;
    return acc;
  }, []);
  return updatedPosts;
}

export function postDeleteHanlder(posts,postIdToDelete)
{
  let updatedPosts=posts.filter(post=>post.postId!==postIdToDelete);
  return updatedPosts;
}

export function likeHandler(posts, userId, postId) {
  let updatedPosts = posts.map((post) => {
    if (post.postId === postId)
      return { ...post, likes: [...post.likes, userId] };
    return post;
  });
  return updatedPosts;
}

export function postEditHandler(posts,editedPost){
  let updatedPosts=posts.map(post=>{
    if(post.postId===editedPost.postId)
      return editedPost;
    return post;
  });
  return updatedPosts;
}

export function unlikeHandler(posts, userId, postId) {
  let updatedPosts = posts.map((post) => {
    if (post.postId === postId)
      return { ...post, likes: post.likes.filter((like) => like !== userId) };
    return post;
  });
  return updatedPosts;
}

export function commentHandler(posts,comment, postId) {
  let updatedPosts = posts.map((post) => {
    if (post.postId === postId)
      return { ...post, comments: [...post.comments, comment] };
    return post;
  });
  return updatedPosts;
}

export function getPostCreationDate(dateInMs) {
  const localDate = new Date(dateInMs);
  const day = localDate.getDate();
  const month = localDate.toLocaleString("en-US", { month: "short" });
  const year = localDate.getFullYear();
  return `${month} ${day} , ${year}`;
}

export function getTimeDifference(dateInMs) {
  const postTime = dateInMs;
  const currentTime = Date.now();
  const timeDiffMs = currentTime - postTime;
  const seconds = Math.floor(timeDiffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365.25);

  if (seconds < 60) {
    return `${seconds} sec${seconds > 1 ? "s" : ""}`;
  } else if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? "s" : ""}`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (days < 30.44) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""}`;
  } else {
    return `${years} year${years > 1 ? "s" : ""}`;
  }
}


