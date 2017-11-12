const { createConnection } = require('mysql');

const connection = createConnection({
    database: 'xml_db',
    user: 'root',
    password: '',
    port: 3306,
    host: 'localhost'
})

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection
