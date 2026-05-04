import test from 'node:test';
import assert from 'node:assert/strict';
import Bullet from '../common/element/Bullet.ts';

test('Bullet tests', async (t) => {
    await t.test('bullet initializes correctly', () => {
        const bullet = new Bullet(100, 200, Math.PI, 'bullet-1');
        assert.equal(bullet.id, 'bullet-1');
        assert.equal(bullet.x, 100);
        assert.equal(bullet.y, 200);
        assert.equal(bullet.angle, Math.PI);
    });
});
