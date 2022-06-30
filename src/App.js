import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

export default function App() {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const response = await fetch(
      'https://api.jsonbin.io/b/62bd6da2402a5b3802430bf2/1'
    );
    const data = await response.json();
    setList(data);
    console.log(data);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormChange = ({ target }) => {
    setForm((oldValue) => ({
      ...oldValue,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async () => {
    const response = await fetch(
      'https://api.jsonbin.io/v3/b/62bd6da2402a5b3802430bf2',
      {
        body: JSON.stringify([...list, form]),
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key':
            '$2b$10$1rR79LV84KCj76crgxRawOtaIW/8vH2bMB1QKrW6nZzVxiL7vjHqu',
        },
        method: 'PUT',
      }
    );

    if (response.ok) {
      getList();
      handleClose();
    }
  };

  return (
    <div>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-light">Job Portal</span>
          <button className="btn btn-primary" id="addNew" onClick={handleShow}>
            Add New
          </button>
        </div>
      </nav>

      <div className="mt-2 p-1">
        <ul className="list-group">
          {list?.map((item) => (
            <li className="list-group-item d-flex align-items-center">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.fullName}</div>
                {item.designation} - {item.organization}
              </div>
              <span className="badge bg-primary rounded-pill">
                {item.experince} Years experince
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onChange={handleFormChange}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                id="fullNameInput"
                placeholder="Enter Your Name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Organization</label>
              <input
                type="text"
                name="organization"
                className="form-control"
                id="organizationInput"
                placeholder="Enter organization"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">designation</label>
              <input
                type="text"
                name="designation"
                className="form-control"
                id="designationInput"
                placeholder="Enter Designation"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Experince in year</label>
              <input
                type="number"
                name="experince"
                className="form-control"
                id="experinceInput"
                placeholder="Enter Experince (years)"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn btn-outline-primary"
            id="closeBtn"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="saveData"
            onClick={handleSubmit}
          >
            Add New Candidate
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
