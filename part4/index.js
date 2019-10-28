const mongoose = require('mongoose');
const app = require('./app');
const config = require('./utilities/config');

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(`${error} - connection failed`));
mongoose.set('useFindAndModify', false);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
