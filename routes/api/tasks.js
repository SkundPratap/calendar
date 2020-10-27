const router = require('express').Router();
let Task = require('../../models/Tasks');
const db = require('mongoose').db;

router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/add').post((req, res) => {
  console.log('Body', req.body);
  const username = req.body.username;
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const date = Date.parse(req.body.date);
  console.log('Username and etc', username,title,description,status,date);
  const newTask = new Task({
    username,
    title,
    description,
    status,
    date,
    reason,
  });

  newTask.save()
  .then(() => res.json('Task added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.username = req.body.username;
      task.title = req.body.title;
      task.description = req.body.description;
      task.status = req.body.status;
      task.date = Date.parse(req.body.date);
      task.reason = req.body.reason;

      task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;