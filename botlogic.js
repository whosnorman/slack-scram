// Generated by CoffeeScript 1.8.0
var Slack, autoMark, autoReconnect, slack, token;

Slack = require('./node-slack-client/index.coffee');

token = 'xoxb-4498315086-SMWYoZm0kfSTLc5CUfcRuRd9';

autoReconnect = true;

autoMark = true;

slack = new Slack(token, autoReconnect, autoMark);

slack.on('open', function() {
  var channel, channels, group, groups, id, messages, unreads;
  channels = [];
  groups = [];
  unreads = slack.getUnreadCount();
  channels = (function() {
    var _ref, _results;
    _ref = slack.channels;
    _results = [];
    for (id in _ref) {
      channel = _ref[id];
      if (channel.is_member) {
        _results.push("#" + channel.name);
      }
    }
    return _results;
  })();
  groups = (function() {
    var _ref, _results;
    _ref = slack.groups;
    _results = [];
    for (id in _ref) {
      group = _ref[id];
      if (group.is_open && !group.is_archived) {
        _results.push(group.name);
      }
    }
    return _results;
  })();
  console.log("Welcome to Slack. You are @" + slack.self.name + " of " + slack.team.name);
  console.log('You are in: ' + channels.join(', '));
  console.log('As well as: ' + groups.join(', '));
  messages = unreads === 1 ? 'message' : 'messages';
  return console.log("You have " + unreads + " unread " + messages);
});

slack.login();
