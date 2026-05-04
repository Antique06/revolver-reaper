import test from 'node:test';
import assert from 'node:assert/strict';
import Bonus from '../common/element/Bonus.ts';

test('Bonus tests', async (t) => {
    await t.test('bonus initializes correctly', () => {
        const bonus = new Bonus(100, 200, 'rouge', 50, 50, 'bonus-1');
        assert.equal(bonus.id, 'bonus-1');
        assert.equal(bonus.x, 100);
        assert.equal(bonus.y, 200);
        assert.equal(bonus.type, 'rouge');
        assert.equal(bonus.width, 50);
        assert.equal(bonus.height, 50);
    });
});
