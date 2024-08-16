import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function Todos({ todos }) {
  async function handleDelete(index) {
    console.log(index);
    try {
      const result = await fetch(`http://localhost:4000/api/todos/${index}`, {
        method: "DELETE",
      });
      console.log("done");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(id) {
    console.log(todos, id);

    try {
    } catch (error) {}
  }
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Piority</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => {
            return (
              <tr key={index}>
                <td>{todo.title}</td>
                <td>{todo.desc}</td>
                <td>{todo.poi}</td>
                <td>
                  <input
                    type="checkbox"
                    name="completed"
                    id="completed"
                    checked={todo.completed ? true : false}
                    readOnly
                  />
                </td>
                <td>
                  <div>
                    <Button
                      onClick={() => handleDelete(todo.id)}
                      className="m-1"
                      variant="danger"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        handleUpdate(todo.id);
                      }}
                      variant="primary"
                    >
                      {" "}
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
