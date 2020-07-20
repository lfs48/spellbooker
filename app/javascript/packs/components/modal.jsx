import React from 'react';
import { useSelector } from 'react-redux';
import CreateClass from './spellbook/create_class';
import DeleteSpellConfirmation from './spellbook/delete_spell_confirmation';
import SpellForm from './spellbook/spell_form';

const Modal = () => {

    const modalComponents = ({
        SpellForm: <SpellForm />,
        DeleteSpellConfirmation: <DeleteSpellConfirmation />,
        CreateClass: <CreateClass />
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