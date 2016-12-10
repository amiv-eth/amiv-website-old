# amiv-website
The new amiv website built with [hugo](https://github.com/spf13/hugo).

## Deployment

### Generate the static html page and deply with apache/nginx

`git clone git@github.com:amiv-eth/amiv-website.git`

`cd amiv-website`

`hugo -s . -d /var/www`

### Host it using the built in hugo server (Developers only)

`git clone git@github.com:amiv-eth/amiv-website.git`

`cd amiv-website`

`hugo server`

Go to [localhost:1313](http://localhost:1313)

## Content

The static content of the amiv-website is located in `content` and formated using [markdown](https://en.wikipedia.org/wiki/Markdown). New pages can be added using `hugo new content_name.md`. This creates a new markdown file in `content` and automatically includes the config section needed by hugo.

## Theme

Curently the theme [blackburn](https://github.com/yoshiharuyamashita/blackburn) is used. TODO!

