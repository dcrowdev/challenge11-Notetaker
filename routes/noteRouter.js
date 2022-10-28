const notes = require('express').Router();
const uuid = require('./helpers/uuid');
const fs = require('fs');



notes.post('/api/notes', (req, res) => {
        console.info(`${req.method} request recieved to get reviews`)

        const { note } = req.body;

        if(note) {
            const newNote = {
                note,
                note_id: uuid()
            }
        }


        fs.readFile(`../db/db.json`, 'utf8', (err, data) => {
        if(err) {
          console.log(err);
        } else {
            const parsedNotes = JSON.parse(data);

        }
})


})





module.exports = notes;