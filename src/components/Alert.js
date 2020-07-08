import React, { useContext } from 'react';
import {CSSTransition} from "react-transition-group";
import { AlertContex } from "../contex/alert/alertContext";

function Alert() {
    const {alert, hide} = useContext(AlertContex);
    return (
        <CSSTransition in={alert.visible} timeout={{enter: 500, exit: 300 }}
                       classNames = {'alert'} mountOnEnter unmountOnExit >
            <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`} >
                <strong>Внимание!&nbsp;</strong>
                {alert.text}
                <button onClick={hide} type="button" className="close"  aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </CSSTransition>

    );
}

export default Alert;