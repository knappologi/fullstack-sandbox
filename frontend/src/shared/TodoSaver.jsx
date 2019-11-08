const listSaver = (listId, { todos }) => {
    console.log(listId);
    console.log(todos[0]);

    return fetch('http://localhost:3001/lists/update', {
        method: 'PUT',
        body: JSON.stringify({
            /*
            id: listId,
            todos: { todos }
            */
           id: 'wow'
        })
    }).then(response => console.log(response))}

export default listSaver;
  