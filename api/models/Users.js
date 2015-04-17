/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    username: {
      type : 'string',
      unique: true
    },
    email: {
      type: 'email'
    },
    status: 'boolean',
    rank: {
      type: 'string',
      defaultsTo: 'member',
      enum: ['member', 'elder', 'leader', 'co-leader', 'inactive']
    },
    warLog: {
      collection : 'wars',
      via : 'participants'
    }
  }
};

