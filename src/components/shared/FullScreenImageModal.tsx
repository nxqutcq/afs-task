import { FC } from 'react';
import ReactDOM from 'react-dom';

interface FullScreenImageModalProps {
  isOpen: boolean;
  image: string | null;
  onClose: () => void;
}

export const FullScreenImageModal: FC<FullScreenImageModalProps> = ({
  isOpen,
  onClose,
  image,
}) => {
  if (!isOpen || !image) return null;

  return ReactDOM.createPortal(
    <div className="full-screen-modal__overlay" onClick={onClose}>
      <div
        className="full-screen-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt="Полноэкранное изображение"
          className="full-screen-modal__image"
        />
        <button onClick={onClose} className="full-screen-modal__close">
          &times;
        </button>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};
