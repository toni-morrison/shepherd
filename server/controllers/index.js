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
    findTodoLists: (_, args, context, info) => {
      return context.prisma.query.todoLists(
        {
          where: {
            user: {
              email: args.email
            }
          }
        },
        info
      );
    },
    findInstructions: (_, args, context, info) => {
      return context.prisma.query.instructions(
        {
          where: {
            list_id: {
              id: args.id
            }
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
            name: args.name,
            startTime: args.startTime,
            endTime: args.endTime
          }
        },
        info
      );
    },
    updateListName: (_, args, context, info) => {
      return context.prisma.mutation.updateTodoList(
        {
          data: {
            name: args.name,
            startTime: args.startTime,
            endTime: args.endTime
          },
          where: {
            id: args.id
          }
        },
        info
      );
    },
    createInstruction: (_, args, context, info) => {
      return context.prisma.mutation.upsertInstruction(
        {
          where: {
            id: args.id
          },

          create: {
            time: args.time,
            desc: args.desc,
            list_id: {
              connect: {
                id: args.list_id
              }
            }
          },
          update: {
            desc: args.desc
          }
        },
        info
      );
    },
    deleteInstructions: (_, args, context, info) => {
      return context.prisma.mutation.deleteManyInstructions(
        {
          where: {
            list_id: {
              id: args.id
            }
          }
        },
        info
      );
    },
    deleteTodo: (_, args, context, info) => {
      return context.prisma.mutation.deleteTodoList(
        {
          where: {
            id: args.id
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
            zip_code: args.zip_code,
          },
          where: {
            email: args.email
          }
        },
        info
      );
    },
    updateSitter: (_, args, context, info) => {
      return context.prisma.mutation.updateSitter(
        {
          data: {
            bio: args.bio,
            rating: args.rating,
            rates: {
              upsert: {
                update: {
                  child_rate: args.child_rate,
                  child_addl: args.child_addl,
                  pet_rate: args.pet_rate,
                  pet_addl: args.pet_addl,
                  home_rate: args.home_rate
                },
                create:{
                  child_rate: args.child_rate,
                  child_addl: args.child_addl,
                  pet_rate: args.pet_rate,
                  pet_addl: args.pet_addl,
                  home_rate: args.home_rate
                }
              }
            }
          },
          where: {
            id: args.id
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
