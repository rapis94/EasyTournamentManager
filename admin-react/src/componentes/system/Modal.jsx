export default function BasicModal({ titulo = "", contenido = null, onClose }) {
    return (
        <>
            <div
                className="modal fade show"
                style={{ display: "block" }}
                tabIndex="-1"
                role="dialog"
                aria-modal="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{titulo}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Cerrar"
                                onClick={onClose}
                            ></button>
                        </div>
                        {contenido}
                    </div>
                </div>

                <div
                    className="modal-backdrop fade show"
                    style={{background: "none"}}
                    onClick={onClose}
                ></div>
            </div>
        </>
    );
}
