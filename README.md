
# gridsome-plugin-query2file

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

Run queries on the Gridsome GraphQL data layer and write each result to a json file.

## Install

- `yarn add gridsome-plugin-query2file`
- `npm install gridsome-plugin-query2file`

## Usage

`gridsome.config.js`

```js
module.exports = {
  plugins: [
    {
      use: 'gridsome-plugin-query2file',
      options: [
        {
          query: `
            query {
              metadata {
                siteName
              }
            }
          `,
          outfile: './src/.temp/query2file.json'
        },
        {
          query: `
            query {
              metadata {
                siteUrl
              }
            }
          `,
          outfile: './api/siteUrl.json'
        }
      ]
    }
  ]
}
```

## Options

Options is an array of objects. Each object contains the properties listed below.

#### query

- Type: `string` *required*

The GraphQL query to run.

#### outfile

- Type: `string` *required*

Path (including filename) of the json file to be written. Can be relative to the project root. Possibly existing file is replaced.
