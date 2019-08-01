/** Settings
package.json
{
  "devDependencies": {
    "typescript": "^2.9.2"
tsconfig.json
{
    "compilerOptions": {
        "resolveJsonModule": true,
        "esModuleInterop": true
*/

import data from '../_test_data_source/import-data-from-json-test.json';

interface testDataObject {
    id: number;
    value: number;
    name: string;
}

let importData: testDataObject[] = data.data;

for (let item of importData) {
    console.log(item);
}
