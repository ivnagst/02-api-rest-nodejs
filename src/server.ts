import fastify from 'fastify';
import { knexSetup } from './database';

const app = fastify();

app.get('/hello', async () => {
	const tables = await knexSetup('sqlite_schema').select('*');

	return tables;
});

app
	.listen({
		port: 8080,
	})
	.then(() => {
		console.log('HTTP Server Running ');
	});
