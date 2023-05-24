# vnStat Dashboard

> Data Visualization app for vnStat.

![vnStat Dashboard](https://github.com/edirpedro/vnstat-dashboard/blob/main/public/static/media/screenshot-1.jpg)

This is an Application in development, intended to be a data visualization interface to read vnStat reports in the big screen. The app only shows the latest information from the reports, only consolidated values. Historic data is not available because there is no such data to be used on the vnStat database, but that's ok, the information you get is enough!

Check out the [Demo](https://edirpedro.github.io/vnstat-dashboard/)!

## How to install?

* Install [vnStat 2.0+](https://github.com/vergoh/vnstat).
* Download a copy of this repository, in the folder `/build` you can find all the app files.
* Follow one of the nexts steps to start a server for the API:

### PHP

To serve the PHP API, open the file `/api/vnstat.json.php` and make sure the environment path is correct to find your vnStat installation.

* Install a server like [Laravel Valet](https://laravel.com/docs/valet), [Local](https://localwp.com/), [MAMP](https://www.mamp.info/en/mamp), [XAMPP](https://www.apachefriends.org/) or another of your choice.
* Create a domain on your Server, like `vnstat.test`.
* Copy the content of the folder `/build` to your `/public` folder.

## Translations

At `/languages` folder you can write a file to translate the app. Just copy one the files and translate it. Don't forget to name your file with your language code, the app will load it automatically according to your browser language.

## Themes

You can build themes for this tool, to create a custom theme follow these steps. 

* Copy one of the themes from the folder `/static/themes` to the place you want to save it, like `/custom/themes`.
* Rename the file to a name of your choice.
* Add your colors on it or any other CSS you desire.
* Open the file `/api/themes.json` and add it to the theme list to get it available on the dashboard.
* Theme menu is located on the top right corner of the screen!

![vnStat Dashboard](https://github.com/edirpedro/vnstat-dashboard/blob/main/public/static/media/screenshot-2.jpg)

## Credits

[vnStat](https://humdi.net/vnstat/) from [Vergoh](https://github.com/vergoh), Photos from [kevin laminto](https://unsplash.com/@kxvn_lx) and [John Peters](https://unsplash.com/@johnphiker), wallpapers from the internet (couldn't find the authors).
