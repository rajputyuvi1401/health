import React, { useState } from 'react';
import axios from 'axios';
import "./Dashboard.css";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Data submitted successfully!');
    } catch (err) {
      setError('Error submitting data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="my-4 text-center">Healthcare Dashboard</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder='Full Name'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="age">
            <Form.Label>Age :</Form.Label>
            <Form.Control
              type="number"
              value={age}
              placeholder='Age'
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="file">
            <Form.Label>Upload File : </Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
        </Row>
        {error && <p className="text-danger">{error}</p>}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

export default Dashboard;
