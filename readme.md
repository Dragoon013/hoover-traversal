This is the readme

Built using node v6.10.3

## Node Installation
Please review the node downloads for your operating system: https://nodejs.org/en/download/

### MacOS
If using OSX and you have Homebrew installed, use: brew install node

### Amazon Linux (EC2)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 6.10.3
node --version

If you have trouble installing on Amazon Linux, review https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html.



You can run the program itself with the test file(s) via this command:
node server test*.txt

Feel free to add additional test*.txt files, and the program will run them in sequence. Expect to see the output on the command line, not in the browser.
