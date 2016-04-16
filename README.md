# Example Marvel App

An example Node.js app using the [Marvel API](https://developer.marvel.com).

## Quick start

Clone this repository then install dependencies with:

```bash
$ npm install
```

Create an `.env` file containing your Marvel API credentials:

```
export MARVEL_PUBLIC_KEY=your_public_key
export MARVEL_PRIVATE_KEY=your_private_key
```

Start the server with:

```bash
$ npm start
```

## Comments

Below are a few notable concepts used in this project.

### Mostly server-side (vs client-side)

For some use-cases, it makes sense to build a mostly client-side "Single-Page App" (SPA), using frameworks such as React, Ember, or Angular. For other projects that are more "web sites" than "web apps", it might be preferrable and simpler to work mostly on the server-side. This has the benefit of having more control over the execution environment of the app, and also sending less JavaScript that the browser needs to download and parse.

### PJAX (aka Page Fragments)

Although the server does most of the work and rendering, there is a very small piece of client-side code that improves the "perceived performance" after the initial page load. This is done by using a simple technique, sometimes called "PJAX", which basically involves fetching partial HTML from the server and replacing the content of an element in the DOM. With this, the user can navigate the content without requiring a full page refresh. [More information](http://www.ebaytechblog.com/2015/01/05/the-power-of-perceived-performance/)

### Classic directory structure

Express, the popular Node.js framework used by this app, doesn't really impose any directory structure. This flexibility is great, but it also means that one Express app can look very different from another, making it harder for new contributors to a project to find their way around. Here we use a classic "MVC" directory structure, heavily inspired by more opiniated frameworks such as Ruby on Rails or Phoenix (Elixir), which hopefully makes is easier to know where to find things.

### Models to describe domain data

Dynamic languages like JavaScript don't have types, which can make it hard to figure out what kind of data structures the project is using. You basically have to reconstruct them in your mind by reading the functions that use them, to see what kind of properties exist. Here we explicitly declare "models" (in the sense of "domain model", not "database models"), which serve as documentation and can also be used programmatically for things like validating JSON responses.

### Development workflow and production build

There are many different build tools in the JavaScript ecosystem. No matter which one you use, it is important that it provides a nice development workflow (with things like live-reload for CSS, and automatic server restart), as well as a solid production build (with things like asset optimization, and cache-busting hashes for file names).

### Chunked Transfer Encoding

To improve the load time of the home page, we use a technique called "Chunked Transfer Encoding". As soon as possible, we send a first chunk of HTML to the browser (the content "above the fold"). This means the user has something to see while we wait for external API calls to finish before sending the rest of the HTML. [More information](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/)
