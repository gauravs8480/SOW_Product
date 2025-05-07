// backend/routes/pricelist.js
import PriceList from '../models/PriceList.js';

export default async function (fastify, opts) {
  // GET: Fetch all price list items
  fastify.get('/api/pricelist', async (req, reply) => {
    try {
      const items = await PriceList.findAll({ order: [['id', 'ASC']] });
      reply.send(items);
    } catch (err) {
      console.error(err);
      reply.status(500).send({ error: 'Failed to fetch price list' });
    }
  });

  // PUT: Update a price list item by ID
  fastify.put('/api/pricelist/:id', async (req, reply) => {
    const { id } = req.params;
    const data = req.body;

    try {
      const item = await PriceList.findByPk(id);
      if (!item) return reply.status(404).send({ error: 'Item not found' });

      await item.update(data);
      reply.send(item);
    } catch (err) {
      console.error(err);
      reply.status(500).send({ error: 'Failed to update item' });
    }
  });
}
