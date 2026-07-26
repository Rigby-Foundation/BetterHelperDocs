import { createConventionSiteServer } from '@rigbyhost/karui/ssr/site-server';

createConventionSiteServer({
  port: Number(process.env.PORT ?? 4173),
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
