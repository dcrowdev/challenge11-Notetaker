const express = require('express')
const app = express();


const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('public'))














app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));