import { test } from 'node:test';
import assert from 'node:assert/strict';
import { batteryEta, formatBatteryEta } from '../src/util/battery-eta.js';

test('battery ETA estimates charge time to full', () => {
    const eta = batteryEta(45, 13.3, 609);
    assert.deepEqual(eta.key, 'until_full');
    assert.equal(formatBatteryEta(eta.hours), '12 h 1 min');
});

test('battery ETA estimates discharge time to empty', () => {
    const eta = batteryEta(45, 13.3, -609);
    assert.deepEqual(eta.key, 'until_empty');
    assert.equal(formatBatteryEta(eta.hours), '9 h 50 min');
});

test('battery ETA hides idle, invalid, and complete states', () => {
    assert.equal(batteryEta(45, 13.3, 49), null);
    assert.equal(batteryEta(45, 0, -609), null);
    assert.equal(batteryEta(100, 13.3, 609), null);
    assert.equal(batteryEta(0, 13.3, -609), null);
});
