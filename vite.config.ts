import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Mocker from 'unplugin-mock/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

function resolve(dir: string) {
	return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const ENV = loadEnv(mode, process.cwd())

	return {
		plugins: [
			vue(),

			// https://github.com/antfu/unplugin-auto-import
			AutoImport({
				imports: ['vue', '@vueuse/core']
			}),

			// https://github.com/antfu/vite-plugin-components
			Components({
				// relative paths to the directory to search for components.
				dirs: ['src/components'],

				// valid file extensions for components.
				extensions: ['vue'],

				// search for subdirectories
				deep: true,
				resolvers: [ElementPlusResolver()]
			}),

			Mocker({
				mockPath: './mock',
				enable: true
			})
		],
		resolve: {
			alias: {
				'@': resolve('./src')
			}
		},
		server: {
			host: '127.0.0.1',
			port: 3000,
			open: true,
			https: false,
			proxy: {
				'/api': {
					target: ENV.VITE_API_URL || 'https://some-api-url',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, '/api'),
					secure: false
				}
			}
		},

		// https://github.com/vitest-dev/vitest
		test: {
			environment: 'jsdom'
		}
	}
})
