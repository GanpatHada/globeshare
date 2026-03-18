import { useContext, useCallback } from "react";
import { PostsContext } from "../contexts/PostsContext";
import {
  commentOnPost,
  deletePost,
  editPost,
  likePost,
  savePosts,
  startLoading,
  stopLoading,
  unlikePost,
} from "../actions/PostsAction";

export const usePosts = () => {
  const { state, dispatch } = useContext(PostsContext);
  const { posts, loading } = state;

  const addPosts = useCallback(
    (newPosts) => savePosts(dispatch, newPosts),
    [dispatch]
  );

  const startLoadingPosts = useCallback(
    () => startLoading(dispatch),
    [dispatch]
  );

  const stopLoadingPosts = useCallback(
    () => stopLoading(dispatch),
    [dispatch]
  );

  const likePostOnClient = useCallback(
    (userId, postId) => likePost(dispatch, userId, postId),
    [dispatch]
  );

  const unlikePostOnClient = useCallback(
    (userId, postId) => unlikePost(dispatch, userId, postId),
    [dispatch]
  );

  const commentOnPostOnClient = useCallback(
    (comment, postId) => commentOnPost(dispatch, comment, postId),
    [dispatch]
  );

  const deletePostOnClient = useCallback(
    (postId) => deletePost(dispatch, postId),
    [dispatch]
  );

  const editPostOnClient = useCallback(
    (editedPost) => editPost(dispatch, editedPost),
    [dispatch]
  );

  return {
    posts,
    loading,
    addPosts,
    startLoadingPosts,
    stopLoadingPosts,
    likePostOnClient,
    unlikePostOnClient,
    commentOnPostOnClient,
    deletePostOnClient,
    editPostOnClient,
  };
};