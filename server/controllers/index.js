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
    findUserAppointments: (_, args, context, info) => {
      return context.prisma.query.timeIntervals(
        {
          where: {
            appointment: {
              user: {
                email: args.userEmail
              }
            }
          }
        },
        info
      );
    },
    findSitterAppointments: (_, args, context, info) => {
      return context.prisma.query.timeIntervals(
        {
          where: {
            appointment: {
              sitter: { user: { email: args.sitterEmail } },
              status: args.status
            }
          },
          orderBy: args.order
        },
        info
      );
    },
    findAppointments: (_, args, context, info) => {
      return context.prisma.query.timeIntervals(
        {
          where: {
            appointment: {
              status: 'Paid'
            }
          }
        },
        info
      );
    },
    findSitterReviews: (_, args, context, info) => {
      return context.prisma.query.appointments(
        {
          where: {
            AND: [
              {
                status: 'Paid'
              },
              {
                sitter: {
                  id: args.sitterId
                }
              }
            ]
          }
        },
        info
      );
    },

    findSitters: (_, args, context, info) => {
      let ANDConditions = [
        {
          day: args.day
        },
        {
          start_lte: args.start
        },
        {
          end_gte: args.end
        }
      ];

      if (args.baby) {
        ANDConditions.push({
          sitter: {
            rates: {
              child_rate_not: null
            }
          }
        });
      }
      if (args.pet) {
        ANDConditions.push({
          sitter: {
            rates: {
              pet_rate_not: null
            }
          }
        });
      }
      if (args.home) {
        ANDConditions.push({
          sitter: {
            rates: {
              home_rate_not: null
            }
          }
        });
      }
      return context.prisma.query.timeIntervals(
        {
          where: {
            AND: ANDConditions
          }
        },
        info
      );
    },
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
    },
    getSitterSchedule: (_, args, context, info) => {
      return context.prisma.query.timeIntervals(
        {
          where: {
            sitter: {
              id: args.id
            }
          }
        },
        info
      );
    },
    reviewModal: (_, args, context, info) => {
      return context.prisma.query.timeIntervals(
        {
          where: {
            OR: [
              {
                appointment: {
                  user: {
                    email: args.email
                  }
                }
              },
              {
                appointment: {
                  sitter: {
                    user: {
                      email: args.sitterEmail
                    }
                  }
                }
              }
            ]
          }
        },
        info
      );
    }
  },
  Mutation: {
    acceptAppointment: (_, args, context, info) => {
      return context.prisma.mutation.updateAppointment (
        {
          where : {
            id: args.apntID
          },
          data : {
            status : "Accepted"
          }
        },
        info
      );
    },
    rejectAppointment: (_, args, context, info) => {
      return context.prisma.mutation.updateAppointment (
        {
          where : {
            id: args.apntID
          },
          data : {
            status : "Rejected"
          }
        },
        info
      );
    },
    cancelAppointment: (_, args, context, info) => {
      return context.prisma.mutation.deleteAppointment(
        {
          where: {
            id: args.apntID
          }
        },
        info
      );
    },
    signup: (_, args, context, info) => {
      return context.prisma.mutation.createUser(
        {
          data: {
            email: args.email,
            first_name: args.first_name,
            last_name: args.last_name,
            address: args.address,
            long: args.long,
            lat: args.lat,
            rating: 0,
            pic_url: args.pic_url
          }
        },
        info
      );
    },
    createAppointment: (_, args, context, info) => {
      return context.prisma.mutation.createAppointment(
        {
          data: {
            user: {
              connect: {
                email: args.email
              }
            },
            sitter: {
              connect: {
                id: args.id
              }
            },
            pets: args.pets,
            children: args.children,
            price: args.price,
            comment: args.comment,
            app_types: {
              set: args.values
            },
            todoList: {
              connect: {
                id: args.todoList
              }
            },
            status: 'Pending',
            timeInterval: {
              create: {
                day: args.day,
                start: args.start,
                end: args.end
              }
            }
          }
        },
        info
      )
    },
    createSitter: (_, args, context, info) => {
      return context.prisma.mutation.createSitter(
        {
          data: {
            bio: args.bio,
            rates: {
              create: {
                child_rate: args.child_rate,
                child_addl: args.child_addl,
                pet_rate: args.pet_rate,
                pet_addl: args.pet_addl,
                home_rate: args.home_rate
              }
            },
            user: {
              connect: {
                email: args.email
              }
            },
            rating: 0
          }
        },
        info
      );
    },
    createSchedule: (_, args, context, info) => {
      return context.prisma.mutation.createTimeInterval(
        {
          data: {
            sitter: {
              connect: {
                id: args.id
              }
            },
            day: args.day,
            start: args.start,
            end: args.end
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
            address: args.address,
            long: args.long,
            lat: args.lat,
            pic_url: args.pic_url
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
                create: {
                  child_rate: args.child_rate,
                  child_addl: args.child_addl,
                  pet_rate: args.pet_rate,
                  pet_addl: args.pet_addl,
                  home_rate: args.home_rate
                }
              }
            }
          },
          where: { id: args.id }
        },
        info
      );
    },
    updateAppointment: (_, args, context, info) => {
      return context.prisma.mutation.updateAppointment(
        {
          data: {
            todoList: args.todoList,
            userRating: args.userRating,
            sitterRating: args.sitterRating,
            userReview: args.userReview,
            userWords: {
              set: args.userWords
            },
            sitterReview: args.sitterReview,
            status: args.status
          },
          where: {
            id: args.id
          }
        },
        info
      );
    },
    updateSchedule: (_, args, context, info) => {
      return context.prisma.mutation.updateManyTimeIntervals(
        {
          data: {
            start: args.start,
            end: args.end
          },
          where: {
            AND: {
              day: args.day,
              sitter: {
                id: args.id
              }
            }
          }
        },
        info
      );
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
      endpoint: 'http://ec2-18-188-233-74.us-east-2.compute.amazonaws.com:4466'
    })
  })
});

server.express.use(express.static(__dirname + '/../../client'));

server.start(options, ({ port }) =>
  console.log(`GraphQL server is running on http://localhost:${port}`)
);
