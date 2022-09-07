import express from 'express'
import { uuid } from 'uuidv4'
import { check, validationResult } from 'express-validator';


const router = express.Router()

let validateRegisterUser = () => {
    return [
        check('firstName', 'firstName does not Empty').not().isEmpty(),
        check('lastName', 'lastName do not Empty').not().isEmpty(),
        check('age', 'age is number').isNumeric(),
    ];
}

let users = [
    {
        id: uuid(),
        firstName: "Quy",
        lastName: "Chu",
        age: 25
    },
    {
        id: uuid(),
        firstName: "Khanh",
        lastName: "Nguyen",
        age: 2
    }
]

// all routes in here are starting with /users

//GET
router.get('/', (req, res) => {

    res.send(users)
})

//POST
router.post('/', validateRegisterUser(), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    const user = req.body;
    users.push({
        id: uuid(), ...user
    })

    res.json(user)
})

//DELETE USER BY ID
router.delete('/:id', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    const user = req.params;

    const index = users.findIndex((item) => item.id === user.id)

    users.splice(index, 1)

    // res.send("Delete user successfuly")
    res.json(users)
})

// DELETE ALL USER
router.delete('/', (req, res) => {
    users = []
    res.json(users)
})

// GET DETAIL USER
router.get('/:id', (req, res) => {
    const user = req.params;
    const userDetail = users.find((item) => item.id === user.id)

    res.json(userDetail)
})

// UPDATE DETAIL USER
router.put('/:id', (req, res) => {

    const { id } = req.params || {}

    const userUpdate = users.find((item) => item.id === id)

    const newUser = { ...userUpdate, ...req.body } || {}

    const filterUser = users.filter((item) => item.id !== id)
    const newUsers = [...filterUser, newUser]

    users = newUsers

    res.json(users)

})

export default router