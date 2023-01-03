import Block from './block';
// @ts-ignore
import Handlebars from 'handlebars';
// @ts-ignore
import * as components from '../components/**/*.ts';
import { HelperOptions } from 'handlebars';
import { flatObject } from '../helpers/utils';

const registerComponent = (Component: typeof Block) => {
  Handlebars.registerHelper(
    Component.componentName,
    function ({ hash, data }: HelperOptions) {
      if (!data.root.children) {
        data.root.children = {};
      }
      const { children } = data.root;
      const component = new Component(hash);
      children[component.id] = component;

      return `<div data-id="id-${component.id}"></div>`;
    }
  );
};

export const registerComponents = () => {
  const componentsList = flatObject(components);

  Object.values(componentsList).forEach((component) => {
    if (component.prototype instanceof Block) {
      registerComponent(component);
    }
  });
};
