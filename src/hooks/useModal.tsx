import React from "react";
import ReactDOM from "react-dom";
import styles from "./useModal.module.scss";

const useModal = (
  children: React.FunctionComponent<IModal.Props>,
  options: IModal.Options = {},
  props: IModal.Props = {
    close: () => {},
  }
): IModal.Return => {
  const [Modal, setModal] = React.useState<React.ReactNode>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  options = {
    name: "name",
    ...options,
  };

  props.close = closeModal;

  function toggle(): void {
    if (Modal) closeModal();
    else openModal();
  }

  function openModal(): void {
    setModal(
      ReactDOM.createPortal(
        <div ref={ref} className={styles.modal + " modal-" + options.name}>
          <div className={styles.overlay} onClick={() => closeModal()}></div>
          <div className={styles.window}>
            {React.createElement(children, props)}
          </div>
        </div>,
        document.body
      )
    );
    document.addEventListener("keydown", escape, false);
  }

  function closeModal(): void {
    ref.current?.classList.add("close");
    setTimeout(() => {
      setModal(null);
    }, 1000);
    document.removeEventListener("keydown", escape, false);
  }

  function escape(e: KeyboardEvent): void {
    if (e.key === "Escape") closeModal();
  }

  return [Modal, toggle];
};

export default useModal;

export namespace IModal {
  export interface Options {
    name?: string;
  }

  export interface Props {
    close: () => void;
    [key: string]: any;
  }

  export type Return = [React.ReactNode, () => void];
}
