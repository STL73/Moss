import { Router } from "express";

const productRouter = Router();

productRouter.get('/', (req, res) => res.send({title: 'Get all products'}))

productRouter.get('/:id', (req, res) => res.send({title: 'Get product details'}))

productRouter.post('/', (req, res) => res.send({title: 'Create a new product'}))

productRouter.put('/:id', (req, res) => res.send({title: 'Update product'}))

productRouter.delete('/:id', (req, res) => res.send({title: 'Delete product'}))

productRouter.get('/category/:id', (req, res) => res.send({title: 'Get products by category ID'}))

productRouter.get('/:id/availability', (req, res) => res.send({title: 'Get product availability'}))

export default productRouter;