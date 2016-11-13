# homebridge-window-cover

Supports window cover devices on HomeBridge Platform

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-window-cover
3. Update your configuration file as bellow.

# Configuration

Configuration sample:

 ```
    {
        "bridge": {
            ...
        },
        
        "description": "...",

        "accessories": [
            {
                "accessory": "WindowCover",
                "name": "Window Cover Demo",
                "id": "optional for now",
                "scriptPath": "optional",
                "commandUp": "optional",
                "commandStop": "optional",
                "commandDown": "optional",
                "apiroute": "optional",
            }
        ],

        "platforms":[]
    }
```