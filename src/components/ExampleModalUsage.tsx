import { useState } from 'react';
import Modal from './Modal';
import OpenModalButton from './OpenModalButton';

export default function ExampleModalUsage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <OpenModalButton onClick={openModal}>
        Open Example Modal
      </OpenModalButton>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary">
            Modal Title
          </h3>
          <p className="text-secondary">
            This is an example modal content. You can put any content here.
          </p>
        </div>
      </Modal>
    </div>
  );
}