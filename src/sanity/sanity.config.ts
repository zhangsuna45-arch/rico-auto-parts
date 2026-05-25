import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemas } from './schemas';
import { dataset, projectId } from './env';

export default defineConfig({
  name: 'rico-auto-parts',
  title: 'Rico Auto Parts CMS',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2024-05-24' }),
  ],
  schema: {
    types: schemas,
  },
  basePath: '/studio',
});
