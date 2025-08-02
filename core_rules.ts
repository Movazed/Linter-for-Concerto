import { LintIssue, Rule, RuleContext, ASTNode } from './types';

const exampleRule: Rule = {
    appliesTo: ['ExampleNodeType'], // Specify applicable node types
    checkNode: (node, context: RuleContext): LintIssue[] => {
        const issues: LintIssue[] = [];

        if (node.type === 'ExampleNodeType' && !node.value) {
            issues.push({
                message: 'ExampleNodeType must have a value.',
                level: 'error',
                location: node.location,
            });
        }

        return issues;
    },
};

const configCheckRule: Rule = {
    postProcess: (context: RuleContext): LintIssue[] => {
        const issues: LintIssue[] = [];

        if (!context.config.someImportantSetting) {
            issues.push({
                message: 'The configuration is missing "someImportantSetting".',
                level: 'warning',
            });
        }

        return issues;
    },
};

const childNodeRule: Rule = {
    appliesTo: ['ParentNodeType'],
    checkNode: (node: ASTNode, context: RuleContext): LintIssue[] => {
        const issues: LintIssue[] = [];

        if (node.type === 'ParentNodeType' && (!node.children || node.children.length === 0)) {
            issues.push({
                message: 'ParentNodeType must have at least one child node.',
                level: 'error',
                location: node.location,
            });
        }

        return issues;
    },
};


export const rules: Rule[] = [exampleRule, configCheckRule, childNodeRule];
