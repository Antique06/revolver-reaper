import test from 'node:test';
import assert from 'node:assert/strict';
import mouseMoving from '../client/src/move/mouseMoving.ts';

test('mouse Moving tests', async (t) => {
    await t.test('calculates correct coordinates and direction when moving south', () => {
        const res = mouseMoving(0, 0, 80, 180, true, 10);
        assert.equal(res.direction, 'South');
        assert.equal(Math.round(res.x), 0);
        assert.equal(Math.round(res.y), 10);
        assert.equal(res.isMouseMoving, true);
        assert.equal(res.isMoving, false);
    });

    await t.test('calculates correct coordinates and direction when moving north', () => {
        const res = mouseMoving(0, 0, 80, -20, true, 10);
        assert.equal(res.direction, 'North');
        assert.equal(Math.round(res.x), 0);
        assert.equal(Math.round(res.y), -10);
        assert.equal(res.isMouseMoving, true);
    });

    await t.test('calculates correct coordinates and direction when moving east', () => {
        const res = mouseMoving(0, 0, 180, 80, true, 10);
        assert.equal(res.direction, 'East');
        assert.equal(Math.round(res.x), 10);
        assert.equal(Math.round(res.y), 0);
        assert.equal(res.isMouseMoving, true);
    });

    await t.test('calculates correct coordinates and direction when moving west', () => {
        const res = mouseMoving(0, 0, -20, 80, true, 10);
        assert.equal(res.direction, 'West');
        assert.equal(Math.round(res.x), -10);
        assert.equal(Math.round(res.y), 0);
        assert.equal(res.isMouseMoving, true);
    });

    await t.test('stops moving when reaching the target destination', () => {
        const res = mouseMoving(0, 0, 81, 80, true, 10);
        assert.equal(res.isMouseMoving, false);
    });
});
