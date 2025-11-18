const { Pool } = require("pg");
<<<<<<< HEAD

// Use DATABASE_URL if available (for Render deployment)
const pool = new Pool(
  process.env.DATABASE_URL 
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: {
          rejectUnauthorized: false
        }
      }
);

module.exports = pool;
=======
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
>>>>>>> c2af40e68f6200fee22d77768f0fcbc5157a8105
