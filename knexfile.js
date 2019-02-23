// Update with your config settings.
const path = require('path');
const basePath = path.resolve(__dirname);

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: `${basePath}/data/lambda.sqlite3`
    },
    useNullAsDefault: true
  }
};
