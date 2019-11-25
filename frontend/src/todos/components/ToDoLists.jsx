import React, { Fragment, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import { ToDoListForm } from "./ToDoListForm";
import axios from "axios";
import lodash from "lodash";

const fetchLists = () => {
  return axios
    .get("http://localhost:3001/lists")
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

// The func is invoked with the last arguments provided to the debounced function.

const updateLists = (listId, { todos }) => {
  axios
    .put("http://localhost:3001/lists/update", {
      id: listId,
      todos: todos
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};
const debounceUpdate = lodash.debounce(updateLists, 1000);

const checkIfListIsDone = toDoList => {
  const isTodoDone = currentTodo => currentTodo.done;

  return toDoList.todos.every(isTodoDone);

  /*
  let listIsDone = true;
  toDoList.todos.forEach(todo => {
    if (!todo.done) {
      listIsDone = false;
    }
  });
  return listIsDone; */
};

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();

  useEffect(() => {
    fetchLists().then(setToDoLists);
    // fetchLists().then((result) => setToDoLists(result));
  }, []);

  if (!Object.keys(toDoLists).length) return null;
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component="h2">My ToDo Lists</Typography>
          <List>
            {Object.keys(toDoLists).map(key => (
              <ListItem
                key={key}
                button
                onClick={() => {
                  setActiveList(key);
                }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText
                  primary={toDoLists[key].title}
                  // Strike through list title if all items are done
                  style={{
                    textDecoration: checkIfListIsDone(toDoLists[key])
                      ? "line-through"
                      : "none"
                  }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {toDoLists[activeList] && (
        <ToDoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          toDoList={toDoLists[activeList]}
          saveToDoList={(id, { todos }) => {
            debounceUpdate(id, { todos });
            // updateLists(id, { todos });
            const listToUpdate = toDoLists[id];
            setToDoLists({
              ...toDoLists,
              [id]: { ...listToUpdate, todos }
            });
          }}
        />
      )}
    </Fragment>
  );
};
