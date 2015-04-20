/**
 * Wars.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    clan : {
      model : 'clans'
    },
    opponent: {
      type: 'string',
      required: true
    },
    participants: {
      collection: 'users',
      via: 'id'
    },
    total_bases: {
      type: 'int',
      required: true
    },
    warBases: {
      collection: 'bases',
      via: 'warID'
    }

  },

  afterCreate: function (war, cb) {
    for (var i = 0; i < war.total_bases; i++) {
      Bases.create({
        "number": i + 1,
        "warID": war.id
      }).exec(function (err) {
        if(err) throw(err);
      });
    }
    cb();
  }

};
