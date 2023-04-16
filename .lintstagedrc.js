const path = require('path')

const eslintCheckAndFix = (filenames) => {
  const relativeFiles = filenames
    .map((f) => path.relative(process.cwd(), f))
  
  const command = relativeFiles.join(' --file ');
  return `next lint --fix --file ${command}`
}

module.exports = {
  "*.{ts,tsx}": [
    eslintCheckAndFix,
    "npm run test:staged"
  ],
  "*.css": [
    "npm run lint:styles:fix"
  ]
}
