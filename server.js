const express = require('express');
const cors = require('cors');

const app = express();


app.listen(8000, () => {
    console.log('Serveur démarré (port 8000)');
});