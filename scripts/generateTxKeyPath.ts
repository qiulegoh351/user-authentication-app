import fs from 'fs';
import path from 'path';

const inputDir = path.resolve(__dirname, '../app/i18n/en');
const outputFile = path.resolve(__dirname, '../app/i18n/tx-key-path.ts');

function flatten(obj: Record<string, any>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return flatten(value, fullKey);
    } else {
      return [fullKey];
    }
  });
}

function generate() {
  const files = fs.readdirSync(inputDir).filter((f) => f.endsWith('.json'));

  const allKeys: string[] = [];

  for (const file of files) {
    const ns = path.basename(file, '.json'); // namespace = filename
    const content = JSON.parse(fs.readFileSync(path.join(inputDir, file), 'utf-8'));
    const keys = flatten(content).map((k) => `'${ns}:${k}'`);
    allKeys.push(...keys);
  }

  const result = `
// 🚨 AUTO-GENERATED FILE. DO NOT EDIT.
// Run "yarn generate-tx-keys" to regenerate.

export type GeneratedTxKeyPath =
  | ${allKeys.join('\n  | ')};
`;

  fs.writeFileSync(outputFile, result.trim() + '\n');
  console.log(`✅ Generated: ${outputFile}`);
}

generate();
