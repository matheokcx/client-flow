# Boilerplate for web application development

*This template has the goal to make more fast my application development process, to evitate to have to set-up a lot of things like Auth or Database / ORM etc.*

## The stack: 

- NextJS 15 (App router)
    - ReactJS 19
    - TailwindCSS 3.4
    - TypeScript
    - NodeJS 
- Prisma (avec PostgreSQL 15)
- AuthJS
- Docker (optional)

## 🚀 Setup of a project 🚀:

1. Clone the repository: `git clone https://github.com/matheokcx/template.git`.
2. Copy and config the `.env.local` file with the `.env.example` file.
3. Install the dependencies: `npm install`.
4. Generate the Auth service key: `npx auth secret`.
5. Create the first migration and generate the database: `npm run db:deploy`.
6. Start the development server and enjoy: `npm run dev`.

(Docker only)

7. Create the docker container and launch it: `docker-compose -f docker-compose.yml up --build -d`.
