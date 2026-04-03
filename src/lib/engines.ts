import { base } from '$app/paths';

export interface Engine {
	id: string;
	name: string;
	logo: string;
	buildUrl: (imageUrl: string) => string;
}

export const engines: Engine[] = [
	{
		id: 'google-lens',
		name: 'Google Lens',
		logo: `${base}/logos/google-lens.svg`,
		buildUrl: (url) => `https://www.google.com/searchbyimage?sbisrc=cr_1_5_2&image_url=${encodeURIComponent(url)}`,
	},
	{
		id: 'yandex',
		name: 'Yandex Images',
		logo: `${base}/logos/yandex.png`,
		buildUrl: (url) => `https://yandex.com/images/search?url=${encodeURIComponent(url)}&rpt=imageview`,
	},
	{
		id: 'tineye',
		name: 'TinEye',
		logo: `${base}/logos/tineye.png`,
		buildUrl: (url) => `https://tineye.com/search?url=${encodeURIComponent(url)}`,
	},
];
