# vnStat Dashboard

> Data Visualization app for vnStat.

![vnStat Dashboard](https://github.com/edirpedro/vnstat-dashboard/blob/main/public/static/media/screenshot-1.jpg)

This is an Application in development, intended to be a data visualization interface to read vnStat reports in the big screen. The app only shows the latest information from the reports, only consolidated values. Historic data is not available because there is no such data to be used on the vnStat database, but that's ok, the information you get is enough!

Check out the [Demo](https://edirpedro.github.io/vnstat-dashboard/)!

## How to install?

1. Install [vnStat 2.0+](https://github.com/vergoh/vnstat).
2. Download a copy of this repository, at the folder `/build` you can find all the app files.
3. Copy `config-sample.js`, rename it to `config.js` and customize your settings.
3. Follow one of the nexts to start a server:

### PHP

To use the PHP API, open the file `/api/vnstat.json.php` and make sure the environment is correct to find your vnStat installation.

#### Built-in Server

1. Open your Terminal application and go to the folder `/build`.
2. Launch the server `php -S localhost:8000`.

#### Another Servers

1. Create a domain on your PHP Server, like `vnstat.test`.
2. Copy the content of the folder `/build` to your **public** folder.

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

## Credits

[vnStat](https://humdi.net/vnstat/) from [Vergoh](https://github.com/vergoh), Photos from [kevin laminto](https://unsplash.com/@kxvn_lx) and [John Peters](https://unsplash.com/@johnphiker), wallpapers from the internet (couldn't find the authors), video from [@tunnelmotions](https://pixabay.com/users/tunnelmotions-12767861/).