import { OPEN_MODAL, CLOSE_MODAL } from "../types";

export const openModal = (name, data) => ({
    type: OPEN_MODAL,
    name: name,
    data: data
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});