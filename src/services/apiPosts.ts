import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";
import { MAX_POST_PER_PAGE } from "../constants";

export async function getPosts(user_id: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*,users(*)")
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPost(user_id: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user_id)
    .limit(1)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

interface Post {
  caption: string;
  location: string;
  tags: string;
  image: {
    name: string;
  };
  user_id: string;
  username: string;
}
export async function createPost({
  postDetails,
  postId,
}: {
  postDetails: Post;
  postId: number;
}) {
  const isAlreadyImage =
    postDetails?.image === "string"
      ? postDetails.image
      : postDetails?.image?.name;
  const randomImageName = `${Math.random()}-${isAlreadyImage || ""}`;

  const imagePath = randomImageName.replace(/\//g, "");

  let query = supabase.from("posts");

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/postImages/${imagePath}`;

  if (postId) {
    query = query
      .update({ ...postDetails, image: imageUrl })
      .eq("id", postId)
      .select("*")
      .single();
  } else {
    query = query
      .insert([
        {
          ...postDetails,
          image: imageUrl,
        },
      ])
      .select()
      .single();
  }

  const { data, error } = await query.select().single();

  if (error) throw new Error(error.message);

  const { error: storageError } = await supabase.storage
    .from("postImages")
    .upload(imagePath, postDetails?.image);

  if (storageError) {
    console.log("Error while uploading");
    throw new Error(storageError.message);
  }

  return data;
}

export async function getAllPosts(userIds: string[], page: number) {
  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .in("user_id", userIds);

  if (page) {
    const from = MAX_POST_PER_PAGE * (page - 1);
    const to = page * MAX_POST_PER_PAGE - 1;
    query = query.range(from, to).order("created_at", { ascending: true });
  }

  const { data, error, count } = await query;
  // const { data, error } = await supabase;

  if (error) throw new Error(error.message);

  return { data, count };
}

export async function likedPost(
  newLikedObj: object,
  postId: number,
  userId: string
) {
  const { data: data1, error: error1 } = await supabase
    .from("posts")
    .select("likes") // Select the 'likes' column to get the current array
    .eq("id", postId)
    .single();

  if (error1) {
    throw error1;
  }

  let updatedLikes = data1.likes || [];
  const isAlreadyLiked = updatedLikes.some(
    (post: Post) => post?.user_id === userId
  );

  if (!isAlreadyLiked) {
    updatedLikes.push(newLikedObj);
  } else {
    updatedLikes = updatedLikes.filter((post: Post) => post.user_id !== userId);
  }

  const { data, error: updateError } = await supabase
    .from("posts")
    .update({ likes: updatedLikes })
    .eq("id", postId)
    .single();

  if (updateError) {
    throw updateError;
  }

  return data;
}

export async function getSinglePost(accountId: number) {
  const { data, error } = await supabase
    .from("posts")
    .select("*,users(*)")
    .eq("id", accountId)
    .single();

  if (error) {
    toast.error("Error getting post");
    throw new Error(error.message);
  }

  return data;
}

export async function getAccountElements(userId: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*,users(*)")
    .eq("user_id", `${userId}`);

  if (error) {
    toast.error("Error getting data");
    throw new Error(error.message);
  }

  return data;
}

export async function editPost({
  newObj,
  postId,
}: {
  newObj: object;
  postId: number;
}) {
  const { data, error } = await supabase
    .from("posts")
    .update({ ...newObj })
    .eq("id", postId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function searchByCaption(searchValue: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .textSearch("caption", `${searchValue}`, {
      config: "english",
    });

  if (error) throw new Error(error.message);
  return data;
}

export async function getLikedPosts(user_id: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*,users(*)")
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deletePosts(id: number) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
