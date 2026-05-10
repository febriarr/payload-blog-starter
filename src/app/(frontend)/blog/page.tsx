import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles and insights on various topics.',
}

export default async function BlogPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 12,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20 ">
      <header className="mb-12">
        <p className="mb-2 text-sm font-medium uppercase tracking-normal text-muted-foreground">
          Blog
        </p>

        <h1 className="text-4xl font-bold tracking-normal md:text-6xl">Latest Articles</h1>
      </header>

      <section className="grid auto-rows-fr divide-x divide-y border border-border md:grid-cols-2 lg:grid-cols-3">
        {posts.docs.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="block h-full">
            <article className="grid h-full min-h-72 grid-rows-[auto_4rem_3rem_1fr_auto] bg-card p-6 text-card-foreground shadow-sm transition-colors hover:bg-muted">
              <div className="mb-4 flex w-full items-center justify-between gap-4">
                <p className="text-sm font-medium text-primary">
                  {typeof post.category === 'object' ? post.category?.name : ''}
                </p>

                <p className="shrink-0 text-sm font-medium text-muted-foreground">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : ''}
                </p>
              </div>

              <h2 className="line-clamp-2 text-2xl font-semibold leading-tight tracking-normal">
                {post.title}
              </h2>

              <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>

              <div />

              <p className="text-sm text-muted-foreground">
                {typeof post.author === 'object' ? post.author?.name : ''}
              </p>
            </article>
          </Link>
        ))}
      </section>
    </div>
  )
}
