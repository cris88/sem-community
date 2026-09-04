export function batteryEta(soc, capacityKwh, powerW) {
    if (!Number.isFinite(soc) || !Number.isFinite(capacityKwh)
        || !Number.isFinite(powerW) || capacityKwh <= 0 || Math.abs(powerW) < 50) {
        return null;
    }

    const energyKwh = powerW > 0
        ? (100 - soc) / 100 * capacityKwh
        : soc / 100 * capacityKwh;
    if (energyKwh <= 0) return null;

    return {
        key: powerW > 0 ? 'until_full' : 'until_empty',
        hours: energyKwh / (Math.abs(powerW) / 1000),
    };
}

export function formatBatteryEta(hours) {
    if (!Number.isFinite(hours) || hours <= 0) return '—';
    if (hours < 1) return `${Math.round(hours * 60)} min`;
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return minutes === 0 ? `${wholeHours} h` : `${wholeHours} h ${minutes} min`;
}
