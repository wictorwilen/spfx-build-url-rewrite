# spfx-build-url-rewrite

SharePoint Framework build tool that automatically re-writes URL's in the manifest.

## Why?

For ISV's and SI's the SharePoint Framework has a huge disadvantage in how configuration is handled. It contains hardcoded references to external URL's and hosting location of the bundled SharePoint Framework files. If you are re-using a SharePoint Framework solution for multiple tenants/clients/environments you need to manually modify the configuration files between each build. The **spfx-build-url-rewrite** allows you to rewrite these URL's at build time to build packages targeted to specific tenants/URLs without modifying the SharePoint Framework configuration files.

## Installation

You add the package to your SPFx solution as follows:

```bash
npm install spfx-build-url-rewrite --save
```

In order to use the package you need to modify the `gulpfile.js` file as follows. Before the line containing `build.initialize(gulp);` insert the following lines:

```JavaScript
const rewrite = require('spfx-build-url-rewrite');
rewrite.config(build);
```

## Usage

To be able to rewrite external URLs (stored in `./config/config.json`) and the CDN URL (stored in `./config/write-manifest.json`) you **must** adress the URLs using the following URL `https://contoso.sharepoint.com`.

Example of `config.json`:

```json
 "externals": {
    "sp-init": {
      "path": "https://wictordev.sharepoint.com/_layouts/15/init.js",
      "globalName": "$_global_init"
    },
    "microsoft-ajax": {
      "path": "https://contoso.sharepoint.com/_layouts/15/MicrosoftAjax.js",
      "globalName": "Sys",
      "globalDependencies": [
        "sp-init"
      ]
    }
 }
```

Example of `write-manifest.json`:

```json
{
  "cdnBasePath": "https://contoso.sharepoint.com/CDN_Library"
}
```

## How to rewrite during the build

You have two options to do the re-write during your build; either using the command line or using environment variables

### Rewrite using the command line

In order to re-write using the command line use the `--target-cdn` argument like this:

```bash
gulp build --target-cdn https://fabrikam.sharepoint.com
```

### Rewrite using environment variables

To avoid specifying the command line argument you can use the `TargetCdn` (`process.enc.TargetCdn`) environment variable. To use argument variables in the command line you can create a file called `.env` in the root folder and add content as follows:

```text
TargetCdn=https://fabrikam.sharepoint.com
```
