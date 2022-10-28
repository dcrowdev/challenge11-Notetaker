const express = require('express')
const app = express();
const notes = require('./routes/noteRouter')
const path = require('path')

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('public'))



// Get for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// Get for notes page
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})













app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));