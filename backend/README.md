# flow-generated-backend

This is an auto-generated backend API project using Express.js and Prisma. The project provides a CRUD API for multiple entities and optional authentication features.

## Prerequisites

Before setting up the project, make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/) (Choose one)
- [Prisma](https://www.prisma.io/) CLI for database migrations and management.

---

## Getting Started

### 1. Install Dependencies

Install the necessary Node.js packages by running:

```bash
npm install
```

Or if you're using Yarn:

```bash
yarn install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root of the project directory. You can base it on the provided `.env.example` file.

```bash
cp .env.example .env
```

Make sure to update the following variables in the `.env` file:

- `DATABASE_URL`: Your database connection string. If you're using a Dockerized PostgreSQL database, it might look like this:

```
DATABASE_URL="postgresql://user:password@some-project-id:5432/mydb"
```

- `JWT_SECRET`: The secret key for signing JWT tokens.

Example `.env` file:

```env
DATABASE_URL="mongodb://user:password@localhost:5432/mydb"
JWT_SECRET="your_secret_key_here"
```

### 3. Set Up the Database (MongoDB)

After you database is set up, run the Prisma migrations to initialize your database:

```bash
npx prisma generate
```

This will create the necessary tables based on the defined Prisma schema.

### 4. Start the Development Server

Once everything is set up, you can start the development server with the following command (you'll need `nodemon` for this [`npm i -g nodemon`]):

```bash
npm run dev
```

Or, if using Yarn:

```bash
yarn dev
```

By default, the server will run at `http://localhost:3000`.

### 5. Prisma Studio (Optional)

If you want to manage your database records via a visual interface, you can use Prisma Studio:

```bash
npx prisma studio
```

### 6. Run in Production

To run the app in production, start the app:

```bash
npm start
```

Or, using Yarn:

```bash
yarn start
```

## API Routes

The generated backend provides the following CRUD routes for the entities:

- `GET /api/{entity}`: Fetch all records of a given entity
- `POST /api/{entity}`: Create a new record for a given entity
- `PUT /api/{entity}/:id`: Update a specific record by ID
- `DELETE /api/{entity}/:id`: Delete a specific record by ID

> Authentication may be required for some routes if the `auth` option is enabled.

### User Authentication Routes

If authentication was enabled, additional routes for user management will be available:

- `POST /api/user/signup`: Sign up a new user
- `POST /api/user/login`: Log in an existing user
- `GET /api/user/getMe`: Get the details of the authenticated user (requires JWT)

### Authentication Middleware

If your project has authentication enabled, the generated code uses JWT-based authentication and an `authMiddleware` to protect routes. Make sure the `JWT_SECRET` is set in your `.env` file for token generation and validation.

## Testing the API

To test your API, you can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

For example:

- To fetch all records of an entity, send a `GET` request to `http://localhost:3000/api/{entity}`.
- For authentication routes, send a `POST` request to `http://localhost:3000/api/user/signup` or `http://localhost:3000/api/user/login` with `email` and `password` in the request body.

## Migrations and Prisma

When you modify your database schema in `prisma/schema.prisma`, apply the changes using:

```bash
npx prisma migrate dev --name migration_name
```

This will generate the necessary migration files and update your database schema.

## Scripts

- `npm run dev` - Start the development server
- `npm start` - Start production server
- `np prisma generate` - Generate tables for given schema
- `npx prisma migrate dev` - Run Prisma migrations for development
- `npx prisma studio` - Open Prisma Studio to manage database records visually

## Deployment

To deploy the project to production, you'll need to set up your environment variables for production, ensure your database is accessible. Then use a service like [Render](https://render.com/) or deploy the project to [Railway](https://railway.app/).
