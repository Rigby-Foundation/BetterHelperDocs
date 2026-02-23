import { createConventionSiteServer } from 'better-helperjs/ssr/site-server';

createConventionSiteServer({
  port: Number(process.env.PORT ?? 4173),
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
