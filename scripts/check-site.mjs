import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const failures = [];

for (const required of [
  '<html lang="en">',
  'name="viewport"',
  'name="description"'
]) {
  if (!html.includes(required)) failures.push(`Missing required document metadata: ${required}`);
}

const localReferences = [...html.matchAll(/(?:src|href)=["']([^"'#]+)["']/g)]
  .map((match) => match[1])
  .filter((reference) => !/^(https?:|mailto:|tel:|data:)/.test(reference));

for (const reference of new Set(localReferences)) {
  if (!existsSync(resolve(root, reference))) failures.push(`Missing local asset: ${reference}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Checked ${localReferences.length} local references successfully.`);
