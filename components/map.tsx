import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

import { myIcon, ChangeView, getPosition } from './mapComponents';

import { place } from '../types/mapTypes';

import style from '../sass/MapLoader.module.scss';

export default function Map({ placesArray }: any) {
	const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
	const [zoom, setZoom] = useState<number>(12);

	// z każdą zmianą placesArray wyśrodkowywuje mapę na ostatni element
	useEffect(() => {
		setPosition(getPosition(placesArray[placesArray.length - 1]));
		setZoom(10);
	}, [placesArray]);

	function showData(position: any) {
		alert(position);
	}

	if (placesArray) {
		var markers = placesArray.map((elem: place) => {
			return (
				<Marker
					key={elem.place_id}
					icon={myIcon}
					position={getPosition(elem)}
					eventHandlers={{
						click: (e) => {
							setPosition(getPosition(elem));
							setZoom(12);
							// showData(getPosition(elem));
						},
					}}
				>
					<Tooltip>{`${elem.display_name.split(', ')[0]}`}</Tooltip>
				</Marker>
			);
		});
	}

	return (
		<MapContainer className={style.map_container} center={[55, 44]} zoom={6}>
			{placesArray && <ChangeView center={position} zoom={zoom} />}
			<TileLayer
				attribution='&copy; <a href="https:/trzycierz.tk">Trzycierz</a> fr'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{markers}
		</MapContainer>
	);
}
