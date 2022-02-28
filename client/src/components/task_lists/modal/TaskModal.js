import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TaskUpdateForm from './TaskUpdateForm'

const TaskModal = ({ show, onHide, task, handleUpdate, currentProject }) => {

    if (!task) {
        task = {
            description: "",
            timeEstimate: 0,
            timeLog: 0,
            project: currentProject
    }
    }
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{task.description}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TaskUpdateForm handleUpdate={handleUpdate} task={task} onHide={onHide} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TaskModal;