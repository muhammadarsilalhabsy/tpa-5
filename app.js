const express = require('express');
const bodyParser = require('body-parser');
const allRoutes = require('./routes/index.js');
const db = require('./config/db.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(allRoutes);

db.then(() => {
  console.log('Success Connect MongoDB');
}).catch((e) => {
  console.log(e);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
