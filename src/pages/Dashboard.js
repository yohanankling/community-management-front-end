import React, { useState, useRef, useEffect } from "react";
import BottomNavbar from "../components/BottomNavbar";
import {
    Container,
    Modal,
    Button,
    Form,
    Alert,
} from "react-bootstrap";
import {
    PersonCircle,
    Trash,
} from "react-bootstrap-icons";
import mockUsers from "../data/mockUsers";
import SendMessageModal from "../components/SendMessageModal";
import EditUserModal from "../components/EditUserModal";
import UserDetailsModal from "../components/UserDetailsModal";
import UserEventsHistoryModal from "../components/UserEventsHistoryModal";
import DashboardCards from "../components/DashboardCards";
import DashboardTable from "../components/DashboardTable";

function Dashboard() {
    // Original list of all users
    const [users, setUsers] = useState(mockUsers);
    // List of users currently displayed in the table (filtered by UserSearch)
    const [displayUsers, setDisplayUsers] = useState(mockUsers);

    useEffect(() => {
        setDisplayUsers(users);
    }, [users]);

    const [userForDetails, setUserForDetails] = useState(null);

    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [newUser, setNewUser] = useState({
        fullName: "",
        email: "",
        linkedin: "",
        role: "",
        yearsOfExperience: "",
    });
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // States for Send Message Modal
    const [showSendMessageModal, setShowSendMessageModal] = useState(false);
    const [userForMessage, setUserForMessage] = useState(null);

    // States for Edit User Modal
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [userForEdit, setUserForEdit] = useState(null);

    // States for Connections History Modal (NEW)
    const [showConnectionsHistoryModal, setShowConnectionsHistoryModal] = useState(false);
    const [userForConnectionsHistory, setUserForConnectionsHistory] = useState(null);

    // States for Events History Modal (NEW)
    const [showEventsHistoryModal, setShowEventsHistoryModal] = useState(false);
    const [userForEventsHistory, setUserForEventsHistory] = useState(null);

    // For general dashboard-level alerts, e.g., for AddUser modal
    const [showAlertAddUser, setShowAlertAddUser] = useState(false);
    const [alertVariantAddUser, setAlertVariantAddUser] = useState("success");
    const [alertMessageAddUser, setAlertMessageAddUser] = useState("");

    // Ref and state for Excel import within Dashboard
    const fileInputRef = useRef();
    const [importMessage, setImportMessage] = useState('');

    /**
     * Callback function passed to UserSearch to receive the filtered list of users.
     * This function updates the 'displayUsers' state in Dashboard.
     * @param {Array} filteredList - The list of users after applying search filters.
     */
    const handleFilteredUsersChange = (filteredList) => {
        setDisplayUsers(filteredList);
    };

    const handleExcelImportOnDashboard = (data) => {
        setUsers((prevUsers) => [...prevUsers, ...data]);
    };

    const handleRowClick = (user) => {
        setUserForDetails(user);
    };

    const handleCloseUserDetailsModal = () => {
        setUserForDetails(null);
    };

    const handleShowAddUserModal = () => setShowAddUserModal(true);
    const handleCloseAddUserModal = () => {
        setShowAddUserModal(false);
        setNewUser({
            fullName: "",
            email: "",
            linkedin: "",
            role: "",
            yearsOfExperience: "",
        });
        setShowAlertAddUser(false);
    };

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleAddUser = () => {
        if (!newUser.fullName || !newUser.email) {
            setAlertVariantAddUser("danger");
            setAlertMessageAddUser("Full name and email are required fields.");
            setShowAlertAddUser(true);
            return;
        }

        setUsers((prevUsers) => [
            ...prevUsers,
            { ...newUser, id: Date.now() },
        ]);
        handleCloseAddUserModal();
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteConfirmModal(true);
        handleCloseUserDetailsModal();
    };

    const handleConfirmDelete = () => {
        setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userToDelete.id)
        );
        setShowDeleteConfirmModal(false);
        setUserToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmModal(false);
        setUserToDelete(null);
    };

    // --- Functions for Send Message Modal ---
    const handleShowSendMessageModal = (user) => {
        setUserForMessage(user);
        setShowSendMessageModal(true);
        handleCloseUserDetailsModal();
    };

    const handleCloseSendMessageModal = () => {
        setShowSendMessageModal(false);
        setUserForMessage(null);
    };

    const onSendMessage = (userId, message) => {
        console.log(`Sending message to user ID ${userId}: "${message}"`);
    };

    // --- Functions for Edit User Modal ---
    const handleShowEditUserModal = (user) => {
        setUserForEdit(user);
        setShowEditUserModal(true);
        handleCloseUserDetailsModal();
    };

    const handleCloseEditUserModal = () => {
        setShowSendMessageModal(false);
        setUserForEdit(null);
    };

    const handleUserUpdate = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
        if (userForDetails && userForDetails.id === updatedUser.id) {
            setUserForDetails(updatedUser);
        }
    };

    // --- Functions for Connections History Modal (NEW) ---
    const handleShowConnectionsHistoryModal = (user) => {
        setUserForConnectionsHistory(user);
        setShowConnectionsHistoryModal(true);
        handleCloseUserDetailsModal();
    };

    const handleCloseConnectionsHistoryModal = () => {
        setShowConnectionsHistoryModal(false);
        setUserForConnectionsHistory(null);
    };

    // --- Functions for Events History Modal (NEW) ---
    const handleShowEventsHistoryModal = (user) => {
        setUserForEventsHistory(user);
        setShowEventsHistoryModal(true);
        handleCloseUserDetailsModal();
    };

    const handleCloseEventsHistoryModal = () => {
        setShowEventsHistoryModal(false);
        setUserForEventsHistory(null);
    };

    return (
        <div className="d-flex flex-column vh-100">
            <Container
                fluid
                className="p-4 bg-light flex-grow-1 dashboard-main-content"
                style={{
                    overflowY: 'auto',
                }}
            >
                <h2 className="mb-4 text-primary">Community Management Dashboard</h2>

                {/* Render the DashboardCards component */}
                <DashboardCards totalMembers={users.length} />

                {/* Render the DashboardTable component */}
                <DashboardTable
                    users={users}
                    displayUsers={displayUsers}
                    onFilteredUsersChange={handleFilteredUsersChange}
                    onShowAddUserModal={handleShowAddUserModal}
                    onRowClick={handleRowClick}
                />

                <UserDetailsModal
                    show={!!userForDetails}
                    onHide={handleCloseUserDetailsModal}
                    user={userForDetails}
                    onEditClick={handleShowEditUserModal}
                    onMessageClick={handleShowSendMessageModal}
                    onDeleteClick={handleDeleteClick}
                    onViewConnectionsClick={handleShowConnectionsHistoryModal}
                    onViewEventsClick={handleShowEventsHistoryModal}
                />

                <Modal show={showAddUserModal} onHide={handleCloseAddUserModal} centered>
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title><PersonCircle size={20} /> Add New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {showAlertAddUser && (
                            <Alert variant={alertVariantAddUser} onClose={() => setShowAlertAddUser(false)} dismissible>
                                {alertMessageAddUser}
                            </Alert>
                        )}
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter full name"
                                    name="fullName"
                                    value={newUser.fullName}
                                    onChange={handleNewUserChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={newUser.email}
                                    onChange={handleNewUserChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>LinkedIn Profile</Form.Label>
                                <Form.Control
                                    type="url"
                                    placeholder="Enter LinkedIn profile link"
                                    name="linkedin"
                                    value={newUser.linkedin}
                                    onChange={handleNewUserChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter role"
                                    name="role"
                                    value={newUser.role}
                                    onChange={handleNewUserChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Years of Experience</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter years of experience"
                                    name="yearsOfExperience"
                                    value={newUser.yearsOfExperience}
                                    onChange={handleNewUserChange}
                                    min="0"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="bg-light">
                        <Button variant="secondary" onClick={handleCloseAddUserModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleAddUser}>
                            Add User
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDeleteConfirmModal} onHide={handleCancelDelete} centered>
                    <Modal.Header closeButton className="bg-danger text-white">
                        <Modal.Title><Trash size={20} /> Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {userToDelete && (
                            <p>
                                Are you sure you want to delete user{" "}
                                <strong>{userToDelete.fullName}</strong>? This action cannot be undone.
                            </p>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="bg-light">
                        <Button variant="secondary" onClick={handleCancelDelete}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <SendMessageModal
                    show={showSendMessageModal}
                    onHide={handleCloseSendMessageModal}
                    user={userForMessage}
                    onSendMessage={onSendMessage}
                />

                <EditUserModal
                    show={showEditUserModal}
                    onHide={handleCloseEditUserModal}
                    user={userForEdit}
                    onUserUpdate={handleUserUpdate}
                />

                <UserEventsHistoryModal
                    show={showEventsHistoryModal}
                    onHide={handleCloseEventsHistoryModal}
                    user={userForEventsHistory}
                />

            </Container>

            <BottomNavbar onImport={handleExcelImportOnDashboard} />
        </div>
    );
}

export default Dashboard;