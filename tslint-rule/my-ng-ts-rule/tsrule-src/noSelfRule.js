"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var abstractRule_1 = require("tslint/lib/language/rule/abstractRule");
var codelyzer_1 = require("codelyzer");
var recursiveAngularExpressionVisitor_1 = require("codelyzer/angular/templates/recursiveAngularExpressionVisitor");
var compiler_1 = require("@angular/compiler");
//https://github.com/mgechev/codelyzer/blob/master/src/templateNoAnyRule.ts
//https://palantir.github.io/tslint/develop/custom-rules/
//https://rangle.io/blog/custom-tslint-for-angular/
//https://medium.com/@rokerkony/prevent-coding-mistakes-write-a-tslint-rule-specific-for-your-own-project-987d26f91647
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walkerConfig = { expressionVisitorCtrl: ExpressionVisitorCtrl };
        var walker = new codelyzer_1.NgWalker(sourceFile, this.getOptions(), walkerConfig);
        return this.applyWithWalker(walker);
    };
    Rule.metadata = {
        description: 'Disallows using self',
        options: null,
        optionsDescription: 'Not configurable',
        rationale: "The use of 'self' nullifies the compile-time benefits of the Angular's type system.",
        ruleName: 'no-self',
        type: 'functionality',
        typescriptOnly: true
    };
    Rule.FAILURE_STRING = "Avoid using self";
    return Rule;
}(abstractRule_1.AbstractRule));
exports.Rule = Rule;
var ExpressionVisitorCtrl = /** @class */ (function (_super) {
    __extends(ExpressionVisitorCtrl, _super);
    function ExpressionVisitorCtrl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpressionVisitorCtrl.prototype.visitLiteralPrimitive = function (ast, context) {
        console.log('anneq');
    };
    ExpressionVisitorCtrl.prototype.visitMethodCall = function (ast, context) {
        this.validateMethodCall(ast);
        _super.prototype.visitMethodCall.call(this, ast, context);
    };
    ExpressionVisitorCtrl.prototype.generateFailure = function (ast) {
        var _a = ast.span, endSpan = _a.end, startSpan = _a.start;
        this.addFailureFromStartToEnd(startSpan, endSpan, Rule.FAILURE_STRING);
    };
    ExpressionVisitorCtrl.prototype.validateMethodCall = function (ast) {
        var isAnyTypeCastFunction = false; // ast.name === ANY_TYPE_CAST_FUNCTION_NAME;
        var isAngularAnyTypeCastFunction = !(ast.receiver instanceof compiler_1.PropertyRead);
        if (!isAnyTypeCastFunction || !isAngularAnyTypeCastFunction) {
            return;
        }
        this.generateFailure(ast);
    };
    return ExpressionVisitorCtrl;
}(recursiveAngularExpressionVisitor_1.RecursiveAngularExpressionVisitor));
