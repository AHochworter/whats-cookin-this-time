# What's Cookin'?

# Abstract

We'll write something fun here about our recipe app!

The details of this project are outlined in the <a href="https://frontend.turing.edu/projects/What%27sCookin-PartOne.html" target="\__blank">project spec</a>.

## Set Up

1. Within your group, decide on **one** person to have the project repository on their Github account. This person will _fork_ this repository - on the top right corner of the page, click the fork button.
1. Add all group members and your PM as collaborators on the repo
1. All group members should then clone down the forked repository. Since you don't want your project to be named "whats-cookin-starter-kit", add an optional argument after the repo url when cloning. The command should look like this: `git clone [remote-address] [what your group wants to name the repo]`.
1. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` or `npm i` to install project dependencies.
1. Run `npm start` in the terminal to see the HTML page (you should see some boilerplate HTML displayed on the page).
   - `Control + C` is the command to stop running the local server. Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems.
     - This command is not specific to Webpack; make note of it for future use.
1. Do not run `npm audit fix --force`. This will update to the latest version of packages. We need to be using `webpack-dev-server@3.11.2` which is not the latest version. If you start to run into Webpack errors, first check that all group members are using the correct version.

## Testing

Mocha and chai are already set up, with a boilerplate test for you.
