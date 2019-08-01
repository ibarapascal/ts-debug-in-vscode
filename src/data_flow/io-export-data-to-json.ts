/** Settings
package.json
{
    "dependencies": {
      "@types/node": "^12.6.8",
 */

import fs from 'fs';

let outputPath = "src/_test_data_source/test-output.json"
let outputData = {
    "data":[{
        "id":1,
        "value":1111,
        "name":"name1"
    },{
        "id":2,
        "value":2222,
        "name":"name2"
    },{
        "id":3,
        "value":3333,
        "name":"name3"
    }]
}

// Not work
// fs.writeFile(outputPath, JSON.stringify(outputData), () => {});

// OK
fs.writeFileSync(outputPath, JSON.stringify(outputData));