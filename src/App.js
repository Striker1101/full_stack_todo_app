import React, { useEffect } from "react";
import { useState } from "react";
import FormTodo from "./components/FormTodo";
import Todos from "./components/Todos";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function App() {
  const [toggleForm, setToggleForm] = useState(false);
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    pior: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    setTodos([...todos, formData]); // Create a new array with the existing todos and the new todo
    setFormData({ title: "", desc: "", pior: "" }); // Reset the form data
    console.log(todos);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  //update life cycle method
  useEffect(() => {
    async function getterAllTodos() {
      const data = await getAll();
      console.log(data);
      //updating the state (setTodos)
      setTodos(data);
    }

    //call function
    getterAllTodos();
  }, []);

  async function getAll() {
    try {
      const response = await fetch("http://localhost:4000/api/todos?all=true");
      const result = await response.json();
      return result;
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Container>
      <div style={{ display: "flex", gap: "10px" }} className="row ">
        <h1 className="col">Todo List </h1>
        <Button
          onClick={() => {
            setToggleForm(!toggleForm);
          }}
        >
          {toggleForm ? "Hide Form" : "Show Form"}
        </Button>
        {/* {true ?? "this is a boy"}  */}
      </div>
      <Todos todos={todos} />
      {toggleForm ? (
        <FormTodo
          handleChange={handleChange}
          formData={formData}
          handleSubmit={handleSubmit}
          src={true}
        />
      ) : (
        ""
      )}
    </Container>
  );
}
