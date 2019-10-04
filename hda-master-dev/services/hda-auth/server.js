const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = require('./src/app');

// Swagger
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(3000, () => {
    console.log('App running on port 3000.')
})
