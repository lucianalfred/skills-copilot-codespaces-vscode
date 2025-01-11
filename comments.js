// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create web server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set port
const port = 3000;
// Set path to comments.json
const commentsPath = path.join(__dirname, 'comments.json');
//  
app.get('/comments', (req, res) => {
    fs.readFile(commentsPath, (err, data) => {
        if (err) {
        res.status(500).send('Error reading comments.json');
        } else {
        res.send(data);
        }
    });
    }
);
app.post('/comments', (req, res) => {
    fs.readFile(commentsPath, (err, data) => {
        if (err) {
        res.status(500).send('Error reading comments.json');
        } else {
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
            if (err) {
            res.status(500).send('Error writing comments.json');
            } else {
            res.send('Comment added');
            }
        });
        }
    });
    }
);
// Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
