/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "utfs.io",
			},
		],
	},
	module: {
		rules: [
		  { test: /\.ts$/, loader: "ts-loader" },  
		  { test: /\.node$/, use: "node-loader"}
		]
	  }
};

module.exports = nextConfig;
