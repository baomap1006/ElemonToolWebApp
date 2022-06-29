// import { createReactQueryHooks } from '@trpc/react';
// import type { AppRouter } from '../backend/routes/index';

// export const trpc = createReactQueryHooks<AppRouter>();
// // => { useQuery: ..., useMutation: ...}

// import { createReactQueryHooks } from '@trpc/react';
// import type { AppRouter } from '../pages/api/trpc/[trpc]';

// export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}

import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../pages/api/trpc/[trpc]';

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}