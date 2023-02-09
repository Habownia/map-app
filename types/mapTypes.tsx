export type place = {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: number;
	boundingbox: string[];
	lat: string;
	lon: string;
	display_name: string;
	class: string;
	type: string;
	importance: number;
	address:
		| {
				house_number: string;
				village: string;
				municipality: string;
				county: string;
				state: string;
				'ISO3166-2-lvl4': string;
				postcode: string;
				country: string;
				country_code: string;
		  }
		| undefined;
};
