const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');
const util = require('util')
const notesArr = require('../db/db.json')

const readFromFile = util.promisify(fs.readFile)


// Post request
notes.post('/', (req, res) => {
        console.info(`${req.method} request recieved to post a new note`)

        const note = req.body;

        const newNote = {
                title: req.body.title,
                text: req.body.text,
                note_id: uuid()
            }

        if (!note) {

            return res.status(400).json({ msg: 'Please write a note'})
        
        } else {
            notesArr.push(newNote)
            res.json(notesArr)
        }

        // const noteString = JSON.stringify(newNote);
        
        // fs.readFile('./db/db.json', 'utf8', (err, data) => {
        // if(err) {
        //   console.log(err);
        // } else {
        //     const parsedNotes = JSON.parse(data);
        //     parsedNotes.push(newNote)
        // }
        // fs.appendFile('./db/db.json', noteString, (err) => err ? console.error(err) : console.log(`New note added!`))

  });

// Get Request
notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved for notes`)
    readFromFile('./db/db.json')
        .then((data) => { 
            res.json(JSON.parse(data))
    });
});

// Delete request
notes.delete('/:note_id', (req, res) => {
    console.info(`${req.method} request recieved for notes`);
    const noteFound = notesArr.some(note => note.note_id === parseInt(req.params.note_id));

    if (noteFound) {
        res.json(notesArr.filter(note => note.note_id !== parseInt(req.params.note_id)))
    } else {
        res.status(400).json({ msg: `No note with the id ${req.params.note_id}`})
    }
})


module.exports = notes;