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
type Post = {
  caption: string;
  image: File | string;
  location: string;
  tags: string;
  user_id: string;
  username: string;
};

export async function createPost({
  postDetails,
  postId,
}: {
  postDetails: Post;
  postId: number | string | undefined;
}) {
  console.log(postDetails);
  let path;
  // typeof postDetails.image === "string"
  //   ? postDetails.image
  //   : postDetails?.image?.name;

  if (typeof postDetails.image === "string") {
    console.log("already have image");
    path = postDetails.image;
  } else {
    console.log("create new image");
    path = postDetails?.image?.name;
  }

  const randomImageName =
    typeof postDetails.image === "string"
      ? postDetails.image
      : `${Math.random()}-${path}`;

  const imagePath =
    typeof postDetails.image === "string"
      ? postDetails.image
      : randomImageName.replace(/\//g, "");

  // const query = supabase.from("posts");

  const imageUrl =
    typeof postDetails.image === "string"
      ? postDetails.image
      : `${supabaseUrl}/storage/v1/object/public/postImages/${imagePath}`;

  if (postId) {
    const { data, error } = await supabase
      .from("posts")
      .update({
        ...postDetails,
        image: imageUrl,
      })
      .eq("id", postId)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    const { error: storageError } = await supabase.storage
      .from("postImages")
      .upload(imagePath, postDetails?.image);

    if (storageError) {
      console.log("Error while uploading");
      throw new Error(storageError.message);
    }

    return data;
  } else {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          ...postDetails,
          image: imageUrl,
        },
      ])
      .select()
      .single();

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

export async function getSinglePost(postId: number | string | undefined) {
  const { data, error } = await supabase
    .from("posts")
    .select("*,users(*)")
    .eq("id", postId)
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
