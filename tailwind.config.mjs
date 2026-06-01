/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                navy: '#0a1d33',
                midnight: '#061525',
                orange: '#ff6a00',
                offwhite: '#f7f8fa',
                'cool-white': '#fbfcfd',
                steel: '#617182',
                tech: '#e6ebf1',
                'border-mist': '#d8e0e8',
                ink: '#071a2f',
            },
            fontFamily: {
                heading: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
                body: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
            }
        },
	},
	plugins: [],
}
