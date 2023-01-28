import { join } from 'node:path';
import { environmentStage } from './environment-stage.config';

export const environmentFilePath = join(
  process.cwd(),
  `.env.${environmentStage}`
);
