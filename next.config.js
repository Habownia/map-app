/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
	experimental: {
		appDir: true,
	},
	output: 'standalone',
	sassOptions: {
		includePaths: [path.join(__dirname, 'sass')],
	},
};

module.exports = nextConfig;
