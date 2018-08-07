const app = require('./app');

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
    console.log(`The server is running on port ${port}`);
});