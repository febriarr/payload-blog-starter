import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Metadata } from 'next'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
  })

  const post = posts.docs[0]

  if (!post) {
    return {
      title: 'Post not found',
    }
  }

  const title = post.meta?.title || post.title
  const description = post.meta?.description || post.excerpt
  const image = typeof post.meta?.image === 'object' ? post.meta.image : post.heroImage

  const imageUrl = typeof image === 'object' && image?.url ? image.url : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: imageUrl
        ? [
            {
              url: imageUrl,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Args) {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
  })

  const post = posts.docs[0]

  if (!post) {
    notFound()
  }

  return (
    <article className="container p-4! md:p-8! lg:p-20! border border-border relative">
      <div className="absolute inset-0 z-0 w-full h-full grid grid-cols-3 divide-x divide-dashed pointer-events-none">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="z-10">
        <header className="mb-12">
          <p className="mb-4 text-sm font-medium text-center text-muted-foreground">
            {typeof post.category === 'object' ? post.category?.name : ''}
          </p>

          <h1 className="mb-6 text-center text-4xl font-bold leading-tight tracking-normal  md:text-6xl">
            {post.title}
          </h1>

          <p className="text-lg leading-8 text-muted-foreground text-center">
            {typeof post.author === 'object' ? post.author?.name : ''}
          </p>
        </header>

        <div className="prose prose-invert max-w-none prose-headings:tracking-normal prose-a:text-primary prose-blockquote:border-primary">
          <RichText data={post.content} />
        </div>
      </div>
    </article>
  )
}
