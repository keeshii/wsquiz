var app = require('./server/app');

app.loadStatic(__dirname + '/public');
app.loadWsHandlers();
app.loadQuizes();

app.listen();
