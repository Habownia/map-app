async function getThings() {
	// const db = new PocketBase('http://127.0.0.1:8090');
	// const result = await db.records.getList('notes');
	const res = await fetch(
		'http://127.0.0.1:8090/api/collections/posts/records?page=1&perPage=30',
		{ cache: 'no-store' }
	);
	const data = await res.json();
	return data?.items as any[];
}

export default async function Home() {
	const photos = await getThings();

	const p = photos?.map((note) => {
		return (
			<>
				<h1>{note.name}</h1>
				<h2>Lokacja: {note.place}</h2>
				<img
					src={`http://127.0.0.1:8090/api/files/${note.collectionName}/${note.id}/${note.field}?thumb=100x300}`}
				/>
			</>
		);
	});

	return (
		<div>
			<h1>Zdjęcia</h1>
			<div>{p}</div>
		</div>
	);
}
