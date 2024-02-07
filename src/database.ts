import knex from 'knex';

export const knexSetup = knex({
	client: 'sqlite',
	connection: {
		filename: './tmp/app.db',
	},
});
