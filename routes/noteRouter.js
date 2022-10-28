const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');
const util = require('util')

const readFromFile = util.promisify(fs.readFile)


// Post request
notes.post('/api/notes', (req, res) => {
        console.info(`${req.method} request recieved to post a new note`)

        const { note } = req.body;

        if(note) {
            const newNote = {
                note,
                note_id: uuid()
            }
        

        const noteString = JSON.stringify(newNote);
        
        fs.readFile(`../db/db.json`, 'utf8', (err, data) => {
        if(err) {
          console.log(err);
        } else {
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote)
        }
        fs.writeFile(`../db/db.json`, noteString, (err) => err ? console.error(err) : console.log(`New note added!`))
        
        })
        } else{
            res.status(200)
            console.log('OK')
        }
  });

// Get Request
notes.get(`/api/notes`, (req, res) => {
    console.info(`${req.method} request recieved for notes`)

    readFromFile('./db/db.json')
        .then((data) => { 
            res.json(JSON.parse(data))
    });
});


module.exports = notes;