import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { format } from 'prettier';

export async function generateServiceFromSchema(serviceName: string) {
  // 读取模板
  const templatePath = join(__dirname, '../templates/service.template');
  const template = readFileSync(templatePath, 'utf-8');

  // 生成服务代码
  const serviceCode = template.replace(/{{serviceName}}/g, serviceName);

  // 格式化代码
  const formattedCode = await format(serviceCode, {
    parser: 'typescript',
    singleQuote: true,
    trailingComma: 'es5',
  });

  // 写入文件
  const outputPath = join(process.cwd(), `src/services/${serviceName}Service.ts`);
  writeFileSync(outputPath, formattedCode);
}