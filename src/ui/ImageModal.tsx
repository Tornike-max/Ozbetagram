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
        className="w-96 sm:w-[550px] md:w-[950px]"
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent className="m-auto">
          <ModalHeader>{name}</ModalHeader>
          <ModalBody>
            <div className="flex justify-center items-center">
              <img src={image} alt="image" className="max-w-full h-auto" />
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
