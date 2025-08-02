export interface LintIssue {
    message: string;
    level: 'error' | 'warning';
    location?: {
      line: number;
      column: number;
    };
  }
  
  export interface RuleContext {
    ast: any; // Concerto AST
    config: any;
  }
  export interface ASTNode {
    type: string;
    value?: string;  // Optional value property
    children?: ASTNode[]; // Optional children for tree structure
    location?: {
        line: number;
        column: number;
    };
}
  export interface Rule {
    appliesTo?: string[];
    checkNode?: (node: any, context: RuleContext) => LintIssue[];
    postProcess?: (context: RuleContext) => LintIssue[];
  }
  
  export type RuleFactory = (options: any) => Rule;