import test from 'node:test';
import assert from 'node:assert/strict';
import JohnHenry from '../common/element/JohnHenry.ts';

test('JohnHenry tests', async (t) => {
    await t.test('john henry initializes correctly', () => {
        const john = new JohnHenry('john-1', 50, 60);
        assert.equal(john.id, 'john-1');
        assert.equal(john.name, 'John Henry');
        assert.equal(john.x, 50);
        assert.equal(john.y, 60);
        assert.equal(john.hp, 200);
        assert.equal(john.isDead, false);
    });

    await t.test('hit logic', () => {
        const john = new JohnHenry('john-1', 0, 0);
        assert.equal(john.hit(), true);
        assert.equal(john.hit(), false);
    });

    await t.test('takeDamage logic', () => {
        const john = new JohnHenry('john-1', 0, 0);
        
        john.takeDamage(150);
        assert.equal(john.hp, 50);
        assert.equal(john.isDead, false);

        john.takeDamage(60);
        assert.equal(john.hp, 0);
        assert.equal(john.isDead, true);
    });
});
