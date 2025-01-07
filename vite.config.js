import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
	host:  '10.1.10.44',
	port: 8443,
	https: {
	   key: fs.readFileSync('./10.1.10.44-key.pem'),
	   cert: fs. readFileSync('./10.1.10.44.pem')
	}
   }
})
