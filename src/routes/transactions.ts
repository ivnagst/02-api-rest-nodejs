import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import knex from 'knex';

export async function transactionsRoutes(app: FastifyInstance) {
	app.post('/', async (request, reply) => {
		try {
			const createTransactionBodySchema = z.object({
				title: z.string(),
				amount: z.number(),
				type: z.enum(['credit', 'debit']),
			});

			const { title, amount, type } = createTransactionBodySchema.parse(request.body);

			await knex('transactions').insert({
				id: randomUUID(),
				title,
				amount: type === 'credit' ? amount : amount * -1,
			});

			return reply.status(201).send('Transação realizada!');
		} catch (error) {
			throw new Error(`Um erro foi capiturado: ${error}`);
		}
	});
}
