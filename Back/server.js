'use strict'
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const properties = require('./config/properties')
const DB = require('./config/db')
const cors = require('cors')

DB();
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(cors());

app.use('/api', router);
authRoutes(router);
router.get('/', (req, res) => {
    res.send('Hello from home');
});

app.use(router);
app.listen(properties.PORT, () => console.log(`Server running on port ${properties.PORT}`));