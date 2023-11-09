import React from "react";
import "./App.css";
import { Button, Card, Form, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <Card className={`mb-2 ${todo.isDone ? "bg-light" : ""}`}>
      <Card.Body>
        <Row>
          <Col md={8} className="d-flex align-items-center">
            <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
          </Col>
          <Col md={2} className="text-center">
            <Button variant="success" onClick={() => markTodo(index) }>
              ✓
            </Button>
          </Col>
          <Col md={2} className="text-center">
            <Button variant="danger" onClick={() => removeTodo(index) }>
              ✕
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <Form.Label><b>Add a new task:</b></Form.Label>
        <Row>
          <Col md={8}>
            <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="E.g., Complete the project" />
          </Col>
          <Col md={4} className="text-right">
            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "This is a sample task",
      isDone: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = !newTodos[index].isDone;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const completedTasks = todos.filter(todo => todo.isDone).length;

  return (
    <div className="app">
      <Container>
        <h1 className="text-center mb-4">Task Manager</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              markTodo={markTodo}
              removeTodo={removeTodo}
            />
          ))}
        </div>
        <p style={{ backgroundColor: 'white', borderColor: 'red' }} className="text-muted mt-3">
          Completed Tasks: {completedTasks}/{todos.length}
        </p>
      </Container>
    </div>
  );
}

export default App;