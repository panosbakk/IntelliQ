# CLI 

## Description

This CLI tool is a command-line interface for performing various tasks. To use it, you need to be in the cli folder and run the command `node cli.js` . This will display a list of available options that you can use. 

To specify a parameter, use the --param option, followed by the value you want to use. For example, if you want to login with your username and your password, you should write:

`node cli.js login --username <your_username_here> --password <your_password_here>`.

## Available Scripts

If you are using Linux or WSL, and you want to be able to run the CLI tool even when you are not in the cli/ directory, using the command `se2228`, instead of `node cli.js`, follow these additional steps:

a. Open the `script_launcher.sh` file in a text editor.

b. Replace the `$EVN_CLI` variable with the absolute path to your project directory.

c. Save and close the file.

d. Run the following command to install the CLI tool: `./install_cli.sh`

