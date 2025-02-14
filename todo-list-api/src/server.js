const app = require('./app');
const dbConnection = require('./db.js');

const { PORT } = require('./config.js');

dbConnection();
app.listen(PORT)
console.log('Server on port', PORT);