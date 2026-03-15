import { z } from 'zod';

import { projectSchema } from '@schema';

export type Project = z.infer<typeof projectSchema>;
