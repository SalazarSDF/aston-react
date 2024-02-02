import ReactDOM from "react-dom";
import "./modal.css";
import { useSelector } from "react-redux";

import { getUserError, setUserError } from "../features/users/userSlice";
import { useAppDispatch } from "../app/store";

export default function Modal() {
  const error = useSelector(getUserError);
  const dispatch = useAppDispatch();

  if (!error) {
    return;
  }
  function onCancel() {
    dispatch(setUserError({ newError: undefined }));
  }

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__content">
        <p className="modal__text">{error}</p>
        <div className="modal__buttons">
          <button className="default-button" onClick={onCancel}>
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
