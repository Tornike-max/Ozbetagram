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
    <>
      <Modal size="lg" backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalBody>
            <div className="flex justify-center">
              <img src={image} alt="image" className="max-w-full h-auto" />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-end">
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
