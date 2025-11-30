import { ElementType, FunctionComponent } from "react";

export type TModalPayLoad<
  ResolvePayload extends Record<string, unknown> = Record<string, unknown>
> = (value: ResolvePayload | null) => void;

export type ModalProps<ResolvePayload extends Record<string, unknown>> = {
  closeModal: TModalPayLoad<ResolvePayload>;
};

export type TModal = {
  id: number;
  component: ElementType;
  props?: Record<string, unknown>;
};

export type TModalContextType = {
  showModal<
    ResolvePayload extends Record<string, unknown>,
    Props extends ModalProps<ResolvePayload>
  >(
    modalComponent: FunctionComponent<Props>
  ): (props: Omit<Props, "closeModal">) => Promise<ResolvePayload | null>;
  closeModal<ResolvePayload extends Record<string, unknown>>(
    data: null | ResolvePayload
  ): void;
};
