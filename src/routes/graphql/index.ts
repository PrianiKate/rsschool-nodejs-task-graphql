import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { schema } from './types/schema.js';
import depthLimit from 'graphql-depth-limit';

const DEPTH_LIMIT = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const depthLimitRule = validate(schema, parse(query), [depthLimit(DEPTH_LIMIT)]);

      if (depthLimitRule.length > 0) {
        return {
          errors: depthLimitRule,
        };
      }

      const result = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma },
      });

      return result;
    },
  });
};

export default plugin;
