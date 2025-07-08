import type {APIRoute} from 'astro';

export const GET: APIRoute = async ({locals}) => {
	const {DB} = locals.runtime.env;

	if (!DB) {
		return new Response('Database not found', {status: 404});
	}

	try {
		const result = await DB.prepare('SELECT * FROM employees').all();
		return new Response(JSON.stringify(result), {
			headers: {'Content-Type': 'application/json'},
		});
	} catch (error) {
		return new Response(`Error: ${error}`, {status: 500});
	}
};
