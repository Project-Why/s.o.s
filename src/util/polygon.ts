export function isPointInPolygon(polyPoints: number[][], x: number, y: number) {
  let inside = false;
  for (
    let i = 0, j = polyPoints.length - 1;
    i < polyPoints.length;
    j = i, i += 1
  ) {
    const xi = polyPoints[i][0];
    const yi = polyPoints[i][1];
    const xj = polyPoints[j][0];
    const yj = polyPoints[j][1];

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
