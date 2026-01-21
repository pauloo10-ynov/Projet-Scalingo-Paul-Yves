require('dotenv').config();
const app = require('./app');

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port
  // Changement de https en http pour le test local
  console.log('App listening at http://localhost:%s', port)
})