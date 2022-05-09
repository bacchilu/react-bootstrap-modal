import React from 'react';
import {createRoot} from 'react-dom/client';

const ModalContent = function ({title, rootElement, children}) {
    React.useEffect(function () {
        const myModal = new bootstrap.Modal(rootElement);
        myModal.show();
    }, []);

    const [body, footer] = children;

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">{body}</div>
            {footer !== undefined && <div className="modal-footer">{footer}</div>}
        </div>
    );
};

export const Modal = (function () {
    const modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal fade');
    modalDiv.setAttribute('tabindex', '-1');
    modalDiv.setAttribute('aria-hidden', 'true');
    const modalDialogDiv = document.createElement('div');
    modalDialogDiv.setAttribute('class', 'modal-dialog modal-dialog-scrollable');
    modalDiv.appendChild(modalDialogDiv);
    document.body.appendChild(modalDiv);

    const root = createRoot(modalDialogDiv);

    modalDiv.addEventListener('hidden.bs.modal', function (event) {
        root.render(null);
    });

    return {
        render: function (title, body, footer) {
            root.render(
                <ModalContent title={title} rootElement={modalDiv}>
                    {body}
                    {footer}
                </ModalContent>
            );
        },
    };
})();
