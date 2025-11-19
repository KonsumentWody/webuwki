const express = require('express')

const app = express()

app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.use('/categories', require('./routes/categories'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
