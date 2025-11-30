import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  ModalProps,
  TModal,
  TModalContextType,
  TModalPayLoad,
} from "../types/modal";
import { useStrictContext } from "../hooks/useStrictContext";

export const ModalContext = createContext<TModalContextType | null>(null);

let modalId = 1;

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalProps, setModalProps] = useState<TModal | null>(null);
  const awaitingPromiseRef = useRef<TModalPayLoad | null>(null);

  const showModal = useCallback<TModalContextType["showModal"]>(
    (modalComponent) => (props) => {
      return new Promise((resolve) => {
        awaitingPromiseRef.current?.(null);
        awaitingPromiseRef.current = resolve as TModalPayLoad;
        setModalProps({
          component: modalComponent,
          props,
          id: modalId++,
        });
      });
    },
    []
  );

  const closeModal = useCallback<TModalContextType["closeModal"]>((data) => {
    awaitingPromiseRef.current?.(data || null);
    setModalProps(null);
  }, []);

  const renderModal = useCallback((props: TModal) => {
    const Modal = props.component;

    return <Modal {...props.props} closeModal={closeModal} />;
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {modalProps && renderModal(modalProps)}
    </ModalContext.Provider>
  );
};

export const useModal =
  <ResolvePayload extends Record<string, unknown>>() =>
  <Props extends ModalProps<ResolvePayload>>(
    modalComponent: FunctionComponent<Props>
  ) => {
    const { showModal, closeModal } = useStrictContext(
      ModalContext,
      "ModalContext"
    );

    return {
      showModal: showModal<ResolvePayload, Props>(modalComponent),
      closeModal,
    };
  };
