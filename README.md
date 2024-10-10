#packAPI
> our api for packUP which interacts with our postgresql database and our app.

## Getting started
## Barrelsby

This project uses [barrelsby](https://www.npmjs.com/package/barrelsby) to generate index files to import the controllers.

Edit `.barreslby.json` to customize it:

```json
{
  "directory": [
    "./src/controllers/rest",
    "./src/controllers/pages"
  ],
  "exclude": [
    "__mock__",
    "__mocks__",
    ".spec.ts"
  ],
  "delete": true
}
```
