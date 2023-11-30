import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export default function ImageModal({
  isOpen,
  onClose,
  image,
  name,
}: {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  name: string;
}) {
  return (
    <div className="flex justify-center items-center">
      <Modal
        className="w-96 sm:w-[400px] md:w-[650px]"
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent className="m-auto">
          <ModalHeader>{name}</ModalHeader>
          <ModalBody>
            <div className="flex justify-center items-center">
              <img
                src={image}
                alt="image"
                className="w-72 h-80 sm:w-80 md:w-96 rounded-md"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-center items-center">
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
