const base = import.meta.env.BASE_URL;

export interface Engine {
	id: string;
	name: string;
	logo: string;
	buildUrl: (imageUrl: string) => string;
	enabledByDefault: boolean;
}

export const engines: Engine[] = [
	{
		id: 'google-lens',
		name: 'Google Lens',
		logo: `${base}logos/google-lens.svg`,
		buildUrl: (url) => `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(url)}`,
		enabledByDefault: true
	},
	{
		id: 'google-factcheck',
		name: 'Google Fact Check',
		logo: `${base}logos/google-factcheck.svg`,
		buildUrl: (url) => `https://toolbox.google.com/factcheck/explorer/search/image_url:${encodeURIComponent(url)}`,
		enabledByDefault: false
	},
	{
		id: 'bing',
		name: 'Bing Visual Search',
		logo: `${base}logos/bing.svg`,
		buildUrl: (url) => `https://www.bing.com/images/search?q=imgurl:${encodeURIComponent(url)}&view=detailv2&iss=sbi`,
		enabledByDefault: true
	},
	{
		id: 'yandex',
		name: 'Yandex Images',
		logo: `${base}logos/yandex.png`,
		buildUrl: (url) => `https://yandex.com/images/search?url=${encodeURIComponent(url)}&rpt=imageview`,
		enabledByDefault: true
	},
	{
		id: 'tineye',
		name: 'TinEye',
		logo: `${base}logos/tineye.png`,
		buildUrl: (url) => `https://tineye.com/search?url=${encodeURIComponent(url)}`,
		enabledByDefault: true
	},
];
