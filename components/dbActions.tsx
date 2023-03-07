import PocketBase from 'pocketbase';

// zwraca unikalną tablicę z bazy danych
export async function uniqueArray() {
	// const pb = new PocketBase('http://localhost:8090');
	const pb = new PocketBase(`http://${process.env.NEXT_PUBLIC_HOST}`);

	const resultList = await pb.collection('places').getList(1, 50);

	// tworzy unikalny array bazując na place_id
	const uniquePlaces = resultList.items.filter(
		(place, index, self) =>
			index ===
			self.findIndex((p) => p.dataDB.place_id === place.dataDB.place_id)
	);

	return uniquePlaces;
}

// funkcja do dodawania rekordu do db
export async function apiAdd(place: any) {
	if (place) {
		const response = await fetch('/api/add', {
			method: 'POST',
			body: JSON.stringify(place),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
	}
}
