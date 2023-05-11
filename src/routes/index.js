const { Router } = require('express');
//llamando a los controladores
const { getUsers, createUser, getUserById, deleteUserById,editUser } =require('../controllers/index.controller')

const router = Router();

router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.delete('/users/:id', deleteUserById)
router.post('/users', createUser)
router.put('/users/:id', editUser)

module.exports = router