const express = require('express')
const app = express();
const api = require('./routes/noteRouter')
const path = require('path')


const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded( {extended: true}));

app.use(express.static('public'))
app.use('/api', api)

// Get for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// Get for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})











app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));