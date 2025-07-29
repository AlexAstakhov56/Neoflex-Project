import { FC, useState } from "react";
import "./DenyApplicationModal.scss";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "../UI";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { resetFormsState } from "../../store/formsSlice";

type TDenyApplicationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const DenyApplicationModal: FC<TDenyApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (isConfirmed) {
      navigate("/");
    }
    onClose();
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    dispatch(resetFormsState());
  };

  return (
    <div className="denyApplicationModal">
      <Modal isOpen={isOpen} onClose={handleClose} title="Deny application">
        {!isConfirmed ? (
          <div>
            <p className="denyApplicationModal__text">
              You exactly sure, you want to cancel this application?
            </p>
            <div className="denyApplicationModal__buttons">
              <Button
                paddingY={11}
                paddingX={29}
                borderRadius={8}
                onClick={handleConfirm}
                buttonType="deny"
              >
                Deny
              </Button>
              <Button
                paddingY={11}
                paddingX={29}
                borderRadius={8}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <p className="denyApplicationModal__text">
              Your application has been deny!
            </p>
            <div className="denyApplicationModal__buttons">
              <Button
                paddingY={11}
                paddingX={29}
                borderRadius={8}
                onClick={handleClose}
              >
                Go home
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
