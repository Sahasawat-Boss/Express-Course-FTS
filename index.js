import express from 'express'
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

app.get('/todos', (req, res) => {
    console.log(todoList);
    res.send('Get all data:', todoList);
})

app.post('/todos', (req, res) => {
    console.log('body data', req.body);
    todoList.push(req.body);
    res.send(req.body);
})
// body data { id: 'test-1', status: 'in-progress', name: 'Task-1' }

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
