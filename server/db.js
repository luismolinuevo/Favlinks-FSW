const Pool = require("pg").Pool;
const pool = new Pool({
  user: "user1",
  host: "localhost",
  database: "favlinks",
  password: "password",
  port: 5433,
});

const getLinks = (req, res) => {
  pool.query("SELECT * FROM favlinks ORDER BY id ASC", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

const insertLink = (req, res) => {
  const { name, url } = req.body;
  pool.query(
    "INSERT INTO favlinks (id, name, url) VALUES ($1, $2)",
    [name, url],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Link added with ID: ${result.insertId}`);
    }
  );
};

module.exports = {
  getLinks,
  insertLink,
};
