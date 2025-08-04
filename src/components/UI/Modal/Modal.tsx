import { FC, MouseEvent, ReactNode } from "react";
import "./Modal.scss";

type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: number;
};

export const Modal: FC<TModalProps> = ({
  children,
  isOpen,
  onClose,
  title = "",
  width = 448,
}) => {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!isOpen) return null;
  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div
        className="modal__content"
        style={{ width }}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="modal__header">
            <h2 className="modal__title">{title}</h2>
            <img
              src="/public/Icons/close_icon.svg"
              alt="close"
              role="close_btn"
              className="modal__close"
              onClick={onClose}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
