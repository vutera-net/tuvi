import { defineConfig } from 'prisma/config'
import * as fs from 'fs'
import * as path from 'path'

// Load .env and .env.local for Prisma CLI
function loadEnvFile(filename: string) {
  const filePath = path.join(process.cwd(), filename)
  if (!fs.existsSync(filePath)) return
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnvFile('.env')
loadEnvFile('.env.local')

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
})
