import Handlebars from 'handlebars';

export const registerHelpers = () => {
  Handlebars.registerHelper('isEqual', (a: any, b: any) => a === b);

  Handlebars.registerHelper(
    'isAnyObjectPropertyTrue',
    (obj: Record<string, string>) => {
      if (typeof obj !== 'object') {
        return false;
      }
      return Object.values(obj).some((value) => value);
    }
  );
};
