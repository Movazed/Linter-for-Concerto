import { Rule, RuleContext, LintIssue } from './types';

export class Linter {
  private rules: Rule[] = [];

  constructor(private config: any) {
    this.loadRules();
  }

  private loadRules() {
    for (const [ruleName, ruleConfig] of Object.entries(this.config.rules)) {
      if (ruleConfig === 'off') continue;
      
      const ruleModule = require(`./rules/${ruleName}`);
      this.rules.push(ruleModule.default(ruleConfig));
    }
  }

  public lint(files: string[]): LintIssue[] {
    const issues: LintIssue[] = [];
    const context: RuleContext = { ast: {}, config: this.config };

    files.forEach(file => {
      const ast = this.parseCTO(file);
      context.ast = ast;

      ast.nodes?.forEach((node: any) => {
        this.rules.forEach(rule => {
          if (!rule.appliesTo || rule.appliesTo.includes(node.type)) {
            issues.push(...(rule.checkNode?.(node, context) || []));
          }
        });
      });

      this.rules.forEach(rule => {
        issues.push(...(rule.postProcess?.(context) || []));
      });
    });

    return issues;
  }

  private parseCTO(file: string): any {
    // Implement using @accordproject/concerto-core
    return {}; // Mock implementation
  }
}