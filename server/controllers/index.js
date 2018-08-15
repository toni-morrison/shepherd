const express = require('express');
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const app = express();

app.use(express.static(__dirname, 'public'));


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on port: ', port));
