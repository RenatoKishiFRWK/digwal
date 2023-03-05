const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const carteiraRoutes = require('./routes/carteiraRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/carteira', carteiraRoutes);
//app.use('/carteira', carteiraRoutes);


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
