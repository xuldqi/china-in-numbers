// Small canvas chart helpers: line, vertical bars, horizontal bars, donut and a
// population pyramid. Every chart draws its own axis labels and gridlines so a
// screenshot reads on its own. Charts size themselves to the element's box and
// the device pixel ratio, and redraw cleanly when called again.

const INK = '#17233b';
const SOFT = '#68738a';
const GRID = '#e4ddcd';

function setup(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  canvas.style.height = `${height}px`;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.font = '12px system-ui, sans-serif';
  return { ctx, width, height };
}

function fmt(n, digits = 0) {
  return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

// A line (or area) chart over [x, y] points. options: {color, unit, yDigits, area}
export function lineChart(canvas, points, options = {}) {
  const { ctx, width, height } = setup(canvas, options.height || 240);
  const color = options.color || '#b3372c';
  const padL = 44, padR = 12, padT = 14, padB = 26;
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  let yMin = Math.min(...ys), yMax = Math.max(...ys);
  if (options.yMin !== undefined) yMin = options.yMin;
  const yPad = (yMax - yMin) * 0.15 || 1;
  yMax += yPad; yMin = Math.max(0, yMin - yPad * 0.4);
  const X = (x) => padL + ((x - xMin) / (xMax - xMin)) * (width - padL - padR);
  const Y = (y) => padT + (1 - (y - yMin) / (yMax - yMin)) * (height - padT - padB);

  ctx.strokeStyle = GRID; ctx.fillStyle = SOFT; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const v = yMin + ((yMax - yMin) * i) / 4;
    const y = Y(v);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(width - padR, y); ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(fmt(v, options.yDigits || 0), padL - 6, y + 4);
  }
  ctx.textAlign = 'center';
  const step = Math.max(1, Math.round(points.length / 6));
  points.forEach((p, i) => {
    if (i % step === 0 || i === points.length - 1) ctx.fillText(String(p[0]), X(p[0]), height - 8);
  });

  if (options.area !== false) {
    ctx.beginPath();
    points.forEach((p, i) => (i === 0 ? ctx.moveTo(X(p[0]), Y(p[1])) : ctx.lineTo(X(p[0]), Y(p[1]))));
    ctx.lineTo(X(xMax), Y(yMin)); ctx.lineTo(X(xMin), Y(yMin)); ctx.closePath();
    ctx.fillStyle = `${color}22`; ctx.fill();
  }
  ctx.beginPath();
  points.forEach((p, i) => (i === 0 ? ctx.moveTo(X(p[0]), Y(p[1])) : ctx.lineTo(X(p[0]), Y(p[1]))));
  ctx.strokeStyle = color; ctx.lineWidth = 2.2; ctx.stroke();
  const last = points[points.length - 1];
  ctx.beginPath(); ctx.arc(X(last[0]), Y(last[1]), 3.6, 0, Math.PI * 2);
  ctx.fillStyle = color; ctx.fill();
  ctx.textAlign = 'right'; ctx.fillStyle = INK;
  ctx.font = 'bold 12.5px system-ui, sans-serif';
  ctx.fillText(`${fmt(last[1], options.yDigits || 0)}${options.unit || ''}`, X(last[0]), Y(last[1]) - 9);

  // Optional callouts for named points: options.marks = [{x, label, dy}]
  // (dy offsets the label from the point, negative above). A ringed dot marks
  // the point so the label's subject is unambiguous in a screenshot.
  for (const mark of options.marks || []) {
    const p = points.find((q) => q[0] === mark.x);
    if (!p) continue;
    const cx = Math.min(Math.max(X(p[0]), padL + 34), width - padR - 34);
    ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 4.2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff'; ctx.fill();
    ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 4.2, 0, Math.PI * 2);
    ctx.strokeStyle = color; ctx.lineWidth = 2.2; ctx.stroke();
    ctx.fillStyle = INK; ctx.textAlign = 'center';
    ctx.font = 'bold 11.5px system-ui, sans-serif';
    ctx.fillText(mark.label, cx, Y(p[1]) + (mark.dy ?? -12));
  }
}

