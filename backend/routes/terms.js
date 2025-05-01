// backend/routes/terms.js
import Terms from '../models/Terms.js';

export default async function (fastify, opts) {
  fastify.get('/api/terms', async (req, reply) => {
    const { lang } = req.query;
    const language = lang || 'en';

    try {
      const terms = await Terms.findAll({
        where: { language },
        order: [['id', 'ASC']],
      });

      if (!terms || terms.length === 0) {
        return reply.code(404).send({ error: 'No terms found for this language' });
      }

      return reply.send(terms);
    } catch (err) {
      console.error('❌ DB Fetch Error:', err);
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  });
}
