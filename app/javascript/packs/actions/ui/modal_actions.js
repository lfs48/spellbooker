import { OPEN_MODAL, CLOSE_MODAL } from "../types";

export const openModal = (modal) => ({
    type: OPEN_MODAL,
    modal: modal
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});