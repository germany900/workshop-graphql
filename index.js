const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
let puerto = 3200;


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))



app.listen(puerto, () => {
    console.log(`Corriendo en el puerto ${puerto}`);
});