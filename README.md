# vnStat Dashboard

> Data Visualization app for vnStat.

![vnStat Dashboard](https://github.com/edirpedro/vnstat-dashboard/blob/main/public/static/media/screenshot-1.jpg)

This is an Application in development, intended to be a data visualization interface to read vnStat reports in a big screen. The app only shows the latest information from the reports, only consolidated values. Historic data is not available because there is no such data to be used on the vnStat database, but that's ok, the information you get is enough!

Check out [Demo](https://edirpedro.github.io/vnstat-dashboard/)!

## How to install?

1. Install [vnStat](https://github.com/vergoh/vnstat) on your machine.
2. Download the latest [Release](https://github.com/edirpedro/vnstat-dashboard/releases).
3. Follow one of the nexts:

### PHP Server

1. Create a domain on your PHP Server, like `vnstat.test`, it requires PHP 8.0.
2. Put the release files on the **public** folder.
3. Copy `config-sample.js` and rename it to `config.js`, now customize your settings.
4. Open the file `/api/vnstat.json.php` in some code editor and make sure the environment is correct to your vnStat installation.

## Translations

At `/languages` folder you can write a file to translate the app. Just copy one the files and translate it. Don't forget to name your file with your language code, the app will load it automatically according to your browser language.

## Themes

You can build themes for this tool, to create a custom theme follow these steps. 

1. Copy one of the themes from the folder `/static/themes`
2. Rename the file to your name choice,
3. Add your colors on it or any other CSS code you want.
4. Open the `config.js` file and add it to the theme list to get it available on the dashboard.
5. Theme menu is located on the top right corner of the screen!

![vnStat Dashboard](https://github.com/edirpedro/vnstat-dashboard/blob/main/public/static/media/screenshot-2.jpg)