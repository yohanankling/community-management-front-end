// src/components/UserDetailsModal.js
import React from "react";
import { Modal, Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
    PersonCircle,
    Envelope,
    Telephone,
    Link45deg,
    Trash,
    PencilSquare,
    ChatText,
    Plug,
    CalendarEvent,
    BriefcaseFill   // Imported for Role
} from "react-bootstrap-icons";

function UserDetailsModal({
                              show,
                              onHide,
                              user,
                              onEditClick,
                              onMessageClick,
                              onDeleteClick,
                              onViewConnectionsClick,
                              onViewEventsClick,
                          }) {
    if (!user) {
        return null;
    }

    // Function to render the tooltip
    const renderTooltip = (text, props) => (
        <Tooltip id={text.replace(/\s/g, '-') + '-tooltip'} {...props}>
            {text}
        </Tooltip>
    );

    return (
        <Modal show={show} onHide={onHide} centered className="modal-lg">
            <Modal.Header closeButton className="bg-light">
                <Modal.Title><PersonCircle size={20} />User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <p className="mb-2"><PersonCircle size={15} /> <strong>Name:</strong> {user.fullName}</p>
                <p className="mb-2"><Envelope size={15} /> <strong>Email:</strong> {user.email}</p>
                <p className="mb-2"><Telephone size={15} /> <strong>Phone:</strong> {user.phone}</p>
                <p className="mb-2"><Link45deg size={15} /> <strong>LinkedIn:</strong> <Button variant="link" href={user.linkedin} target="_blank" rel="noreferrer" className="p-0 text-primary">Profile</Button></p>
                <p className="mb-2">
                    <BriefcaseFill size={15} className="me-1" /> {/* Icon for Role */}
                    <strong>Role:</strong> <Badge bg="info">{user.role}</Badge>
                </p>

                <hr className="my-3" /> {/* Separator */}

                <div className="d-flex justify-content-end flex-wrap">
                    {/* (Events) */}
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("events history", "events-history")}
                    >
                        <Button variant="outline-secondary" className="mb-2 me-2" onClick={() => onViewEventsClick(user)}>
                            <CalendarEvent size={15} />
                        </Button>
                    </OverlayTrigger>

                    {/* חיבורים (Connections) */}
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("connections history", "connections-history")}
                    >
                        <Button variant="outline-info" className="mb-2 me-2" onClick={() => onViewConnectionsClick(user)}>
                            <Plug size={15} />
                        </Button>
                    </OverlayTrigger>

                    {/* הודעה (Message) */}
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("send message", "message")}
                    >
                        <Button variant="outline-success" className="mb-2 me-2" onClick={() => onMessageClick(user)}>
                            <ChatText size={15} />
                        </Button>
                    </OverlayTrigger>

                    {/* עריכה (Edit) */}
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("edit", "edit")}
                    >
                        <Button variant="outline-primary" className="mb-2 me-2" onClick={() => onEditClick(user)}>
                            <PencilSquare size={15} />
                        </Button>
                    </OverlayTrigger>

                    {/* מחיקה (Delete) */}
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("delete", "delete")}
                    >
                        <Button variant="danger" className="mb-2" onClick={() => onDeleteClick(user)}>
                            <Trash size={15} />
                        </Button>
                    </OverlayTrigger>
                </div>
            </Modal.Body>
            <Modal.Footer className="bg-light">
                {/* No content needed here as per previous request */}
            </Modal.Footer>
        </Modal>
    );
}

export default UserDetailsModal;