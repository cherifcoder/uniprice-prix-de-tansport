const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI_LOCAL, {
    });
    console.log(` MongoDB connecté : ${conn.connection.host}`);
  } catch (err) {
    console.error(` Erreur de connexion MongoDB : ${err.message}`);
    process.exit(1); // Arrête l'app si la connexion échoue
  }
};

module.exports = connectDB;
 