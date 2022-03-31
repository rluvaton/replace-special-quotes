const fs = require('fs/promises');
const { execSync } = require('child_process');
const { default: faker } = require('@faker-js/faker');
const tmp = require('tmp');

const runCliCommand = 'node ./index.js';

describe('All', () => {
  describe('all data at once', () => {
    const { name: tmpFilePath } = tmp.fileSync({
      prefix: 'replace-special-quotes-test-',
      postfix: '.txt',
    });

    async function runCliAllInputAtOnce(input) {
      await fs.writeFile(tmpFilePath, input);

      // Writing to file and cat it as we don't want to escape characters
      const output = execSync(`cat "${tmpFilePath}" | ${runCliCommand}`);

      return output.toString();
    }

    afterEach(async () => {
      // Clean file
      await fs.writeFile(tmpFilePath, '');
    });

    afterAll(async () => {
      await fs.rm(tmpFilePath, { maxRetries: 3 });
    });

    it('should convert “<some-string>” to "<some-string>"', async () => {
      const someString = faker.lorem.text();
      const badString = `“${someString}“`;

      const cleanedString = await runCliAllInputAtOnce(badString);

      expect(cleanedString).toEqual(`"${someString}"`);
    });
  });
});
