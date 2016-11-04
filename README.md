# homebridge-window-cover

Supports window cover devices on HomeBridge Platform

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-window-cover
3. Update your configuration file. See sample-config.json in this repository for a sample. 

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
                "apiroute": "",
                "id": "123"
            }
        ],

        "platforms":[]
    }
```