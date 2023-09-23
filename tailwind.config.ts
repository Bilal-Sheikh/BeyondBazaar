import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw"; // Import the withUt function

// const config: Config = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic':
//           'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//     },
//   },
//   plugins: [],
// }
// export default config

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			// Extend your theme here with additional styles from "uploadthing/tw"
			// For example:
			// colors: {
			//   'brand-blue': 'var(--brand-blue-color)',
			//   // Add more custom colors as needed
			// },
			// typography: {
			//   // Add typography styles if provided by "uploadthing/tw"
			// },
		},
	},
	plugins: [],
};

// Use the withUt function to wrap your Tailwind CSS configuration
export default withUt(config);
