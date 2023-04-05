import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default {
  plugins: [react(), svgr(), Icons({
    compiler: "jsx",
    jsx: "react"
  })],
}