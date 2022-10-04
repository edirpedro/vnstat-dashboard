import React from "react";
import ReactDOM from "react-dom";
import "./useModal.scss";

const useModal = (children, options = {}, props = {}) => {
  const [Modal, setModal] = React.useState();
  const ref = React.useRef();

  options = {
    name: "name",
    ...options,
  };

  props.close = closeModal;

  function toggle() {
    if (Modal) closeModal();
    else openModal();
  }

  function openModal() {
    setModal(
      ReactDOM.createPortal(
        <div ref={ref} className={"modal modal-" + options.name}>
          <div className="modal__overlay" onClick={() => closeModal()}></div>
          <div className="modal__window">
            {React.createElement(children, props)}
          </div>
        </div>,
        document.body
      )
    );
    document.addEventListener("keydown", escape, false);
  }

  function closeModal() {
    ref.current.classList.add("close");
    setTimeout(() => {
      setModal();
    }, 1000);
    document.removeEventListener("keydown", escape, false);
  }

  function escape(e) {
    if (e.key === "Escape") closeModal();
  }

  return [Modal, toggle];
};

export default useModal;
