# Template Guidelines

This is a template for a simple RESTful API using Express and Knex.

## Migration Commands

Create a new migration file

```bash
npx knex migrate:make <migration-name> --migrations-directory db/migrations
```

Run the migration

```bash
npx knex migrate:latest --knexfile db/knexfile.js
```

Create a seed file

```bash
npx knex seed:make <seed-name> --cwd db
```

Run the seed

```bash
npx knex seed:run --knexfile db/knexfile.js
```

## Environment Variables

```env
PORT=<port>
DATABASE_URL=<database_url>
```
