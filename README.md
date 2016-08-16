# puttai
Weekend hackaton to create an AI for the ridiculously popular putt game.

# Install

First install [Node and NPM](https://nodejs.org/en/).

Then enter the repo with the terminal and run

```
npm install
npm install webpack-dev-server -g
```

# Development

Run in the terminal

```
webpack-dev-server --hot --inline
```

And enter [http://localhost:8080](http://localhost:8080) in the browser.
It will live reload any changes to the code. Might need a refresh in the browser, CTRL+R.

The main focus is the constructing the ai. A skeleton can be found in [/src/ai.js](/src/ai.js).


# Resources

One avaliable lib for linear algebra is [numeric](http://www.numericjs.com/documentation.html).
