import Router from 'express';

const categoryRouter = Router();

categoryRouter.get('/', (req, res) => res.send({title: 'Get all categories'}))

categoryRouter.get('/:id', (req, res) => res.send({title: 'Get category details'}))

categoryRouter.post('/', (req, res) => res.send({title: 'Create a new category'}))

categoryRouter.put('/:id', (req, res) => res.send({title: 'Update category'}))

categoryRouter.delete('/:id', (req, res) => res.send({title: 'Delete category'}))

categoryRouter.get('/:id/products', (req, res) => res.send({title: 'Get products by category ID'}))

export default categoryRouter;