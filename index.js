'use strict';

var _ = require('lodash');
var moment = require('moment-precise-range');

/**
 * Simple DTC (Data Transfer Calculator) plugin for UniBot
 *
 * @param  {Object} options Plugin options object, description below.
 *   db: {mongoose} the mongodb connection
 *   bot: {irc} the irc bot
 *   web: {connect} a connect + connect-rest webserver
 *   config: {object} UniBot configuration
 *
 * @return  {Function}  Init function to access shared resources
 */
module.exports = function init(options) {
    var config = options.config || {};

    /**
     * Plugin configuration.
     *
     * @type    {{
     *              moment: {
     *                  locale: string,
     *              },
     *              messages: {
     *                  transferSpeed: string
     *              }
     *          }}
     */
    var pluginConfig = {
        "moment": {
            "locale": ""
        },
        "messages": {
            "dtc": "${nick}: It will take about ${timeHumanize} to transfer ${size}MB over ${speed}Mbit/s connection.",
            "dtcHelp": "Usage like !dtc [megabytes to transfer] [your connection speed as megabits/s], eg !dtc 1000 100"
        }
    };

    // Merge configuration for plugin
    if (_.isObject(config.plugins) && _.isObject(config.plugins.dtc)) {
        pluginConfig = _.merge(pluginConfig, config.plugins.dtc);
    }

    // Set moment locale, if it's set
    if (pluginConfig.moment.locale) {
        moment.locale(pluginConfig.moment.locale);
    }

    // Helper function to tell nick how to use command
    function showHelp(from, channel) {
        channel.say(pluginConfig.messages.dtcHelp, from);
    }

    // Actual plugin implementation
    return function plugin(channel) {
        return {
            "^!dtc(?: (\\d+))?(?: (\\d+))?$": function onMatch(from, matches) {
                if (_.isUndefined(matches[1]) || _.isUndefined(matches[2])) {
                    return showHelp(from, channel);
                }

                // Calculate exact transfer time
                var time = matches[1] / (matches[2] / 8);

                var templateVars = {
                    timeExact: time,
                    timeHumanize: moment.preciseDiff(moment(), moment().add(time, 'seconds')),
                    size: matches[1],
                    speed: matches[2],
                    nick: from
                };

                channel.say(_.template(pluginConfig.messages.dtc)(templateVars));
            }
        };
    };
};
