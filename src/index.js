const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');

const db = require('./config/db');

// connect to db
db.connect();

const app = express();
const port = 3000;

// HTTP logger
app.use(morgan('combined'));

const route = require('./routes/index');

app.engine(
    '.hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));
app.use(express.json());

// Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
