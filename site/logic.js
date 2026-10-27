export function parseMode(hash = '') {
  return /#\/mode\/b$/.test(hash) ? 'b' : 'a';
}

export function metricLabel(name, item) {
  if (!item) return `${name} not executed`;
  const tests = item.tests ?? item.total ?? 0;
  if (!tests) return `${name} not executed`;
  const coverage = item.coverage == null ? 'coverage not measured' : `${item.coverage} %`;
  const failures = item.failures ?? item.failed ?? 0;
  return `${name} ${tests} · ${coverage}${failures ? ` · ${failures} fail` : ''}`;
}

export function tipFor(item) {
  if (!item) return 'not executed';
  const measured = item.measuredAt ?? item.measured ?? '—';
  const duration = item.durationSeconds ?? item.duration ?? null;
  const perTest = item.perTest ?? null;
  const value = (number) => (number == null ? '—' : `${number} s`);
  return `Measured ${measured}\nDuration ${value(duration)}\nPer test ${value(perTest)}`;
}

export function pageWindow(total, page, size) {
  const pages = Math.max(1, Math.ceil(total / size));
  const current = Math.min(Math.max(1, page), pages);
  return { pages, current, start: (current - 1) * size, end: Math.min(total, current * size) };
}
