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
                "id": "123",
                "pythonScriptPath": "ABSOLUTE_PATH_TO_SCRIPT",
                "pythonScriptName": "SCRIPT_NAME.py"
                "apiroute": "ABSOLUTE_URL"
            }
        ],

        "platforms":[]
    }
```