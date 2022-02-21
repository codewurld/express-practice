const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
    { "id": 1, "name": "Javascript" },
    { "id": 2, "name": "Python" }
]

const validateCourse = (course) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    })

    return schema.validate(course);
}

app.get('/', (req, res) => {
    res.send("Hello there");
})


// app.get('/api/course/:year/:id', (req, res) => {
//     res.send(req.params);
// })

app.get('/api/course/:year/:id', (req, res) => {
    res.send(req.query);
})

// get all courses
app.get('/api/courses/', (req, res) => {

    // if (!course) res.status(404).send("This course doesn't exist");
    res.send(courses);

})

// get single course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("This course doesn't exist");
    res.send(course);
})

app.post('/api/courses', (req, res) => {
    // input validation
    const { error } = validateCourse(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

// update
app.put('/api/courses/:id', (req, res) => {
    // find course
    const course = courses.find(course => course.id === parseInt(req.params.id));

    if (!course) return res.status(404).send("Course doesn't exist")

    // validate course
    const { error } = validateCourse(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    // update course
    course.name = req.body.name;
    res.send(course)

})

app.delete('/api/courses/:id', (req, res) => {
    // find course
    const course = courses.find(course => course.id === parseInt(req.params.id));

    if (!course) return res.status(404).send("Course doesn't exist")


    // delete course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course)
})



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})