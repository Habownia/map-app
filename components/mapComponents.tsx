import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import leaflet from 'leaflet';

import style from '../sass/MapLoader.module.scss';
import icon from '../public/favicon.ico';

import { place } from '../types/mapTypes';

// ikonka
export const myIcon = new leaflet.Icon({
	iconUrl: icon.src,
	popupAnchor: [-0, -0],
	iconSize: [16, 16],
});

// zmienia widok centruje na wpisanym miejscu
export function ChangeView({ center, zoom }: any) {
	const map = useMap();
	map.setView(center, zoom);
	return null;
}

export function getPosition(elem: place): any {
	return elem?.lat && elem.lon ? [elem.lat, elem.lon] : [55, 22];
}

// export function MapLoader() {
// 	const [dots, setDots] = useState('');

// 	useEffect(() => {
// 		const timer = setInterval(() => {
// 			setDots((prevState: string) => {
// 				if (prevState.length >= 3) {
// 					return '';
// 				}
// 				return `${prevState}.`;
// 			});
// 		}, 800);
// 		return () => clearInterval(timer);
// 	}, []);

// 	return (
// 		<div className={`${style.loader} ${style.map_container}`}>
// 			<p>Loading</p>
// 		</div>
// 	);
// }
