import { generateServiceFromSchema } from '../utils/serviceGenerator';
import { generateTypesFromSchema } from '../utils/typeGenerator';

export async function generateService(options: any) {
  try {
    if (options.service) {
      await generateServiceFromSchema(options.service);
      console.log(`Generated service: ${options.service}`);
    }

    if (options.type) {
      await generateTypesFromSchema();
      console.log('Generated TypeScript types');
    }
  } catch (error) {
    console.error('Generation failed:', error);
    process.exit(1);
  }
}