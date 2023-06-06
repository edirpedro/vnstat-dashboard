# vnStat Dashboard

> Data Visualization app for vnStat.

![vnStat Dashboard](https://github.com/edirpedro/vnstat-dashboard/blob/main/public/static/media/screenshot-1.jpg)

This is an Application in development, intended to be a data visualization interface to read vnStat reports in the big screen. The app only shows the latest information from the reports, only consolidated values. Historic data is not available because there is no such data to be used on the vnStat database, but that's ok, the information you get is enough!

Check out the [Demo](https://edirpedro.github.io/vnstat-dashboard/)!

## How to install?

* Install [vnStat 2.10+](https://github.com/vergoh/vnstat).
* Install a web server to host your app, read some options below.
* Download a copy of this repository.
* Copy the content of folder `/build` to your localhost `/public` folder.
* Setup a **Crontab** service to output the JSON data from vnStat, read more below.
* Start your web server to view your reports.

## Crontab

Write a command at Crontab service to output the vnStat data every 5 minutes inside the `/path/to/localhost/public/api/vnstat.json` file.

### Mac OS and Linux

* Type `crontab -e`
* Write `*/5 * * * * /path/to/bin/vnstat --json > /path/to/localhost/public/api/vnstat.json` changing the paths according to your vnstat and localhost instalattion.
* Save 

## Web Servers

### PHP

Install the [PHP Server](https://www.php.net/manual/en/features.commandline.webserver.php).

```
cd path/to/your/folder
php -S localhost:8000
```

### Node.js

Install the [http-server](https://www.npmjs.com/package/http-server).

```
cd path/to/your/folder
http-server
```

### Other options

You can use any other web server like **Laravel Valet**, **Mamp**, **Xampp**, etc. Just host the app on your `/public` folder and setup the **Crontab** service.

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
