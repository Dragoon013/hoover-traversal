# Hoover Traversal

Develop a program that replicates the path of a roomba-like device and outputs it's final stopping point, as well as an indication of how much it cleaned along the way.

## Problem  Description

* Room dimensions as [X and Y coordinates](https://en.wikipedia.org/wiki/Cartesian_coordinate_system), identifying the top right corner of the room rectangle. This room is divided up in a grid based on these dimensions; a room that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible hoover positions. The bottom left corner is the point of origin for our coordinate system, so as the room contains all coordinates its bottom left corner is defined by X: 0 and Y: 0.
* Locations of patches of dirt, also defined by X and Y coordinates identifying the bottom left corner of those grid positions.
* An initial hoover position (X and Y coordinates like patches of dirt)
* Driving instructions (as [cardinal directions](https://en.wikipedia.org/wiki/Cardinal_direction) where e.g. N and E mean "go north" and "go east" respectively) 

The room will be rectangular, has no obstacles (except the room walls), no doors and all locations in the room will be clean (hoovering has no effect) except for the locations of the patches of dirt presented in the program input.

Placing the hoover on a patch of dirt ("hoovering") removes the patch of dirt so that patch is then clean for the remainder of the program run. The hoover is always on - there is no need to enable it.

Driving into a wall has no effect (the robot skids in place).

Accepts input from files with the following format:
```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```

Outputs the final spot of the bot, as well as how many dirt patches cleaned.
```
1 3
1
```

Built using node v6.10.3

## Node Installation
Please review the node downloads for your operating system: https://nodejs.org/en/download/

### MacOS
If using OSX and you have Homebrew installed, use: 
```
brew install node
```

### Amazon Linux (EC2)
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 6.10.3
node --version
```

If you have trouble installing on Amazon Linux, review https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html.



You can run the program itself with the test file(s) via this command:
```
node server test*.txt
```
Feel free to add additional test*.txt files, and the program will run them in sequence. Expect to see the output on the command line, not in the browser.
