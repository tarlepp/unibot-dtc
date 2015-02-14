# unibot-dtc
DTC (Data Transfer Calculator) plugin for UniBot IRC bot.

## Install
To your UniBot application. Remember to restart your bot after installation.

```npm install git://github.com/tarlepp/unibot-dtc --save```

And after that register plugin on IRC channels where you want to use it.

```plugin [#channel] dtc```

## Usage
Currently plugin supports following commands.

### !dtc [megabytes to transfer] [your connection speed as megabits/s]
This command will calculate how long it will take to transfer specified amount of data with specified connection.

## Configuration
You can configure this plugin adding ```dtc``` section to your UniBot ```config.js``` file. Example below with
default values.

```
module.exports = { 
    ...
    plugins: {
        "dtc": {
            "moment": {
                "locale": ""
            },
            "messages": {
                "dtc": "${nick}: It will take about ${timeHumanize} to transfer ${size}MB over ${speed}Mbit/s connection.",
                "dtcHelp": "Usage like !dtc [megabytes to transfer] [your connection speed as megabits/s], eg !dtc 1000 100"
            }
        }
    }
};
```

### moment
Used locale setting within moment.js library, this will affect time formats.

### messages.dtc
Message string that is shown within ```!dtc``` command. Following template variables are available with this message.

```
timeExact
timeHumanize
size
speed
nick 
```

### messages.dtcHelp
Private message that is said to user when he/she triggers ```!dtc``` command wit invalid parameters.

## Libraries that plugin uses
* [lodash](https://lodash.com/) - A JavaScript utility library delivering consistency, modularity, performance
* [Moment.js](http://momentjs.com/) - Parse, validate, manipulate, and display dates in JavaScript
* [moment-precise-range](https://github.com/mtscout6/moment-precise-range) - A moment.js plugin to display human readable date/time ranges with precision
