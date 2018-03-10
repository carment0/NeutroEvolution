# NeutroEvo
https://neutro-evo.herokuapp.com

This project implements two bio-inspired computing methods to create a white blood cell (WBC) artificial intelligence. Each generation of WBC evolves to optimize their ability to track and engulf bacteria within a red blood cell colonized environment.

### Screenshots
##### AI Simulation
![simulation]
##### About Page
![about]

[simulation]: ./images/1.png
[about]: ./images/0.png

## Installing
Clone this project into your local computer:

`git clone https://github.com/carment0/NeutroEvolution.git`

In the project directory run the following command to install all dependencies:

`npm install`

Next run the server:

`npm start server`

Open http://localhost:8000 to view the project in the browser

## Deployment
### Create the app
Using Heroku CLI tool, create an app
```
heroku create neutro-evo
```

Check if the app has been created
```
heroku apps --all
```

### Connect to Database
Go to Heroku.com and add Heroku:Postgres as an addon for free and then access database credentials through
```
heroku pg:credentials:url
```

I should be able to see the database name, host, user, password and port number.

In order to access the content of Postgres database, use `psql`
```
heroku pg:psql --app neutro-evo
```

Inside the `server.js` file, heroku injects an environment variable called `DATABASE_URL` and I am going to use that to
connect to PG when my program is deployed to Heroku.
```javascript
if (process.env.DATABASE_URL) {
  dbOptions = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  };
}

const client = new Postgres.Client(dbOptions);
```

### Seeds
Seed the databse with `seeds.sql`, do the following:
```
heroku pg:psql --app neutro-evo < seeds.sql
```

### Push it
```
git push heroku master
```

When the code is pushed, Heroku will run two commands for me. First it does `npm install` and installs all project dependencies
as node modules. In my `package.json`, I put in a `postinstall` option which allows webpack to run immediately after node
modules are installed. And then Heroku will run `npm start` and launch my server.

```
"start": "node server.js",
"postinstall": "npm run build",
"build": "webpack --config webpack.config.js",
```
