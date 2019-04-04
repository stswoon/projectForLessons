import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
    static FAILURE_STRING = 'Use of debugger statements is forbidden.';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new Walk(sourceFile, this.getOptions()));
    }
}

class Walk extends Lint.RuleWalker {
    protected visitVariableDeclaration(node: ts.VariableDeclaration): void {
        console.log("check");
        if (node.getFullText().trim() === "self = this") {
            this.addFailureAt(node.getStart(), node.getEnd() - node.getStart(), Rule.FAILURE_STRING, null);
        }
        super.visitVariableDeclaration(node);
    }
}

