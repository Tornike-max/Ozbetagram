import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useDeleteUser } from "../features/users/useDeleteUser";
import SpinnerComponent from "./SpinnerComponent";
import { useUser } from "../features/users/useUser";
import { HiOutlineTrash } from "react-icons/hi2";
import { useDeletePost } from "../features/posts/useDeletePost";

export default function ConfirmDeletion({
  onClose,
  isOpen,
  id,
}: {
  onClose: () => void;
  isOpen: boolean;
  id: number;
}) {
  const { deleteUser, isUserDeleting } = useDeleteUser();
  const { data: user } = useUser();
  const { deleteNotExistPosts, isDeletingPost } = useDeletePost();

  if (isUserDeleting || isDeletingPost) return <SpinnerComponent />;

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    deleteUser(user?.id || "");
    deleteNotExistPosts(id);
  }

  return (
    <>
      <Modal backdrop="blur" size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-red-600">
                Delete Account
              </ModalHeader>
              <ModalBody>
                <span className="text-red-600 text-3xl text-center font-bold">
                  Warning!
                </span>
                <p>
                  Are you sure you want to delete this account? When you delete
                  it, it will not be possible to restore it or create an account
                  with the same email.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="flex items-center gap-1"
                  color="danger"
                  onClick={(e) => handleDelete(e)}
                >
                  <span>
                    <HiOutlineTrash />
                  </span>
                  <span> Delete Account</span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
