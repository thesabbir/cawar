/**
* Clans.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name : {
      type : "string",
      required: true
    },
    clanTag: {
      type: "string",
      unique: true,
      required: true
    },
    members: {
      collection : 'users',
      via : 'clan'
    },
    warLog: {
      collection : 'wars',
      via : 'clan'
    }
  }
};

