import { useState, forwardRef, useImperativeHandle } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button className="mb-4" onClick={toggleVisibility}>
          {" "}
          {props.buttonLabel}{" "}
        </Button>
      </div>
      <div style={showWhenVisible}>
        <Modal
          show={visible}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {props.children}
          <Button variant="danger" onClick={toggleVisibility}>
            {" "}
            cancel{" "}
          </Button>
        </Modal>
      </div>
    </div>
  );
});
Togglable.displayName = "Togglable";
export default Togglable;
