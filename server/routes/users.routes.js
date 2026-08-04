import { Router } from "express";

import authorise from "../middlewares/auth.middleware.js";

import { getUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', getUsers)

userRouter.get('/:id', authorise, getUser)

userRouter.post('/', (req, res) => res.send({title: 'Create a new user'}))

userRouter.put('/:id', (req, res) => res.send({title: 'Update user'}))

userRouter.delete('/:id', (req, res) => res.send({title: 'Delete user'}))

export default userRouter;