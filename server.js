const app = require('./app');

// require and load dotenv
require('dotenv').config();


const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
    console.log(`The server is running on port ${port}`);
});