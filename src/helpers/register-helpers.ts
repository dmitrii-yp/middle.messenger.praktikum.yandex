import Handlebars from 'handlebars';

export const registerHelpers = () => {
  Handlebars.registerHelper('isEqual', function (a: any, b: any) {
    return a === b;
  });
};
