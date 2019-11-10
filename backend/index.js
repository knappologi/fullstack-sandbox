const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const PORT = 3001;

let toDoLists = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    done: false,
    todos: [{ text: 'First todo of first list!', done: false }]
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    done: false,
    todos: [{ text: 'First todo of second list!', done: false }]
  },
  '0000000003': {
    id: '0000000003',
    title: 'Bonus List',
    done: false,
    todos: [{ text: 'First todo of bonus list!', done: false }]
  }
};

app.get('/', (req, res) => res.send('Hello cuties!'));

app.get('/lists', (req, res) => res.send(toDoLists));

/**
 * Post to all lists
 */
app.post('/lists', (req, res) => {
  toDoLists[req.body.id].todos = req.body.todos;
  res.send('Got the new lists, thank you!');
});

/**
 * Update to all lists
 */
app.put('/lists/update', (req, res) => {
  const listId = req.body.id;
  checkIfListComplete(req.body.todos, toDoLists[listId]);
  toDoLists[listId].todos = req.body.todos;
  res.send('Got the lists and will update, thank you!');
});

const checkIfListComplete = (todoList, list) => {
  list.done = true;
  todoList.forEach(todoItem => {
    if (!todoItem.done) {
      list.done = false;
    }
  });
};

app.listen(PORT, () =>
  console.log(`Hello cuties! Todo-list now on port ${PORT}!`)
);
