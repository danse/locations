var mustache = require('mustache'),
    _ = require('lodash');

var startModule = "angular.module('eHealth.locations', [])";

function dotConstant(country) {
  var country = _.clone(country, true);
  country.name = 'locations_' + country.name;
  country.data = JSON.stringify(country.data);
  return mustache.render(".constant('{{name}}', {{&data}})", country);
}

module.exports = {
  modularise: function(country) {
    return startModule + dotConstant(country) + ';';
  },
  modulariseMultiple: function(countries) {
    var constants = countries.map(dotConstant).join('');
    return startModule + constants + ';';
  }
};
