# Payload Blog Starter

Exploring Payload CMS by building a modern blog with Next.js and PostgreSQL.

---

## About

This repository is a learning and exploration project for Payload CMS. The goal is to understand how Payload works by building a real blog template with a modern stack.

### Tech Stack

- Payload CMS 3
- Next.js App Router
- PostgreSQL
- pnpm
- Tailwind CSS
- shadcn/ui
- Lexical rich text editor

---

## Features

- Payload admin panel
- PostgreSQL database adapter
- Blog posts collection
- Categories collection
- Tags collection
- Media uploads
- Author relationship
- Draft and publish workflow
- Auto-generated slug
- Auto-filled published date
- SEO metadata fields
- Blog listing page
- Blog detail page
- Rich text rendering
- Tailwind Typography for article content
- Small admin UI customization

---

## Getting Started

### Prerequisites

Make sure you have installed:

```bash
node -v
pnpm -v
```

> This project uses **pnpm** as the package manager.

---

## Installation

Install dependencies:

```bash
pnpm install
```

Create your environment file:

```bash
cp .env.example .env
```

Then update the database connection in `.env`:

```env
DATABASE_URL=postgres://postgres:<your-password>@localhost:5432/learn_payload
PAYLOAD_SECRET=your-secret-key
```

Adjust the username, password, host, port, and database name based on your local PostgreSQL setup.

---

## Development

Start the development server:

```bash
pnpm dev
```

Open the application:

```txt
http://localhost:3000
```

Open the Payload admin panel:

```txt
http://localhost:3000/admin
```

On the first visit, create your first admin user.

---

## Project Structure

```txt
src/
├─ app/
│  ├─ (frontend)/
│  │  ├─ blog/
│  │  │  ├─ [slug]/
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ styles.css
│  └─ (payload)/
├─ collections/
│  ├─ Categories.ts
│  ├─ Media.ts
│  ├─ Posts.ts
│  ├─ Tags.ts
│  └─ Users.ts
├─ components/
├─ lib/
└─ payload.config.ts
```

---

## Collections

### Users

Auth-enabled users that can access the Payload admin panel. Users can also be used as post authors.

### Media

Upload-enabled collection for images and other media assets.

### Posts

Main blog content collection.

Includes:

- title
- slug
- excerpt
- hero image
- content
- category
- tags
- author
- published date
- SEO metadata
- draft/publish status

### Categories

Used to group posts by main topic.

Example:

- Tutorial
- News
- Opinion

### Tags

Used to label posts with multiple topics.

Example:

- Payload
- Next.js
- PostgreSQL

---

## Useful Scripts

Start development server:

```bash
pnpm dev
```

Build the project:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

Generate Payload types:

```bash
pnpm generate:types
```

Generate Payload import map:

```bash
pnpm generate:importmap
```

Run lint:

```bash
pnpm lint
```

---

## Learning Goals

This project is mainly created to learn and explore:

- how Payload CMS collections work
- how relationships work in Payload
- how Payload stores rich text content
- how to use Payload with PostgreSQL
- how to query Payload data in Next.js server components
- how to build frontend pages from CMS content
- how draft and publish workflows work
- how to customize Payload admin styles
- how to structure a reusable blog starter

---

## Notes

This project is still part of an exploration process. Some implementation details may change as I continue learning Payload CMS and improving the blog template.

---

## License

MIT
