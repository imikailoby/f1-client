// Transforming images to their path for testing. More info: https://jestjs.io/docs/code-transformation
const path = require('path');

module.exports = {
  process(sourcePath) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
};
