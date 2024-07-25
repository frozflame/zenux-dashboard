import React, {useRef} from "react";
import {Reference} from "../common";

export interface ModalDialogProps {
    children: React.ReactNode;
    onConfirm?: () => void;
    onDismiss?: () => void;
    reference?: Reference;
    title: string | React.ReactNode;
}


export function ModalDialog(props: ModalDialogProps) {
    const ref = props.reference || useRef(null);

    function confirm() {
        if (props.onConfirm) {
            props.onConfirm();
        }
        if (ref.current) {
            ref.current.close();
        }
    }

    function dismiss() {
        if (props.onDismiss) {
            props.onDismiss();
        }
        if (ref.current) {
            ref.current.close();
        }
    }

    function handleConfirm(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        event.stopPropagation();
        confirm();
    }

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        const target = event.target as HTMLElement;
        if (target.tagName === "DIALOG") {
            event.preventDefault();
            event.stopPropagation();
            dismiss();
        }
    }

    function handleDismiss(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        event.stopPropagation();
        dismiss();
    }

    return <dialog ref={ref} className="zenux-dashboard-modal-dialog modal-dialog" onClick={handleClick}>
        <div>
            <div className="head">
                <div>
                    <span>{props.title}</span>
                </div>
                <div>
                    <a href="#" className="submit" title="Submit" onClick={handleConfirm}>
                        <span className="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>
                    </a>
                    <a href="#" className="dismiss" title="Close" onClick={handleDismiss}>
                        <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                    </a>
                </div>
            </div>
            <div className="body">
                {props.children}
            </div>
        </div>
    </dialog>
}
