import express, { request } from 'express'
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

const port = 3000

// TODO list
// create todo
// update todo by id
// delete todo by id
// get todo by id
//=====================
// id
// status = completed, in-progress, canceled
// name

const todoList = [];
// body data { id: '1', status: 'in-progress', name: '1' }

app.get('/todos', (req, res) => {
    console.log(todoList);
    res.json({
        data: todoList
    });
});

// GET by ID
app.get('/todos/:id', (req, res) => {
    const todo = todoList.find((todo) => todo.id === req.params.id)

    if (todo) {
        res.send(todo)
    }

    res.status(404).send("Todo not found")
});

app.post('/todos/bulk', (req, res) => {
    console.log('body data', req.body);
    todoList.push(...req.body);
    res.send(req.body);
})

app.post('/todos', (req, res) => {
    console.log('body data', req.body);
    todoList.push(req.body);
    res.send(req.body);
})

app.delete('/todos/:id', (req, res) => {
    const todoIndex = todoList.findIndex((todo) => todo.id === req.params.id);

    if (todoIndex === -1) {
        res.status(404).send("Todo not found")
        return
    }

    // remove and store the deleted item
    const deletedTodo = todoList.splice(todoIndex, 1)[0];

    console.log('Delete data successful:', deletedTodo);

    res.json({
        message: "Todo deleted successfully",
        deleted: deletedTodo
    });
})


//* Actually we have a better and shorter step for bulk todo
app.delete('/todos', (req, res) => {
    const listIds = req.query.in?.split(',') || [];

    if (listIds.length === 0) {
        return res.status(400).json({ message: "No IDs provided in query" });
    }

    const deletedTodos = [];

    // Loop backwards to safely remove by index while iterating
    for (let i = todoList.length - 1; i >= 0; i--) {
        if (listIds.includes(todoList[i].id)) {
            const [deleted] = todoList.splice(i, 1);
            deletedTodos.push(deleted);
        }
    }

    console.log('Deleted todos:', deletedTodos);

    res.json({
        message: `${deletedTodos.length} todo(s) deleted`,
        deleted: deletedTodos
    });
});

app.patch('/todos/:id', (req, res) => {
    const todoIndex = todoList.findIndex((todo) => todo.id === req.params.id);

    if (todoIndex === -1) {
        res.status(404).send("Todo not found")
        return
    }

    // Destructuring:  Merge new data into the existing todo
    todoList[todoIndex] = { ...todoIndex[todoIndex], ...req.body }

    res.json({
        message: "Todo updated successfully",
        updated: todoList[todoIndex]
    });
})

app.put('/todos/:id', (req, res) => {
    const todoIndex = todoList.findIndex((todo) => todo.id === req.params.id);

    if (todoIndex === -1) {
        res.status(404).send("Todo not found")
        return
    }

    // PUT Override no merge
    todoList[todoIndex] = req.body;

    res.json({
        message: "Todo updated successfully",
        updated: todoList[todoIndex]
    });
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
