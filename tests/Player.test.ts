import test from 'node:test';
import assert from 'node:assert/strict';
import Player from '../common/element/Player.ts';

test('Player tests', async (t) => {
    await t.test('player initializes correctly', () => {
        const player = new Player('TestPlayer', 'id-123', 10, 20, 2);
        assert.equal(player.name, 'TestPlayer');
        assert.equal(player.id, 'id-123');
        assert.equal(player.x, 10);
        assert.equal(player.y, 20);
        assert.equal(player.skin, 2);
        assert.equal(player.hp, 100);
        assert.equal(player.score, 0);
        assert.equal(player.level, 1);
        assert.equal(player.isDead, false);
    });

    await t.test('can move to a new position', () => {
        const player = new Player('TestPlayer', 'id-123', 10, 20);
        player.move(50, 60);
        assert.equal(player.x, 50);
        assert.equal(player.y, 60);
    });

    await t.test('addScore increases score and handles leveling up', () => {
        const player = new Player('TestPlayer', 'id-123', 0, 0);
        
        player.addScore(100);
        assert.equal(player.score, 100);
        assert.equal(player.level, 1);
        assert.equal(player.nbLevelPoint, 0);

        player.addScore(100);
        assert.equal(player.score, 200);
        assert.equal(player.level, 2);
        assert.equal(player.nbLevelPoint, 1);

        player.addScore(300);
        assert.equal(player.score, 500);
        assert.equal(player.level, 3);
        assert.equal(player.nbLevelPoint, 2);
    });

    await t.test('takeDamage reduces health and sets isDead when hp reaches 0', () => {
        const player = new Player('TestPlayer', 'id-123', 0, 0);
        
        player.takeDamage(20);
        assert.equal(player.hp, 80);
        assert.equal(player.isDead, false);

        player.takeDamage(100);
        assert.equal(player.hp, 0);
        assert.equal(player.isDead, true);
    });
});
