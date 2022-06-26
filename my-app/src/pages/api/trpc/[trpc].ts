import * as trpcNext from '@trpc/server/adapters/next';

import { appRouter } from '../../../backend/routes/index';
import { createContext } from '../../../backend/routes/context';


// export API handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: createContext,
  });
