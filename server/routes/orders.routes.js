import { Router } from "express";

const orderRouter = Router();

orderRouter.get('/', (req, res) => res.send({title: 'Get all orders'}))

orderRouter.get('/:id', (req, res) => res.send({title: 'Get order details'}))

orderRouter.post('/', (req, res) => res.send({title: 'Create a new order'}))

orderRouter.put('/:id', (req, res) => res.send({title: 'Update order'}))

orderRouter.delete('/:id', (req, res) => res.send({title: 'Delete order'}))

orderRouter.get('/user/:id', (req, res) => res.send({title: 'Get orders by user ID'}))

orderRouter.put('/:id/cancel', (req, res) => res.send({title: 'Cancel order'}))

orderRouter.get('/:id/status', (req, res) => res.send({title: 'Get order status'}))

export default orderRouter;