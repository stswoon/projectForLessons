import {Rule} from './noSelfRule';
import {assertAnnotated, assertMultipleAnnotated, assertSuccess} from './testHelper';

const {
  FAILURE_STRING,
  metadata: {ruleName}
} = Rule;

describe(ruleName, () => {
  describe('failure', () => {
    it('should fail', () => {
      const source = `
        export class Bar {
          constructor() {
            const self = this;
          }
        }
      `;
      assertAnnotated({
        message: FAILURE_STRING,
        ruleName,
        source
      });
    });
  });
});
