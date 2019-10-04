# RUN SEQUELIZE-CLI

### To run scripts inside the container
> sudo docker exec -ti hda-auth /bin/sh

### To run desired sequelize-cli commands on container db using direct node_modules
> node_modules/.bin/sequelize db:migrate --env "$NODE_ENV"

or

### To run desired sequelize-cli commands on container db just my using npx
> npx sequelize-cli db:migrate



# REFAZER A DB, MIGRAÇÕES, SEEDS E MODELS -> 25/09/2019
# DESCOBRIR UM VALIDADOR COMO DEVE SER