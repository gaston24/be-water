# Be-Water Project

This project is a Node.js application that uses Express.js, Sequelize as an ORM, and MySQL with Docker.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/be-water.git
cd be-water

# Install dependencies
npm install

# ask for .env file

# run docker
docker-compose up -d

# run migrations
npx sequelize-cli db:migrate

# run seeders
npx sequelize-cli db:seed:all

# start app
npm run dev


