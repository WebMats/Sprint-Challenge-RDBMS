const express = require('express');
const helmet = require('helmet');

const app = express();


app.use(helmet());
app.use(express.json());





app.listen(4000, () => {console.log('Listening on port 4000...')})