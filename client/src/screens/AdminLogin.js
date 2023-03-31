import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      setUsernameError('');
      setPasswordError('');
      setFormError('');
      alert('Login successful!');
      history.push('/admin1'); // replace '/dashboard' with the URL of the desired page
    }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username:</Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            invalid={usernameError !== ''}
          />
          <FormFeedback>{usernameError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password:</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            invalid={passwordError !== ''}
          />
          <FormFeedback>{passwordError}</FormFeedback>
        </FormGroup>
        <Button color="primary">Submit</Button>
        {formError !== '' && <p className="text-danger mt-2">{formError}</p>}
      </Form>
    </div>
  );
};

export default LoginPage;
