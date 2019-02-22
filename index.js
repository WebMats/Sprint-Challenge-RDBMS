const express = require('express');
const helmet = require('helmet');

const app = express();


app.use(helmet());
app.use(express.json());


const actionRouter = require('./routes/action');
const projectRouter = require('./routes/project');

app.use('/actions', actionRouter);
app.use('/projects', projectRouter);




app.listen(4000, () => {console.log('Listening on port 4000...')})