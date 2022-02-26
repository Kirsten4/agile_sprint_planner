import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const TaskModal = (props) => {
    
        return(
            <Modal {...props} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.task.description}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

export default TaskModal;