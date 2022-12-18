import Block from './block';

export const renderDOM = (rootSelector: string, component: Block) => {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error('Root element not found');
  }

  root.innerHTML = '';

  root.append(component.getContent()!);
}
