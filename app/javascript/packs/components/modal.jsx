import React from 'react';
import { useSelector } from 'react-redux';
import SpellForm from './spellbook/spell_form';

const Modal = () => {

    const modalComponents = ({
        SpellForm: <SpellForm />
    });

    const {componentName} = useSelector(
        state => ({
            componentName: state.ui.modal,
        })
    );

    const component = modalComponents[componentName] ? modalComponents[componentName] : <></>;

    return(
        <div className="modal-bg">
            {component}
        </div>
    );
};

export default Modal;