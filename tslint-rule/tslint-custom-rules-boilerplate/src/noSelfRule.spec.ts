import {getFixedResult, helper} from './lintRunner';

const rule = 'no-self';

describe('noSelfRule test examples', () => {
    it(`testing failure example`, () => {
        const src = `
        export class Bar {
          constructor() {
            const self = this;
          }
        }
        `;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(1);
    });

    it(`testing multiple failure example`, () => {
        const src = `
          var self = this;
          var self = this;
        }
        `;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(2);
    });

    it(`testing not failure example`, () => {
        const src = `console.log('self);`;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(0);
    });

    it(`testing not failure example`, () => {
        const src = `var a = 1`;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(0);
    });

    it(`testing not failure example`, () => {
        const src = `var self`;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(0);
    });

    it(`testing not failure example`, () => {
        const src = `var self = 1`;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(0);
    });
});
