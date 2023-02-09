import { NextApiRequest, NextApiResponse } from 'next';
import PocketBase from 'pocketbase';

async function AddtoDB(req: NextApiRequest, res: NextApiResponse) {
	const pb = new PocketBase('http://127.0.0.1:8090');
	if (req.method === 'POST') {
		const data = req.body;
		// przy tworzeniu trzeba zprecyzować nazwę
		const record = await pb.collection('places').create({ dataDB: data });
		res.status(201).json({ message: 'Data insterted' });
	}
}

export default AddtoDB;

// Beta
// https://beta.nextjs.org/docs/data-fetching/api-routes

//OG
// https://nextjs.org/docs/api-routes/introduction
