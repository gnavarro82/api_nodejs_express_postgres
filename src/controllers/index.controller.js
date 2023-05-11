//conexion a postgress
const { Pool } = require("pg");

//obteniendo la conexion a postgres
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "navarro",
  database: "firstapi",
  port: "5432",
});

//obtener lista de usuarios
const getUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  console.log(response.rows); //datos
  /*datos que llegan con req.body
  [
  { id: 1, name: 'joe', email: 'joe@ibm.com' },
  { id: 2, name: 'ryan', email: 'ryan@faztweb.com' }
]
  */
  res.status(200).json(response.rows);
};

//guardar usuarios
const createUser = async (req, res) => {
  const { name, email } = req.body
  const response = await pool.query("INSERT INTO users(name, email) VALUES($1, $2)", [name, email]);
  console.log(req.body); //datos
  res.json({
    message: 'Usuario agregado con exito',
    body: {
      user: { name, email }
    }
  });
};


//buscar usuario por id
const getUserById = async (req, res) => {
  const id = req.params.id
  const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  res.json(response.rows)
};

//eliminar usuario por id
const deleteUserById = async (req, res) => {
  const id = req.params.id
  const response = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  console.log(response)
  res.json('user ] eliminado')
};

//editar  usuario 
const editUser = async (req, res) => {
  //necesitamos todos los datos
  const id = req.params.id
  const { name, email } = req.body
  const response = await pool.query("UPDATE users SET name = $1, email = $2  WHERE id = $3", [name, email, id]);
  console.log(response)
  res.json('user editadpo')
};

//exportando los metodos del crud
module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUserById,
  editUser
};
