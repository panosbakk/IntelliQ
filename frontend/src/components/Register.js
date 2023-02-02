import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
} from "reactstrap";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:9103/intelliq_api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            admin,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <Row>{error && <p className="text-danger">{error}</p>}</Row>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={admin}
              onChange={() => setAdmin(!admin)}
            />{" "}
            Admin
          </Label>
        </FormGroup>
        <FormGroup className="d-flex justify-content-end">
          <Button type="submit" color="primary">
            Register
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default Register;
