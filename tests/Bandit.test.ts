import test from 'node:test';
import assert from 'node:assert/strict';
import Bandit from '../common/element/Bandit.ts';

test('Bandit tests', async (t) => {
    await t.test('bandit initializes correctly', () => {
        const bandit = new Bandit('bandit-1', 100, 200);
        assert.equal(bandit.id, 'bandit-1');
        assert.equal(bandit.x, 100);
        assert.equal(bandit.y, 200);
        assert.equal(bandit.hp, 50);
        assert.equal(bandit.isDead, false);
    });

    await t.test('shoot logic', () => {
        const bandit = new Bandit('bandit-1', 0, 0);
        const shootsFirstTime = bandit.shoot();
        assert.equal(shootsFirstTime, true);
        
        const shootsSecondTime = bandit.shoot();
        assert.equal(shootsSecondTime, false);
    });

    await t.test('takeDamage logic', () => {
        const bandit = new Bandit('bandit-1', 0, 0);
        
        bandit.takeDamage(10);
        assert.equal(bandit.hp, 40);
        assert.equal(bandit.isDead, false);

        bandit.takeDamage(60);
        assert.equal(bandit.hp, 0);
        assert.equal(bandit.isDead, true);
    });
});
