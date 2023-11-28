import { useParams } from "react-router-dom";
import { useSingleUserPost } from "../features/account/useSingleUserPost";
import { Spinner } from "@nextui-org/react";
import CreatePost from "../features/posts/CreatePost";

export default function EditPostPage() {
  const { postId } = useParams();
  const { singlePost, isGettingSinglePost } = useSingleUserPost(postId);
  if (isGettingSinglePost) return <Spinner />;
  return (
    <div className="flex justify-center items-center h-full px-4 py-4 pb-10 w-full">
      <CreatePost post={singlePost} postId={postId} />
    </div>
  );
}
