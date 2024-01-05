const express = require('express');
const cors = require('cors');

const databaseRoute = require('./routes/databaseRoute')
const moteurRoute = require('./routes/moteurRoute')
const app = express();

app.use(express.json())
app.use(cors())

app.use('/database', databaseRoute)
app.use('/moteur', moteurRoute)

app.listen(8000, () => {
    console.log('Serveur démarré (port 8000)');
});