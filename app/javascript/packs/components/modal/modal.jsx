import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateClass from './create_class';
import DeleteSpellConfirmation from './delete_spell_confirmation';
import Reset from './reset';
import Share from './share';
import SpellForm from './spell_form';
import Contact from './contact';
import ManageClasses from './manage_classes';

const Modal = () => {

    const [modalState, setModalState] = useState("closed");

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

    useEffect( () => {

        if (modal.open) {
            setModalState("opening");
            setTimeout( () => {
                setModalState("open");
            }, 100);
        } else if (modal.name) {
            setModalState("closing");
            setTimeout( () => {
                setModalState("closed");
            }, 500);
        }

    }, [modal]);

    return(
        <div className={`modal-bg modal-bg-${modalState}`}>
            {modal.name in modalComponents && modalState != "closed" ? modalComponents[modal.name] : <></>}
        </div>
    );
};

export default Modal;