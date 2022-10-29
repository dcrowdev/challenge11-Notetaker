const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');
const util = require('util')
const readFromFile = util.promisify(fs.readFile)
const writeToFile = util.promisify(fs.writeFile)

// Post request
notes.post('/', (req, res) => {
    console.info(`${req.method} request recieved to post a new note`)
    readFromFile('./db/db.json', 'utf-8')
        .then((data) => {
            var notesArr = JSON.parse(data);
            const { title, text } = req.body;
            const newNote = {
                title,
                text,
                id: uuid()
            }
            const newNoteArr = [...notesArr, newNote]
            writeToFile('./db/db.json', JSON.stringify(newNoteArr))
                .then(() =>
                    res.json({ msg: 'OK' }))
                .catch(err => res.status(400).json({ msg: `Could not post note.` }))
        });
});

// Get Request
notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved for notes`)
    readFromFile('./db/db.json', 'utf-8')
        .then((data) => {
            res.json(JSON.parse(data))
        });
});

// Delete request
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request recieved for notes`);
    readFromFile('./db/db.json', 'utf-8')
        .then((data) => {
            var oldNotes = [].concat(JSON.parse(data));
            var updatedNotes = oldNotes.filter(note => note.id !== req.params.id)
            writeToFile('./db/db.json', JSON.stringify(updatedNotes))
                .then(() => res.json({ msg: 'OK' }))
                .catch(err => res.status(400).json({ msg: `No note with the id ${req.params.id}` }))
        });

});


module.exports = notes;