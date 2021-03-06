# Desqui
Generate a document using remote pages.

> NOTE: Docs partially completed

## How it works?
To run Desqui you must create a `json` file with the params of the document.
It will read this file, crawl the remote website to get the links based on a selector.
Then it will download all the links' pages with it resources and extract the relevant data (based on selectors).
With every page relevant data it will create a item using a custom template (Lodash templates).
Finaly it will build the HTML document joining the items and the title.

## Params
### urls
The urls that will be downloaded.

### baseUrl
The url used to concatenate the relative links.

### urlLinks
The url where the links of the pages will be extracted.

### directory
Absosulete or relative to current cwd where the document and its resources will be saved.

### selectors.links
The jQuery selector of the `a`'s in the page `urlLinks`.

### selectors.item
An object with the following structure:

- The key is the name of the *variable*.
- The value is the JQuery selector in the items' page.

All these variables can be used in templates.

### documentTitle
The `<title>` of the document (and the default front).

### headers
An object with headers that are sent during the request.

### templates.documentFront
Optional. A lodash template that compiles the front of the document. Variables that will receive: `documentTitle`.

### templates.item
A lodash template that compiles every item (aka every page). Variables that will receive: all the variables specified in `selectors.item`.

### templates.document
Optional. A lodash template that compiles the document. Variables that will receive: `documentFront`, `documentTitle`.

Note: You need to create an element in the body with the id `items` in order to be able to append the items. This will change in following versions.

## Usage
1. `git clone git@github.com:tomymolina/desqui.git`
2. `cd desqui`
3. `npm install`
4. `node index /path/to/params.json`


## Examples
### Example 1 with urls crawling
```json
{
    "baseUrl": "https://docs.oracle.com/javase/tutorial/essential/concurrency/",
    "urlLinks": "https://docs.oracle.com/javase/tutorial/essential/concurrency/",
    "linksSelector": "#Contents a",
    "directory": "Documents/java_concurrency",
    "selectors": {
        "title": "#PageTitle",
        "content": "#PageContent"
    },
    "documentTitle": "Java Concurrency Manual",
    "documentFrontTemplate": "<h1>Java Concurrency Manual</h1>",
    "itemTemplate": "<section><header>${title}</header><div>${content}</div></section>"
}
```

### Example 2 using urls
```json
{
    "urls": ["http://google.com", "http://facebook.com"],
    "directory": "Documents/google_facebook",
    "selectors": {
        "title": "title",
        "content": "body"
    },
    "documentTitle": "Google and Facebook",
    "documentFrontTemplate": "<h1>Google and Facebook</h1>",
    "itemTemplate": "<section><header>${title}</header><div>${content}</div></section>"
}
```

That will:

- Fetch `https://docs.oracle.com/javase/tutorial/essential/concurrency/`.
- Get the `href` of all links with the following selector: `#Contents a`.
- Scrape all the previous links.
- Get the title (selector `#PageTitle`) and save it in the variable `title`.
- Get the content (selector `#PageContent`) and save it in the variable `content`.
- Parse the template for `itemContent` with the variables.
- Repeat the process for each link.
- Join all the items in one document with title `<h1>Java manual</h1>`

## LICENSE
Copyright 2016 Martín Molina Álvarez

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
