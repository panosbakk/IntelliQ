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

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:9103/intelliq_api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${username}&password=${password}`,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "An error occurred");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <Container className="d-flex flex-column align-items-center">
      <h2>Login Page</h2>
      <Row>{error && <p className="text-danger">{error}</p>}</Row>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>
        <FormGroup className="d-flex justify-content-end">
          <Button
            type="submit"
            color="primary"
            disabled={!username || !password}
          >
            Login
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default Login;
