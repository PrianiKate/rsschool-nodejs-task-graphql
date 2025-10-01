import { PrismaClient } from '@prisma/client';
import {
  memberTypeLoader,
  postLoader,
  profileLoader,
  userLoader,
} from './dataLoaders.js';

export interface PrismaContext {
  prisma: PrismaClient;
  loaders: {
    memberTypeLoader: typeof memberTypeLoader;
    userLoader: typeof userLoader;
    postLoader: typeof postLoader;
    profileLoader: typeof profileLoader;
  };
}
