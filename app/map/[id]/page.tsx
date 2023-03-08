// import PocketBase from 'pocketbase';

import { dbPlace } from '../../../types/mapTypes';

export const dynamicParams = false;

async function getData(id: any) {
	// // const id = 308499148;
	// const pb = new PocketBase(`http://${process.env.NEXT_PUBLIC_HOST}`);
	// const record = await pb
	// 	.collection('places')
	// 	.getFirstListItem(`dataDB.place_id=${id}`);
	// // .getFirstListItem(`dataDB.place_id=308499148`);
	// return record as dbPlace;

	// nwm czemu z sdk nie śmiga ale an tym już tak
	const res = await fetch(
		`http://${process.env.NEXT_PUBLIC_HOST}/api/collections/places/records?page=1&perPage=1&filter=dataDB.place_id=${id}`,
		{ cache: 'no-store' }
	);
	const data = await res.json();
	return data.items[0];
}

async function getWeather(lat: string, lon: string) {
	const res = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${
			lat || 52.52
		}&longitude=${lon || 13.41}&hourly=temperature_2m`
	);
	return await res.json();
}

export default async function PlacesId({ params }: any) {
	// Zaokrąla liczbę do 4 miejsca po przecinku
	const toFourth = (data: string) => parseFloat(data).toFixed(4);

	const place: dbPlace = await getData(params.id);

	const lat = toFourth(place.dataDB.lat);
	const lon = toFourth(place.dataDB.lon);
	const weather = await getWeather(lat, lon);
	console.log(weather.hourly);

	// weather.hourly.time.forEach((elem: any, index: any) => {
	// 	//TODO dodać chartJS
	// 	console.log(elem);
	// 	console.log(weather.hourly.temperature_2m[index]);
	// });
	return (
		<div>
			<p>{place.dataDB.display_name.split(', ')[0]}</p>
		</div>
	);
	// return <div></div>;
}
