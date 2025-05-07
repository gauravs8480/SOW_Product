// backend/routes/terms.js
import Terms from '../models/Terms.js';

export default async function termsRoutes(app) {
  app.get('/api/terms', async (req, reply) => {
    try {
      const { lang } = req.query;
      const terms = await Terms.findAll({
        where: { language: lang },
        order: [['id', 'ASC']],
      });

      reply.send(terms);
    } catch (err) {
      console.error('❌ DB Fetch Error:', err);
      reply.status(500).send({ message: 'Error fetching terms' });
    }
  });
}
