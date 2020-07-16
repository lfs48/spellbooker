import React from 'react';
import { useSelector } from 'react-redux';
import SpellForm from './spellbook/spell_form';

const Modal = () => {

    const modalComponents = ({
        SpellForm: <SpellForm />
    });

    const {modal} = useSelector(
        state => ({
            modal: state.ui.modal,
        })
    );

    let content = <></>
    const component = modalComponents[modal.name];
    if (modal.name in modalComponents) {
        content = (
            <div className="modal-bg">
                {component}
            </div>
        );
    }

    return(
        <>
            {content}
        </>
    );
};

export default Modal;