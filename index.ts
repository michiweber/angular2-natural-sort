/*
 * Natural Sort algorithm for Javascript - Version 0.8.1 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 */

"use strict";

export class NaturalSort {

    private static re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
    private static sre = /^\s+|\s+$/g;
    private static snre = /\s+/g;
    private static dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
    private static hre = /^0x[0-9a-f]+$/i;
    private static ore = /^0/;
    private static oFxNcL: any;
    private static oFyNcL: any;

    public static SORT(a: any, b: any): number {
        const x = NaturalSort.i(a);
        const y = NaturalSort.i(b);

        const xN = x.replace(NaturalSort.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');
        const yN = y.replace(NaturalSort.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');

        const xD = parseInt((<any>x).match(NaturalSort.hre), 16) || (xN.length !== 1 && Date.parse(x));
        const yD = parseInt((<any>y).match(NaturalSort.hre), 16) || xD && y.match(NaturalSort.dre) && Date.parse(y) || null;

        if (yD) {
            if (xD < yD) { return -1; }
            else if (xD > yD) { return 1; }
        }
        for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
            NaturalSort.oFxNcL = NaturalSort.normChunk(xN[cLoc] || '', xNl);
            NaturalSort.oFyNcL = NaturalSort.normChunk(yN[cLoc] || '', yNl);
            if (isNaN(NaturalSort.oFxNcL) !== isNaN(NaturalSort.oFyNcL)) {
                return isNaN(NaturalSort.oFxNcL) ? 1 : -1;
            }
            if (/[^\x00-\x80]/.test(NaturalSort.oFxNcL + NaturalSort.oFyNcL) && NaturalSort.oFxNcL.localeCompare) {
                var comp = NaturalSort.oFxNcL.localeCompare(NaturalSort.oFyNcL);
                return comp / Math.abs(comp);
            }
            if (NaturalSort.oFxNcL < NaturalSort.oFyNcL) { return -1; }
            else if (NaturalSort.oFxNcL > NaturalSort.oFyNcL) { return 1; }
        }
    }

    private static i(s: any) {
        return (('' + s).toLowerCase() || '' + s).replace(NaturalSort.sre, '');
    }

    private static normChunk(s: any, l: any) {
        return (!s.match(NaturalSort.ore) || l == 1) && parseFloat(s) || s.replace(NaturalSort.snre, ' ').replace(NaturalSort.sre, '') || 0;
    }

}
