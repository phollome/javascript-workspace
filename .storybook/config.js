import { configure, addDecorator } from "@storybook/react";
import { withConsole } from "@storybook/addon-console";

const apps = require.context("../apps", true, /\.stories\.js$/);
const packages = require.context("../packages", true, /\.stories\.js$/);
function loadStories() {
  apps.keys().forEach(filename => apps(filename));
  packages.keys().forEach(filename => packages(filename));
}

configure(loadStories, module);

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
