const fs = require('fs');
const path = require('path');
const { printSchema } = require('graphql');
const schema = require('./index');

const generatedPath = './src/__generated__';
const schemaPath = path.resolve(`${generatedPath}/schema.graphql`);

if (!fs.existsSync(generatedPath)) {
  fs.mkdirSync(generatedPath);
}
fs.writeFileSync(schemaPath, printSchema(schema));

console.log('Updated schema ' + schemaPath);
