import Box from "@mui/material/Box";
import React, { useState } from "react";
import ToDoList from "../src/components/ToDoList";
import List from "@mui/material/List";
import Header from "../src/components/Header";
import Form from "../src/components/Form";

//************************************ *********************** */
/* Fetch data from external API*/
/************************************************************* */
export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/tasks`);

  const tasks = await res.json();

  // Pass data to the page via props

  return { props: { tasks } };
}

function Home(props) {
  //************************************ *********************** */
  /*hooks*/
  /************************************************************* */
  const [todoItem, setTodoItem] = useState("");
  const [items, setItems] = useState([]);
  const [memoText, setMemoText] = useState("");
  const [tasks, SetTasks] = useState(props.tasks);
  //************************************ *********************** */
  /*Post data*/
  /************************************************************* */
  async function addTask(e) {
    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: todoItem }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchDataTask();
    setTodoItem("");
  }
  //************************************ *********************** */
  /*UPDATE TASK*/
  /************************************************************* */
  async function updateTask(id, data) {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchDataTask();
    setMemoText("");
  }
  //************************************ *********************** */
  /*Get data*/
  /************************************************************* */
  async function fetchDataTask(e) {
    const res = await fetch(`http://localhost:3000/api/tasks`);
    const tasks = await res.json();
    SetTasks(tasks);
  }
  //************************************ *********************** */
  /*delete data*/
  /************************************************************* */
  const deleteTaskHandler = async (id, title) => {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
      body: { title: title },
    });
    fetchDataTask();
  };

  //************************************ *********************** */
  /*handlers*/
  /************************************************************* */
  const handleEnter = async (e) => {
    e.preventDefault();
    addTask();
  };
  const addMemoText = async (e, id, data) => {
    e.preventDefault();
    updateTask(id, data);
  };
  return (
    <Box
      sx={{
        bgcolor: "#f59bdd",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          flexDirection: "column",
          bgcolor: "#221a21db",
          width: "400px",
          height: "fit-content",
          display: "flex",
          p: 2,
          margin: "20px auto",
          borderRadius: 2,
        }}
      >
        <Header />
        <Form
          todoItem={todoItem}
          setTodoItem={setTodoItem}
          handleEnter={handleEnter}
        />

        <Box>
          <List key={items.id} sx={{ width: "100%" }}>
            {tasks.map(({ id, title, memo, pinned, checked }) => {
              //************************************ *********************** */
              /*pinned items*/
              /************************************************************* */
              if (pinned) {
                return (
                  <ToDoList
                    id={id}
                    key={id}
                    title={title}
                    pinned={pinned}
                    checked={checked}
                    deleteTaskHandler={deleteTaskHandler}
                    addMemoText={addMemoText}
                    updateTask={updateTask}
                    memo={memo}
                    setMemoText={setMemoText}
                    memoText={memoText}
                    addMemoText={addMemoText}
                  />
                );
              }
            })}
            <hr />
            {tasks.map(({ id, title, memo, pinned, checked }) => {
              //************************************ *********************** */
              /*UnPinned items*/
              /************************************************************* */
              if (!pinned) {
                return (
                  <ToDoList
                    id={id}
                    key={id}
                    title={title}
                    pinned={pinned}
                    checked={checked}
                    deleteTaskHandler={deleteTaskHandler}
                    updateTask={updateTask}
                    memo={memo}
                    setMemoText={setMemoText}
                    memoText={memoText}
                    addMemoText={addMemoText}
                  />
                );
              }
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
