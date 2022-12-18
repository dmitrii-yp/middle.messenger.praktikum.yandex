import Block from './block';
import { HelperOptions } from 'handlebars';
// @ts-ignore
import Handlebars from 'handlebars';

export const registerComponent = (Component: typeof Block) => {
  Handlebars.registerHelper(
    Component.componentName,
    function ({ hash, data }: HelperOptions) {
      //hash - это параметры переданные при вызове компонента, data - это контекст(все, что было передано в родительский шаблон, в котором был вызван helper ({{Button label="Submit"}}))

      if (!data.root.children) {
        data.root.children = {};
      }
      const {children} = data.root;
      const component = new Component(hash);
      children[component.id] = component;

      return `<div data-id="id-${component.id}"></div>`;
    }
  );
};
