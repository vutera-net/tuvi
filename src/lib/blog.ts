import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  content: string // HTML
}

export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
}

function getSlug(filename: string) {
  return filename.replace(/\.md$/, '')
}

export function getAllPostsMeta(): BlogPostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: getSlug(filename),
        title: data.title as string,
        excerpt: data.excerpt as string,
        date: data.date as string,
        category: (data.category as string) ?? '',
        tags: (data.tags as string[]) ?? [],
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1)) // newest first
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filepath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)

  const html = marked(content) as string

  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    category: (data.category as string) ?? '',
    tags: (data.tags as string[]) ?? [],
    content: html,
  }
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map(getSlug)
}
