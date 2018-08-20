const express = require('express');
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const options = {
  port: 8080,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
};

const resolvers = {
  Query: {
    findUsers: (_, args, context, info) => {
      return context.prisma.query.users(
        {
          where: {
            email: args.email
          }
        },
        info
      );
    },
    getUserInfo: (_, args, context, info) => {
      return context.prisma.query.user(
        {
          where: {
            email: args.email
          }
        },
        info
      );
    }
  },
  Mutation: {
    signup: (_, args, context, info) => {
      return context.prisma.mutation.createUser(
        {
          data: {
            email: args.email,
            first_name: args.first_name,
            last_name: args.last_name,
            street_address: args.street_address,
            city: args.city,
            state: args.state,
            zip_code: args.zip_code,
            rating: 0
          }
        },
        info
      );
    },
    createList: (_, args, context, info) => {
      return context.prisma.mutation.createTodoList(
        {
          data: {
            user: {
              connect: {
                email: args.email
              }
            },
            name: args.name
          }
        },
        info
      );
    },
    updateUser: (_, args, context, info) => {
      return context.prisma.mutation.updateUser(
        {
          data: {
            first_name: args.first_name,
            last_name: args.last_name,
            street_address: args.street_address,
            city: args.city,
            state: args.state,
            zip_code: args.zip_code
          },
          where: {
            email: args.email
          }
        },
        info
      )
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './server/controllers/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: './server/controllers/generated/prisma.graphql',
      endpoint: 'http://ec2-34-203-9-237.compute-1.amazonaws.com:4466'
    })
  })
});

server.express.use(express.static(__dirname + '/../../client'));

server.start(options, ({ port }) =>
  console.log(`GraphQL server is running on http://localhost:${port}`)
);
