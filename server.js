const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Tell Node to serve all your files (HTML, CSS, JS) from the current folder
app.use(express.static(__dirname)); 


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'app', 'page.js'));
});

app.listen(PORT, () => {
    console.log(`Success! Your Health Calc is running at http://localhost:${PORT}`);
});