// Vertical bars for [label, value] rows. options: {color, unit, digits}
export function barChart(canvas, rows, options = {}) {
  const { ctx, width, height } = setup(canvas, options.height || 240);
  const color = options.color || '#2456a6';
  const padL = 46, padR = 10, padT = 18, padB = 28;
  const max = Math.max(...rows.map((r) => r[1])) * 1.12;
  const Y = (v) => padT + (1 - v / max) * (height - padT - padB);
  ctx.strokeStyle = GRID; ctx.fillStyle = SOFT;
  for (let i = 0; i <= 4; i++) {
    const v = (max * i) / 4;
    ctx.beginPath(); ctx.moveTo(padL, Y(v)); ctx.lineTo(width - padR, Y(v)); ctx.stroke();
    ctx.textAlign = 'right'; ctx.fillText(fmt(v, options.digits || 0), padL - 6, Y(v) + 4);
  }
  const slot = (width - padL - padR) / rows.length;
  rows.forEach((r, i) => {
    const bw = Math.min(46, slot * 0.62);
    const x = padL + slot * i + (slot - bw) / 2;
    ctx.fillStyle = color;
    ctx.fillRect(x, Y(r[1]), bw, Y(0) - Y(r[1]));
    ctx.fillStyle = INK; ctx.textAlign = 'center';
    ctx.font = 'bold 11.5px system-ui, sans-serif';
    ctx.fillText(`${fmt(r[1], options.digits || 0)}${options.unit || ''}`, x + bw / 2, Y(r[1]) - 5);
    ctx.font = '12px system-ui, sans-serif'; ctx.fillStyle = SOFT;
    ctx.fillText(String(r[0]), x + bw / 2, height - 9);
  });
}

// Horizontal bars for [label, value] rows, longest first. options: {color, digits, unit}
export function hbarChart(canvas, rows, options = {}) {
  const rowH = 25;
  const { ctx, width, height } = setup(canvas, rows.length * rowH + 8);
  const color = options.color || '#2456a6';
  const padL = 108, padR = 64;
  const max = Math.max(...rows.map((r) => r[1]));
  rows.forEach((r, i) => {
    const y = i * rowH + 4;
    ctx.fillStyle = INK; ctx.textAlign = 'right';
    ctx.font = '12.5px system-ui, sans-serif';
    ctx.fillText(r[0], padL - 8, y + 15);
    const bw = ((width - padL - padR) * r[1]) / max;
    ctx.fillStyle = color;
    ctx.fillRect(padL, y + 3, bw, rowH - 9);
    ctx.fillStyle = SOFT; ctx.textAlign = 'left';
    ctx.fillText(`${fmt(r[1], options.digits || 0)}${options.unit || ''}`, padL + bw + 7, y + 15);
  });
  return height;
}

// Donut for [{label, value, color}]. Draws the total in the middle.
export function donut(canvas, parts, options = {}) {
  const size = options.size || 230;
  const { ctx, width } = setup(canvas, size);
  const cx = width / 2, cy = size / 2, r = Math.min(width, size) / 2 - 8, inner = r * 0.62;
  const total = parts.reduce((s, p) => s + p.value, 0);
  let a = -Math.PI / 2;
  for (const p of parts) {
    const sweep = (p.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, a, a + sweep);
    ctx.arc(cx, cy, inner, a + sweep, a, true);
    ctx.closePath();
    ctx.fillStyle = p.color; ctx.fill();
    a += sweep;
  }
  ctx.fillStyle = INK; ctx.textAlign = 'center';
  ctx.font = 'bold 19px system-ui, sans-serif';
  ctx.fillText(options.centerTop || '', cx, cy - 2);
  ctx.font = '12px system-ui, sans-serif'; ctx.fillStyle = SOFT;
  ctx.fillText(options.centerBottom || '', cx, cy + 15);
}

// Population pyramid for rows of [band, male, female], youngest first.
// A centre line and a millions scale along the bottom give the bars a measure.
export function pyramid(canvas, rows) {
  const rowH = 19;
  const { ctx, width } = setup(canvas, rows.length * rowH + 44);
  const mid = width / 2;
  const max = Math.max(...rows.flatMap((r) => [r[1], r[2]])) * 1.08;
  const scale = (mid - 56) / max;
  ctx.strokeStyle = GRID; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(mid, 0); ctx.lineTo(mid, rows.length * rowH + 4); ctx.stroke();
  ctx.textAlign = 'center';
  rows.forEach((r, i) => {
    const y = i * rowH + 2;
    ctx.fillStyle = '#2456a6';
    ctx.fillRect(mid - r[1] * scale, y + 2, r[1] * scale, rowH - 5);
    ctx.fillStyle = '#b3372c';
    ctx.fillRect(mid, y + 2, r[2] * scale, rowH - 5);
    ctx.fillStyle = INK; ctx.font = '11px system-ui, sans-serif';
    ctx.fillText(r[0], mid, y + rowH - 6);
  });
  ctx.fillStyle = SOFT; ctx.font = '11px system-ui, sans-serif';
  for (const v of [20, 40, 60]) {
    if (v > max) continue;
    ctx.fillText(String(v), mid - v * scale, rows.length * rowH + 15);
    ctx.fillText(String(v), mid + v * scale, rows.length * rowH + 15);
  }
  ctx.fillText('0', mid, rows.length * rowH + 15);
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'left'; ctx.fillText('Male · millions', 6, rows.length * rowH + 34);
  ctx.textAlign = 'right'; ctx.fillText('Female · millions', width - 6, rows.length * rowH + 34);
}
