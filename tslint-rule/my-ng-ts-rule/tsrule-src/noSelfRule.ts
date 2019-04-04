import {AbstractRule} from 'tslint/lib/language/rule/abstractRule';
import {NgWalker, NgWalkerConfig} from 'codelyzer';
import {IRuleMetadata, RuleFailure} from 'tslint';
import {RecursiveAngularExpressionVisitor} from 'codelyzer/angular/templates/recursiveAngularExpressionVisitor';
import {LiteralPrimitive, MethodCall, PropertyRead} from '@angular/compiler';
import {SourceFile} from 'typescript';

//https://hackernoon.com/custom-tslint-rules-easier-than-you-think-1bd9c361d70c
//https://github.com/mgechev/codelyzer/blob/master/src/templateNoAnyRule.ts
//https://palantir.github.io/tslint/develop/custom-rules/
//https://rangle.io/blog/custom-tslint-for-angular/
//https://medium.com/@rokerkony/prevent-coding-mistakes-write-a-tslint-rule-specific-for-your-own-project-987d26f91647

export class Rule extends AbstractRule {
  static readonly metadata: IRuleMetadata = {
    description: 'Disallows using self',
    options: null,
    optionsDescription: 'Not configurable',
    rationale: `The use of 'self' nullifies the compile-time benefits of the Angular's type system.`,
    ruleName: 'no-self',
    type: 'functionality',
    typescriptOnly: true
  };

  static readonly FAILURE_STRING = `Avoid using self`;

  apply(sourceFile: SourceFile): RuleFailure[] {
    const walkerConfig: NgWalkerConfig = {expressionVisitorCtrl: ExpressionVisitorCtrl};
    const walker = new NgWalker(sourceFile, this.getOptions(), walkerConfig);

    return this.applyWithWalker(walker);
  }
}

class ExpressionVisitorCtrl extends RecursiveAngularExpressionVisitor {


  visitLiteralPrimitive(ast: LiteralPrimitive, context: any): any {
    console.log('anneq');
  }

  visitMethodCall(ast: MethodCall, context: any): any {
    this.validateMethodCall(ast);
    super.visitMethodCall(ast, context);
  }

  private generateFailure(ast: MethodCall): void {
    const {
      span: {end: endSpan, start: startSpan}
    } = ast;

    this.addFailureFromStartToEnd(startSpan, endSpan, Rule.FAILURE_STRING);
  }

  private validateMethodCall(ast: MethodCall): void {
    const isAnyTypeCastFunction = false; // ast.name === ANY_TYPE_CAST_FUNCTION_NAME;
    const isAngularAnyTypeCastFunction = !(ast.receiver instanceof PropertyRead);

    if (!isAnyTypeCastFunction || !isAngularAnyTypeCastFunction) {
      return;
    }

    this.generateFailure(ast);
  }
}
