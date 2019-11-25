import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { TextField } from '../../shared/FormFields';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
});

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);

  const handleSubmit = event => {
    event.preventDefault();
    saveToDoList(toDoList.id, { todos });
  };

  /**
   * Sets if list is complete, check is done in backend too
   * @param {*} list the complete list
   * @param {*} todos collection of todos (text and if done)
   */
/*   const checkIfListComplete = (list, { todos }) => {
    list.done = true;
    todos.forEach(todoItem => {
      if (!todoItem.done) {
        list.done = false;
        console.log(JSON.stringify(list));
      }
    });
  }; */

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">{toDoList.title}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((todoItem, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant="h6">
                {index + 1}
              </Typography>

              <Checkbox
                checked={todoItem.done}
                disabled = {todoItem.text ? false : true} 
                onChange={() => {
                  // Do not allow todos to be done if empty
                    const updatedTodo = [
                      ...todos.slice(0, index),
                      { text: todoItem.text, done: !todoItem.done },
                      ...todos.slice(index + 1)
                    ];
                    setTodos(updatedTodo);
                    saveToDoList(toDoList.id, { todos: updatedTodo });
                    // checkIfListComplete(toDoList, { todos:updatedTodo })
                  }
                }
                color="primary"
              />

              <TextField
                label={todoItem.text.length > 0 ? '' : 'What to do?'}
                value={todoItem.text}
                fieldColor={todoItem.done ? '#dde4ff' : 'white'}
                onChange={event => {
                  const updatedTodo = [
                    ...todos.slice(0, index),
                    { text: event.target.value, done: false },
                    ...todos.slice(index + 1)
                  ];
                  setTodos(updatedTodo);
                  saveToDoList(toDoList.id, { todos: updatedTodo });
                }}
                className={classes.textField}
              />
              <Button
                size="small"
                color="secondary"
                className={classes.standardSpace}
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ]);
                  todos.splice(index, 1);
                  saveToDoList(toDoList.id, { todos });
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                // Creates new todo, empty text field and not done by default
                setTodos([...todos, { text: '', done: false }]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
