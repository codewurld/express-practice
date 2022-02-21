const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { "id": 1, "name": "Javascript" },
    { "id": 2, "name": "Python" }
]


app.get('/', (req, res) => {
    res.send("Hello there");
})

app.get('/api/courses', (req, res) => {
    res.send([1, 2, "DFS"]);
})

// app.get('/api/course/:year/:id', (req, res) => {
//     res.send(req.params);
// })

app.get('/api/course/:year/:id', (req, res) => {
    res.send(req.query);
})

app.get('/api/course/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) res.status(404).send("This course doesn't exist");
    res.send(course);

})

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);


})



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})