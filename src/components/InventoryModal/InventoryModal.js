import React from "react";
import ReactDom from "react-dom";
import "./InventoryModal.scss";
import { ReactComponent as X } from "../../assets/icons/close-24px.svg";

function InventoryModal({ open, onClose, handler, item_name }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className="overlayStyle">
      <div className="modalStyle">
        <X onClick={onClose} />
        <div className="modalContainer">
          <h1 className="modalTitle">Delete {item_name} inventory item?</h1>
          <p className="modalText">
            Please confirm that you'd like to delete {item_name} from the
            inventory list. You won't be able to undo this action.
          </p>
          <div className="buttonContainer">
            <button onClick={onClose} className="modalButton">
              Cancel
            </button>
            <button
              onClick={handler}
              className="modalButton modalButton-delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default InventoryModal;
