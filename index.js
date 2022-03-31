#!/usr/bin/env node

const args = process.argv.splice(2);

if (args.some((arg) => arg === '-h' || arg === '--help')) {
  console.log(
    `Usage: <output some text> | replace-special-quotes
- Replace “”„ with "
- Replace ‘’‚ with '

   Flags:
      -h, --help: print this help

   Usage example:
      Pipe text:
         $ echo 'bad string: “ ' | replace-special-quotes
         bad string: " 

      Pipe file content:
         $ # my-file.txt content: '{ “why-mac-why“: true }'
         $ cat my-file.txt | replace-special-quotes
         '{ "why-mac-why": true }'
`,
  );

  process.exit(0);
}

process.stdin.on('data', (data) => {
  process.stdout.write(
    data
      // Force prettier to keep it multiline
      .toString()

      // Replace left and right double quote and double low-9 quote with regular quotes
      .replace(/[“”„]/g, '"')

      // Replace left and right single quote and single low-9 quote with regular single quotes
      .replace(/[‘’‚]/g, "'"),
  );
});
