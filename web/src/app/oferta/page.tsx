import fs from 'node:fs'
import path from 'node:path'

export const metadata = { title: 'Договор-оферта — Романенко учит' }

export default function OfertaPage() {
  const mdPath = path.join(process.cwd(), 'public', 'oferta.md')
  const content = fs.readFileSync(mdPath, 'utf8')
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 prose prose-invert">
      <article dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
    </main>
  )
}


