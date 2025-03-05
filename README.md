
#### To run the app on your local follow these steps:
#### Install Docker

Install [Docker Community Edition](https://hub.docker.com/search?q=&type=edition&offering=community)

- :apple: [macOS](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
- :penguin: [Linux](https://hub.docker.com/search/?type=edition&offering=community&operating_system=linux)
- 🪟 [Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)

#### To get the Client up and running on your dev machine:

1. `cd client`
2. `yarn install` (or `npm install`)
3. `yarn start` (or `npm start`)
4. If `yarn start` is throwing errors, you may need to run: `npm_config_yes=true npx yarn-audit-fix`

The client will be available at port 3000

#### To get the REST API up and running on your dev machine:

1. Start the Docker Desktop application on your computer. For Mac - Look for Docker Desktop in your Applications folder  and open it
2. Open new terminal window in the root directory of the project and `cd server`
3. `docker-compose up`

The server will be available at port 5001 and the database will be available at port 7482

### Rebuilding Docker Containers

If you install any new packages or add a new database migration file you'll want to rebuild the docker containers. To do so:

1. Stop your docker containers with `CMD + C` or `CTRL + C`
1. `docker-compose down`
1. `docker-compose up --build`
