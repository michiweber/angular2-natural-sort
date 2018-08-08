/*
 * Natural Sort algorithm for Javascript - Version 0.8.1 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 */

"use strict";

export class NaturalSort {

  /* Regular Expressions */
  private static re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private static sre = /^\s+|\s+$/g;
  private static snre = /\s+/g;
  private static dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private static hre = /^0x[0-9a-f]+$/i;
  private static ore = /^0/;
  private static dot = /^\d+(?:\.\d+)+$/;

  public static SORT(a: any, b: any, insensitive = false): number {

    const x = NaturalSort.i(a, insensitive);
    const y = NaturalSort.i(b, insensitive);

    const xN = x.replace(NaturalSort.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');
    const yN = y.replace(NaturalSort.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');

    const xD = parseInt((<any>x).match(NaturalSort.hre), 16) || (xN.length !== 1 && Date.parse(x));
    const yD = parseInt((<any>y).match(NaturalSort.hre), 16) || xD && y.match(NaturalSort.dre) && Date.parse(y) || null;

    /* Date */
    if (yD) { if (xD < yD) { return -1; } else if (xD > yD) { return 1; } }

    /* Iterate */
    const xNl = xN.length;
    const yNl = yN.length;
    const xyNMax = Math.max(xNl, yNl);

    for (let i = 0; i < xyNMax; i++) {

      let oFxNcL = NaturalSort.normChunk(xN[i] || '', xNl);
      let oFyNcL = NaturalSort.normChunk(yN[i] || '', yNl);

      let oFxNcLS = '' + oFxNcL;
      let oFyNcLS = '' + oFyNcL;

      const oFxNcLSL = oFxNcLS.length;
      const oFyNcLSL = oFyNcLS.length;

      if (oFxNcLSL !== oFyNcLSL && (oFxNcLS[0] === '0' || oFyNcLS[0] === '0')) {
        const max = Math.max(oFxNcLSL, oFyNcLSL);
        oFxNcLS = NaturalSort.fill(oFxNcLS, max);
        oFxNcL = typeof oFxNcL === 'number' ? parseFloat(oFxNcLS) : oFxNcLS;
        oFyNcLS = NaturalSort.fill(oFyNcLS, max);
        oFyNcL = typeof oFyNcLS === 'number' ? parseFloat(oFyNcLS) : oFyNcLS;
      }

      if ((x || '').match(NaturalSort.dot) !== null && (y || '').match(NaturalSort.dot) !== null) {
        return this.dotted(('' + x).split('.'), ('' + y).split('.'));
      }

      if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
        return isNaN(oFxNcL) ? 1 : -1;
      }

      if (/[^\x00-\x80]/.test(oFxNcL + oFyNcL) && oFxNcL.localeCompare) {
        const comp = oFxNcL.localeCompare(oFyNcL);
        if (comp !== 0) {
          return comp / Math.abs(comp);
        }
      }

      if (oFxNcL < oFyNcL) {
        return -1;
      } else if (oFxNcL > oFyNcL) {
        return 1;
      }

    }

  }

  private static dotted(a: any[], b: any[]): number {
    a.reverse();
    b.reverse();
    const count  = Math.max(a.length, b.length);
    let result = 0;
    for (let i = 0; i < count; i++) {
      let dx = a[i];
      let dy = b[i];
      if (dx !== dy) {
        if (dx.length !== dy.length && (dx[0] === '0' || dy[0] === '0')) {
          const max = Math.max(dx.length, dy.length);
          dx = NaturalSort.fill(dx, max);
          dy = NaturalSort.fill(dy, max);
        }
        result = parseFloat(dx) < parseFloat(dy) ? -1 : 1;
      }
    }
    return result;
  }

  private static fill(s: string, c: number): string {
    for (let i = s.length; i < c; i++) {
      s += '0';
    }
    return s;
  }

  private static i(s: any, insensitive: boolean) {
    return (insensitive && ('' + s).toLowerCase() || '' + s).replace(NaturalSort.sre, '');
  }

  private static normChunk(s: any, l: any) {
    return (!s.match(NaturalSort.ore) || l == 1) && parseFloat(s) || s.replace(NaturalSort.snre, ' ').replace(NaturalSort.sre, '') || 0;
  }

}
