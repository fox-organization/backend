import { ConfigModuleOptions } from '@nestjs/config';
import { environmentFilePath } from './environment-file-path.config';
import { environmentSchema } from './environment';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: [environmentFilePath],
  validationSchema: environmentSchema,
  validationOptions: { allowUnknown: true, abortEarly: true },
};
