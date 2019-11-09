const listUpdate = (listId, { todos }) => {
  return fetch('http://localhost:3001/lists/update', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: listId,
      todos: todos
    })
  }).then(response => console.log(response));
};

export default listUpdate;
