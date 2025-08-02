import { RuleFactory } from './types';

export const scalarCamelCaseRule: RuleFactory = (options) => ({
  appliesTo: ['ScalarDeclaration'],
  checkNode: (node) => {
    if (!/^[a-z][a-zA-Z0-9]*$/.test(node.name)) {
      return [{
        message: `Scalar "${node.name}" must be camelCase.`,
        level: options.level || 'error',
        location: node.location,
      }];
    }
    return [];
  },
});

export const requireTermDecoratorRule: RuleFactory = (options) => ({
  appliesTo: ['*'],
  checkNode: (node) => {
    if (!node.decorators?.some((d: any) => d.name === 'Term')) {
      return [{
        message: `Missing @Term decorator on ${node.type} "${node.name}"`,
        level: options.level || 'warning',
        location: node.location,
      }];
    }
    return [];
  },
});