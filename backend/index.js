const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json());

const PORT = 3001

let toDoLists = {
    "0000000001": {
        id: "0000000001",
        title: "First List",
        todos: ["First todo of first list!"]
    },
    "0000000002": {
        id: "0000000002",
        title: "Second List",
        todos: ["First todo of second list!"]
    },
    "0000000003": {
        id: "0000000003",
        title: "Bonus List",
        todos: ["First todo of bonus list!"]
    }
}

app.get('/', (req, res) => res.send('Hello cuties!'))

app.get('/lists', (req, res) => res.send(toDoLists))

/**
 * Post to all lists
 */
app.post('/lists', (req, res) => {
    toDoLists[req.body.id].todos = req.body.todos;
    res.send('Got lists!');
});

/**
 * Update to all lists
 */
app.put('/lists/update', (req, res) => {
    toDoLists[req.body.id].todos = req.body.todos;
    res.send('Got lists!');
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
