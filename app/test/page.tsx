import PocketBase from 'pocketbase';
import { uniqueArray } from '@/components/dbActions';

export default async function Test() {
	// tworzy unikalny array bazując na place_id
	const uniquePlaces = await uniqueArray();

	const placesNames = uniquePlaces.map((elem) => {
		return (
			<div key={elem.id}>
				<p>{elem.dataDB.display_name}</p>
			</div>
		);
	});

	return (
		<div>
			<h1>Zdjęcia</h1>
			{placesNames}
		</div>
	);
}
