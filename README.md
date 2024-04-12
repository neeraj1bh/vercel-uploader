# Project: Vercel Uploader

## Overview

- **Easy File Upload**: Quickly upload files up to 5MB to Vercel with just one click.
- **Seamless Integration**: Connect with external services during upload initiation, success, and failure.
- **Size Limit Check**: Notify users with a popup if files exceed 5MB before uploading.
- **File Handling**: After uploading, view and manage your files: download, rename, or delete them.
- **Visual Feedback**: See a loading animation while files are loading, with a slight delay for effect.


### Live Demo

[Click here to see it live](https://blobs.nb9t7.com/)

<img alt="Vercel Uploader" src="https://github.com/neeraj1bh/vercel-uploader/assets/55753068/2145b9d2-5e2f-4e2d-9d45-f727cef12f72">


## Tech Stack

- **Frontend**: Next.js [14] using AppRouter and Server Actions, React, Tailwind CSS, Shadcn
- **Backend**: Neon PostgreSQL, Prisma

## Installation and Usage

```bash
git clone https://github.com/neeraj1bh/vercel-uploader.git
cd vercel-uploader
pnpm i
pnpm dev
```

## Getting Started

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `pnpm i`.
3. Navigate to the scripts folder and run the .sh file using the command `./scripts/start-database.sh` to start the database on Docker locally.
4. Once the database is started, execute the command `pnpm db:push` to apply migrations and start the application locally using Prisma.
5. Run the development server using `pnpm dev`.
6. Access the application in your browser at `http://localhost:3000`.


## Learn More

For more information about the project and its components, please refer to the documentation and learning resources provided in the project's README file.

## Deployment

Follow the deployment guides provided in the project's documentation for deploying the application on Vercel.
