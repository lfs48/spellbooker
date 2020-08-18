import React from 'react';
import { useSelector } from 'react-redux';
import CreateClass from './create_class';
import DeleteSpellConfirmation from './delete_spell_confirmation';
import Reset from './reset';
import Share from './share';
import SpellForm from './spell_form';
import Contact from './contact';
import ManageClasses from './manage_classes';

const Modal = () => {

    const modalComponents = ({
        SpellForm: <SpellForm />,
        DeleteSpellConfirmation: <DeleteSpellConfirmation />,
        CreateClass: <CreateClass />,
        Share: <Share />,
        Reset: <Reset />,
        Contact: <Contact />,
        ManageClasses: <ManageClasses />
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