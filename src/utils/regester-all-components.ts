// @ts-ignore
import * as components from '../components/**/*.ts';
import Block from '../utils/block';
import { registerComponent } from '../utils/register-component';
import { flatObject } from '../utils/helpers';
import { Button } from '../components/buttons/submit-button';

export const registerAllComponents = () => {
  const componentsList = flatObject(components);

  Object.values(componentsList).forEach((component) => {
    if (component.prototype instanceof Block) {
      registerComponent(component);
    }
  });
};
