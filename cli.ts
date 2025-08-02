#!/usr/bin/env node
import { LintIssue } from './types';  
import { program } from 'commander';
import { Linter } from './linter';
import * as path from 'path';
import * as fs from 'fs';

program
  .version('1.0.0')
  .argument('<files...>', 'Concerto files to lint')
  .option('-c, --config <path>', 'Path to config file', './config.json')
  .action((files, options) => {
    const config = loadConfig(options.config);
    const linter = new Linter(config);
    const results = linter.lint(files);
    console.log(formatResults(results));
  });

program.parse();

function loadConfig(configPath: string): any {
  const absolutePath = path.resolve(process.cwd(), configPath);
  return JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));
}

function formatResults(results: LintIssue[]): string {
  return results.map(issue => 
    `${issue.level.toUpperCase()}: ${issue.message}` +
    (issue.location ? ` (Line ${issue.location.line})` : '')
  ).join('\n');
}