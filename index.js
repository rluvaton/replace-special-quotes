#!/usr/bin/env node

const args = process.argv.splice(2);

if (args.some((arg) => arg === '-h' || arg === '--help')) {
  console.log(
    `Usage: <output some text> | replace-special-quotes

   Flags:
      -h: print this help

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
  process.stdout.write(data.toString().replace(/[“”]/g, '"'));
});
