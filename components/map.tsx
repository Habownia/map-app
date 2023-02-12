import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import { place } from '../types/mapTypes';

import { myIcon, ChangeView, getPosition } from './mapComponents';

export default function Map({ placesArray }: any) {
	if (placesArray) {
		var markers = placesArray.map((elem: place) => {
			return (
				<Marker
					key={elem.place_id}
					icon={myIcon}
					position={getPosition(elem)}
				/>
			);
		});
	}

	return (
		<MapContainer
			style={{ height: '400px', width: '700px' }}
			center={[55, 44]}
			zoom={6}
		>
			{placesArray && (
				<ChangeView
					center={getPosition(placesArray[placesArray.length - 1])}
					zoom={10}
				/>
			)}
			<TileLayer
				attribution='&copy; <a href="https:/trzycierz.tk">Trzycierz</a> fr'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{markers}
		</MapContainer>
	);
}
