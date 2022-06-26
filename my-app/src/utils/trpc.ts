import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../backend/routes/index';

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}