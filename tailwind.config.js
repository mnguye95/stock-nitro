/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
		extend: {
			colors: {
				'magic-mint' : '#acfcd9',
				'purple-gray' : '#1c0f36',
				'blue-green' : '#559CAD',
				'bittersweet' : '#F97068'
			},
			gridTemplateRows: {
			  '7': 'repeat(7, minmax(0, 1fr))'
			}
		},
		fontFamily: {
			'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
			'bungee': ['"Bungee"', 'sans-serif']
		},
		boxShadow: {
			'rb' : '3px 3px 0 #fff'
		}
	},
  plugins: [],
}

