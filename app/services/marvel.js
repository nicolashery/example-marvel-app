var crypto = require('crypto');
var fetch = require('node-fetch');
var queryString = require('query-string');

var Pagination = require('app/models/pagination');
var Character = require('app/models/character');
var Comic = require('app/models/comic');
var FeaturedCharacter = require('app/models/featured-character');
var FeaturedComic = require('app/models/featured-comic');

function Marvel(options) {
  this.publicKey = options.publicKey || '';
  this.privateKey = options.privateKey || '';
}

Marvel.prototype.findAllCharacters = function(options) {
  var self = this;
  options = options || {};
  var ts = this._timestamp();
  var limit = typeof options.limit !== 'undefined' ? options.limit : 20;
  var offset = typeof options.offset !== 'undefined' ? options.offset : 0;

  var qs = queryString.stringify({
    ts: ts,
    apikey: this.publicKey,
    hash: this._createHash(ts),
    limit: limit,
    offset: offset
  });
  var url = 'http://gateway.marvel.com/v1/public/characters?' + qs;

  return fetch(url)
    .then(function(res) {
      if (res.status !== 200) {
        return self._handleError(res);
      }

      return res.json();
    })
    .then(function(body) {
      var pagination = Pagination(body.data);
      var characters = body.data.results.map(function(payload) {
        return Character(payload);
      });

      return {
        pagination: pagination,
        characters: characters
      };
    });
};

Marvel.prototype.findCharacter = function(id) {
  var self = this;
  var ts = this._timestamp();

  var qs = queryString.stringify({
    ts: ts,
    apikey: this.publicKey,
    hash: this._createHash(ts)
  });
  var url = 'http://gateway.marvel.com/v1/public/characters/'+ id + '?' + qs;

  return fetch(url)
    .then(function(res) {
      if (res.status !== 200) {
        return self._handleError(res);
      }

      return res.json();
    })
    .then(function(body) {
      var character = Character(body.data.results[0]);

      return {
        character: character
      };
    });
};

Marvel.prototype.findAllComics = function(options) {
  var self = this;
  options = options || {};
  var ts = this._timestamp();
  var limit = typeof options.limit !== 'undefined' ? options.limit : 20;
  var offset = typeof options.offset !== 'undefined' ? options.offset : 0;

  var qs = queryString.stringify({
    ts: ts,
    apikey: this.publicKey,
    hash: this._createHash(ts),
    limit: limit,
    offset: offset
  });
  var url = 'http://gateway.marvel.com/v1/public/comics?' + qs;

  return fetch(url)
    .then(function(res) {
      if (res.status !== 200) {
        return self._handleError(res);
      }

      return res.json();
    })
    .then(function(body) {
      var pagination = Pagination(body.data);
      var comics = body.data.results.map(function(payload) {
        return Comic(payload);
      });

      return {
        pagination: pagination,
        comics: comics
      };
    });
};

Marvel.prototype.findComic = function(id) {
  var self = this;
  var ts = this._timestamp();

  var qs = queryString.stringify({
    ts: ts,
    apikey: this.publicKey,
    hash: this._createHash(ts)
  });
  var url = 'http://gateway.marvel.com/v1/public/comics/'+ id + '?' + qs;

  return fetch(url)
    .then(function(res) {
      if (res.status !== 200) {
        return self._handleError(res);
      }

      return res.json();
    })
    .then(function(body) {
      var comic = Comic(body.data.results[0]);

      return {
        comic: comic
      };
    });
};

Marvel.prototype.fetchFeaturedCharacters = function() {
  // Endpoint doesn't exist, so fake it
  var body = {
    data: {
      results: [
        {
          id: 1009610,
          name: 'Spider-Man',
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b',
            extension: 'jpg'
          }
        },
        {
          id: 1010338,
          name: 'Captain Marvel (Carol Danvers)',
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/6/80/5269608c1be7a',
            extension: 'jpg'
          }
        },
        {
          id: 1009351,
          name: 'Hulk',
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0',
            extension: 'jpg'
          }
        },
        {
          id: 1009189,
          name: 'Black Widow',
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/f/30/50fecad1f395b',
            extension: 'jpg'
          }
        }
      ]
    }
  };

  var characters = body.data.results.map(function(payload) {
    return FeaturedCharacter(payload);
  });

  return new Promise(function(resolve) {
    // Add fake delay to showcase Chunked Transfer Encoding
    setTimeout(function() {
      resolve({
        characters: characters
      });
    }, 1000);
  });
};

Marvel.prototype.fetchFeaturedComics = function() {
  // Endpoint doesn't exist, so fake it
  var body = {
    data: {
      results: [
        {
          id: 57382,
          name: 'Black Panther (2016) #1',
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/80/567065cfebad5',
            extension: 'jpg'
          }
        },
        {
          id: 55398,
          name: 'Darth Vader (2015) #18',
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/1/a0/56f1836f99068',
            extension: 'jpg'
          }
        },
        {
          id: 55766,
          name: 'Star Wars (2015) #17',
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/b0/56e71aef71d19',
            extension: 'jpg'
          }
        },
        {
          id: 55360,
          name: 'All-New, All-Different Avengers (2015) #7',
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/80/56e7074c31b84',
            extension: 'jpg'
          }
        }
      ]
    }
  };

  var comics = body.data.results.map(function(payload) {
    return FeaturedComic(payload);
  });

  return new Promise(function(resolve) {
    // Add fake delay to showcase Chunked Transfer Encoding
    setTimeout(function() {
      resolve({
        comics: comics
      });
    }, 1500);
  });
};

Marvel.prototype._createHash = function(ts) {
  var content = ts + this.privateKey + this.publicKey;
  var hash = crypto.createHash('md5').update(content).digest('hex');

  return hash;
};

Marvel.prototype._timestamp = function() {
  return parseInt(Date.now() / 1000, 10);
};

Marvel.prototype._handleError = function(res) {
  return res.text()
    .then(function(bodyText) {
      var message = res.status + ' ' + res.statusText + ' ' + bodyText;
      var error = new Error(message);
      error.status = res.status;
      throw error;
    });
};

module.exports = Marvel;
