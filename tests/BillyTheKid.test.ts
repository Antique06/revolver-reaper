import test from 'node:test';
import assert from 'node:assert/strict';
import BillyTheKid from '../common/element/BillyTheKid.ts';

test('BillyTheKid tests', async (t) => {
    await t.test('billy the kid initializes correctly', () => {
        const billy = new BillyTheKid('billy-1', 100, 200);
        assert.equal(billy.id, 'billy-1');
        assert.equal(billy.name, 'Billy The Kid');
        assert.equal(billy.x, 100);
        assert.equal(billy.y, 200);
        assert.equal(billy.hp, 100);
        assert.equal(billy.isDead, false);
    });

    await t.test('shoot logic', () => {
        const billy = new BillyTheKid('billy-1', 0, 0);
        assert.equal(billy.shoot(), true);
        assert.equal(billy.shoot(), false);
    });

    await t.test('takeDamage logic', () => {
        const billy = new BillyTheKid('billy-1', 0, 0);
        
        billy.takeDamage(50);
        assert.equal(billy.hp, 50);
        assert.equal(billy.isDead, false);

        billy.takeDamage(100);
        assert.equal(billy.hp, 0);
        assert.equal(billy.isDead, true);
    });
});
