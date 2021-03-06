// db initialization
require("dotenv").config();
const { connect } = require("mongoose");

module.exports = async () => {

  /// db and models setup
  const dbHost = process.env.DB_HOST,
    dbName = process.env.DB_NAME,
    user = process.env.DB_USER,
    pass = process.env.DB_PASS;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  try {
      
    await connect(dbHost, {
      dbName,
      user,
      pass,
      ...options,
    }).then(() => { console.log('connected')});

  } catch (error) {
    console.error(error.message);
  }

};

//db.createUser({ user: 'ru', pwd: 'NJT61wJvjrGtTT1H', roles: [{ role: 'readWrite', db: 'portfolio' }] });
