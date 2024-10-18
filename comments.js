// Create web server
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

// Set up the view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Set up the body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set up the static folder
app.use(express.static(path.join(__dirname, 'public')))

// Set up the comments array
let comments = []

// Set up the comments file path
const COMMENTS_FILE_PATH = path.join(__dirname, 'data/comments.json')

// Read the comments from the file
fs.readFile(COMMENTS_FILE_PATH, (err, data) => {
  if (err) {
    console.error(err)
  } else {
    comments = JSON.parse(data)
  }
})

// Render the comments page
app.get('/', (req, res) => {
  res.render('comments', {
    comments: comments
  })
})

// Add a comment
app.post('/add', (req, res) => {
  const comment = {
    name: req.body.name,
    message: req.body.message
  }
  comments.push(comment)
  fs.writeFile(COMMENTS_FILE_PATH, JSON.stringify(comments), (err) => {
    if (err) {
      console.error(err)
    }
  })
  res.redirect('/')
})

// Start the server
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})