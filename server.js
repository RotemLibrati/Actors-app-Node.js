const express = require('express');

const app = express();

app.use(express.json({ extended: false}));

app.use('/api/actors', require('./api/routers/actors-router'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));