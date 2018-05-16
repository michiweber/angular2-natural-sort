import { NaturalSort } from './index';

declare var describe: any;
declare var it: any;
declare var expect: any;

describe('NaturalSort', () => {
  describe('different values types', () => {
    it('number always comes first', () => {
      expect(['a',1].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([1, 'a']);
    });
    it('number vs numeric string - should remain unchanged (error in chrome)', () => {
      expect(['1',1].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['1',1]);
    });
    it('padding numeric string vs number', () => {
      expect(['02',3,2,'01'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['01','02',2,3]);
    });
    it('padding numeric string vs number', () => {
      expect(['02',3,2,'01'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['01','02',2,3]);
    });
  });
  describe('datetime', () => {
    it('similar dates', () => {
      expect(['01/01/2008','01/10/2008','01/01/1992','01/01/1991'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['01/01/1991','01/01/1992','01/01/2008','01/10/2008']);
    });
    it('similar dates', () => {
      expect(['10/12/2008','10/11/2008','10/11/2007','10/12/2007'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['10/11/2007','10/12/2007','10/11/2008','10/12/2008']);
    });
    it('javascript toString(), different timezones', () => {
      expect([
        'Wed Jan 01 2010 00:00:00 GMT-0800 (Pacific Standard Time)',
        'Thu Dec 31 2009 00:00:00 GMT-0800 (Pacific Standard Time)',
        'Wed Jan 01 2010 00:00:00 GMT-0500 (Eastern Standard Time)'
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        'Thu Dec 31 2009 00:00:00 GMT-0800 (Pacific Standard Time)',
        'Wed Jan 01 2010 00:00:00 GMT-0500 (Eastern Standard Time)',
        'Wed Jan 01 2010 00:00:00 GMT-0800 (Pacific Standard Time)'
      ]);
    });
    it('similar dates', () => {
      expect(['10/12/2008','10/11/2008','10/11/2007','10/12/2007'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['10/11/2007','10/12/2007','10/11/2008','10/12/2008']);
    });
    it('Date.toString(), Date.toLocaleString()', () => {
      expect([
        'Saturday, July 3, 2010',
        'Monday, August 2, 2010',
        'Monday, May 3, 2010'
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        'Monday, May 3, 2010',
        'Saturday, July 3, 2010',
        'Monday, August 2, 2010'
      ]);
    });
    it('Date.toUTCString()', () => {
      expect([
        'Mon, 15 Jun 2009 20:45:30 GMT',
        'Mon, 3 May 2010 17:45:30 GMT',
        'Mon, 15 Jun 2009 17:45:30 GMT'
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        'Mon, 15 Jun 2009 17:45:30 GMT',
        'Mon, 15 Jun 2009 20:45:30 GMT',
        'Mon, 3 May 2010 17:45:30 GMT'
      ]);
    });
    it('', () => {
      expect([
        'Saturday, July 3, 2010 1:45 PM',
        'Saturday, July 3, 2010 1:45 AM',
        'Monday, August 2, 2010 1:45 PM',
        'Monday, May 3, 2010 1:45 PM'
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        'Monday, May 3, 2010 1:45 PM',
        'Saturday, July 3, 2010 1:45 AM',
        'Saturday, July 3, 2010 1:45 PM',
        'Monday, August 2, 2010 1:45 PM'
      ]);
    });
    it('', () => {
      expect([
        'Saturday, July 3, 2010 1:45:30 PM',
        'Saturday, July 3, 2010 1:45:29 PM',
        'Monday, August 2, 2010 1:45:01 PM',
        'Monday, May 3, 2010 1:45:00 PM'
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        'Monday, May 3, 2010 1:45:00 PM',
        'Saturday, July 3, 2010 1:45:29 PM',
        'Saturday, July 3, 2010 1:45:30 PM',
        'Monday, August 2, 2010 1:45:01 PM'
      ]);
    });
    it('', () => {
      expect([
        '2/15/2009 1:45 PM',
        '1/15/2009 1:45 PM',
        '2/15/2009 1:45 AM'
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        '1/15/2009 1:45 PM',
        '2/15/2009 1:45 AM',
        '2/15/2009 1:45 PM'
      ]);
    });
    it('ISO8601 Dates', () => {
      expect([
        '2010-06-15T13:45:30',
        '2009-06-15T13:45:30',
        '2009-06-15T01:45:30.2',
        '2009-01-15T01:45:30'
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        '2009-01-15T01:45:30',
        '2009-06-15T01:45:30.2',
        '2009-06-15T13:45:30',
        '2010-06-15T13:45:30'
      ]);
    });
    it('ISO8601-ish YYYY-MM-DDThh:mm:ss - which does not parse into a Date instance', () => {
      expect([
        '2010-06-15 13:45:30',
        '2009-06-15 13:45:30',
        '2009-01-15 01:45:30'
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        '2009-01-15 01:45:30',
        '2009-06-15 13:45:30',
        '2010-06-15 13:45:30'
      ]);
    });
    it('RFC1123 testing different timezones', () => {
      expect([
        'Mon, 15 Jun 2009 20:45:30 GMT',
        'Mon, 15 Jun 2009 20:45:30 PDT',
        'Mon, 15 Jun 2009 20:45:30 EST',
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        'Mon, 15 Jun 2009 20:45:30 GMT',
        'Mon, 15 Jun 2009 20:45:30 EST',
        'Mon, 15 Jun 2009 20:45:30 PDT'
      ]);
    });
    it('unix epoch, Date.getTime()', () => {
      expect([
        '1245098730000',
        '14330728000',
        '1245098728000'
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        '14330728000',
        '1245098728000',
        '1245098730000'
      ]);
    });
    it('mixed Date types', () => {
      expect([
        new Date('2001-01-10'),
        '2015-01-01',
        new Date('2001-01-01'),
        '1998-01-01'
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        '1998-01-01',
        new Date('2001-01-01'),
        new Date('2001-01-10'),
        '2015-01-01'
      ]);
    });
  });
  describe('version number strings', () => {
    it('close version numbers', () => {
      expect(['1.0.2','1.0.1','1.0.0','1.0.9'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['1.0.0','1.0.1','1.0.2','1.0.9']);
    });
    it('more version numbers', () => {
      expect(['1.1.100', '1.1.1', '1.1.10', '1.1.54'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['1.1.1', '1.1.10', '1.1.54', '1.1.100']);
    });
    it('multi-digit branch release', () => {
      expect(['1.0.03','1.0.003','1.0.002','1.0.0001'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['1.0.0001','1.0.002','1.0.003','1.0.03']);
    });
    it('close version numbers', () => {
      expect(['1.1beta','1.1.2alpha3','1.0.2alpha3','1.0.2alpha1','1.0.1alpha4','2.1.2','2.1.1'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['1.0.1alpha4','1.0.2alpha1','1.0.2alpha3','1.1.2alpha3','1.1beta','2.1.1','2.1.2']);
    });
    it('string first', () => {
      expect(['myrelease-1.1.3','myrelease-1.2.3','myrelease-1.1.4','myrelease-1.1.1','myrelease-1.0.5'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['myrelease-1.0.5','myrelease-1.1.1','myrelease-1.1.3','myrelease-1.1.4','myrelease-1.2.3']);
    });
  });
  describe('numerics', () => {
    it('string vs number', () => {
      expect(['10',9,2,'1','4'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['1',2,'4',9,'10']);
    });
    it('0 left-padded numbers', () => {
      expect(['0001','002','001'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['0001','001','002']);
    });
    it('0 left-padded numbers and regular numbers', () => {
      expect([2,1,'1','0001','002','02','001'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([1,'1','0001','001',2,'002','02',]);
    });
    it('decimal string vs decimal, different precision', () => {
      expect(['10.0401',10.022,10.042,'10.021999'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['10.021999',10.022,'10.0401',10.042]);
    });
    it('decimal string vs decimal, same precision', () => {
      expect(['10.04',10.02,10.03,'10.01'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['10.01',10.02,10.03,'10.04']);
    });
    it('float/decimal with \'F\' or \'D\' notation', () => {
      expect(['10.04f','10.039F','10.038d','10.037D'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['10.037D','10.038d','10.039F','10.04f']);
    });
    it('not foat/decimal notation', () => {
      expect(['10.004Z','10.039T','10.038ooo','10.037g'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['10.004Z','10.037g','10.038ooo','10.039T']);
    });
    it('scientific notation', () => {
      expect(['1.528535047e5','1.528535047e7','1.52e15','1.528535047e3','1.59e-3'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['1.59e-3','1.528535047e3','1.528535047e5','1.528535047e7','1.52e15']);
    });
    it('negative numbers as strings', () => {
      expect(['-1','-2','4','-3','0','-5'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['-5','-3','-2','-1','0','4']);
    });
    it('negative numbers as strings - mixed input type, string + numeric', () => {
      expect([-1,'-2',4,-3,'0','-5'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['-5',-3,'-2',-1,'0',4]);
    });
    it('negative floats - all numeric', () => {
      expect([-2.01,-2.1,4.144,4.1,-2.001,-5].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([-5,-2.1,-2.01,-2.001,4.1,4.144]);
    });
  });
  describe('IP addresses', () => {
    it('', () => {
      expect([
        '192.168.0.100',
        '192.168.0.1',
        '192.168.1.1',
        '192.168.0.250',
        '192.168.1.123',
        '10.0.0.2',
        '10.0.0.1'
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        '10.0.0.1',
        '10.0.0.2',
        '192.168.0.1',
        '192.168.0.100',
        '192.168.0.250',
        '192.168.1.1',
        '192.168.1.123'
      ]);
    });
  });
  describe('filenames', () => {
    it('simple image filenames', () => {
      expect(['img12.png','img10.png','img2.png','img1.png'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['img1.png','img2.png','img10.png','img12.png']);
    });
    it('complex filenames', () => {
      expect(['car.mov','01alpha.sgi','001alpha.sgi','my.string_41299.tif','organic2.0001.sgi'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['001alpha.sgi','01alpha.sgi','car.mov','my.string_41299.tif','organic2.0001.sgi']);
    });
    it('unix filenames', () => {
      expect([
        './system/kernel/js/01_ui.core.js',
        './system/kernel/js/00_jquery-1.3.2.js',
        './system/kernel/js/02_my.desktop.js'
      ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([
        './system/kernel/js/00_jquery-1.3.2.js',
        './system/kernel/js/01_ui.core.js',
        './system/kernel/js/02_my.desktop.js'
      ]);
    });
  });
  describe('space(s) as first character(s)', () => {
    it('', () => {
      expect(['alpha',' 1','  3',' 2',0].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([0,' 1',' 2','  3','alpha']);
    });
  });
  describe('empty strings and space character', () => {
    it('', () => {
      expect(['10023','999','',2,5.663,5.6629].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['',2,5.663,5.6629,'999','10023']);
    });
    it('', () => {
      expect([0,'0',''].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([0,'0','']);
    });
  });
  describe('hex', () => {
    it('real hex numbers', () => {
      expect([ '0xA','0x9','0x99' ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([ '0x9','0xA','0x99']);
    });
    it('', () => {
      expect([ '0xZZ','0xVVV','0xVEV','0xUU' ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([ '0xUU','0xVEV','0xVVV','0xZZ' ]);
    });
  });
  describe('unicode', () => {
    it('basic latin', () => {
      expect([ '\u0044', '\u0055', '\u0054', '\u0043' ].sort((a,b) => NaturalSort.SORT(a, b))).toEqual([ '\u0043', '\u0044', '\u0054', '\u0055' ]);
    });
  });
  describe('case insensitive support', () => {
    it('case sensitive pre-sorted array', () => {
      expect(['A', 'b', 'C', 'd', 'E', 'f'].sort((a,b) => NaturalSort.SORT(a, b, true))).toEqual(['A', 'b', 'C', 'd', 'E', 'f']);
    });
    it('case sensitive un-sorted array', () => {
      expect(['A', 'C', 'E', 'b', 'd', 'f'].sort((a,b) => NaturalSort.SORT(a, b, true))).toEqual(['A', 'b', 'C', 'd', 'E', 'f']);
    });
    it('case sensitive pre-sorted array', () => {
      expect(['A', 'C', 'E', 'b', 'd', 'f'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['A', 'C', 'E', 'b', 'd', 'f']);
    });
    it('case sensitive un-sorted array', () => {
      expect(['A', 'b', 'C', 'd', 'E', 'f'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['A', 'C', 'E', 'b', 'd', 'f']);
    });
  });
  describe('rosetta code natural sort small test set', () => {
    it('Ignoring leading spaces', () => {
      expect(['ignore leading spaces: 2-2', ' ignore leading spaces: 2-1', '  ignore leading spaces: 2+0', '   ignore leading spaces: 2+1'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['  ignore leading spaces: 2+0', '   ignore leading spaces: 2+1', ' ignore leading spaces: 2-1', 'ignore leading spaces: 2-2']);
    });
    it('Ignoring multiple adjacent spaces (m.a.s)', () => {
      expect(['ignore m.a.s spaces: 2-2', 'ignore m.a.s  spaces: 2-1', 'ignore m.a.s   spaces: 2+0', 'ignore m.a.s    spaces: 2+1'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['ignore m.a.s   spaces: 2+0', 'ignore m.a.s    spaces: 2+1', 'ignore m.a.s  spaces: 2-1', 'ignore m.a.s spaces: 2-2']);
    });
    it('Equivalent whitespace characters', () => {
      expect(['Equiv. spaces: 3-3', 'Equiv.\rspaces: 3-2', 'Equiv.\x0cspaces: 3-1', 'Equiv.\x0bspaces: 3+0', 'Equiv.\nspaces: 3+1', 'Equiv.\tspaces: 3+2'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['Equiv.\x0bspaces: 3+0', 'Equiv.\nspaces: 3+1', 'Equiv.\tspaces: 3+2', 'Equiv.\x0cspaces: 3-1', 'Equiv.\rspaces: 3-2', 'Equiv. spaces: 3-3']);
    });
    it('Case Indepenent sort (naturalSort.insensitive = true)', () => {
      expect(['cASE INDEPENENT: 3-2', 'caSE INDEPENENT: 3-1', 'casE INDEPENENT: 3+0', 'case INDEPENENT: 3+1'].sort((a,b) => NaturalSort.SORT(a, b, true))).toEqual(['casE INDEPENENT: 3+0', 'case INDEPENENT: 3+1', 'caSE INDEPENENT: 3-1', 'cASE INDEPENENT: 3-2']);
    });
    it('Numeric fields as numerics', () => {
      expect(['foo100bar99baz0.txt', 'foo100bar10baz0.txt', 'foo1000bar99baz10.txt', 'foo1000bar99baz9.txt'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['foo100bar10baz0.txt', 'foo100bar99baz0.txt', 'foo1000bar99baz9.txt', 'foo1000bar99baz10.txt']);
    });
    it('Title sorts', () => {
      expect(['The Wind in the Willows', 'The 40th step more', 'The 39 steps', 'Wanda'].sort((a,b) => NaturalSort.SORT(a, b))).toEqual(['The 39 steps', 'The 40th step more', 'The Wind in the Willows', 'Wanda']);
    });
    it('Equivalent accented characters (and case) (naturalSort.insensitive = true)', () => {
      expect(['Equiv. \xfd accents: 2-2', 'Equiv. \xdd accents: 2-1', 'Equiv. y accents: 2+0', 'Equiv. Y accents: 2+1'].sort((a,b) => NaturalSort.SORT(a, b, true))).toEqual(['Equiv. y accents: 2+0', 'Equiv. Y accents: 2+1', 'Equiv. \xfd accents: 2-2', 'Equiv. \xdd accents: 2-1']);
    });
  });
  describe('contributed tests', () => {
    it('contributed by Bob Zeiner (Chrome not stable sort)', () => {
      expect(['T78', 'U17', 'U10', 'U12', 'U14', '745', 'U7', '485', 'S16', 'S2', 'S22', '1081', 'S25', '1055', '779', '776', '771', '44', '4', '87', '1091', '42', '480', '952', '951', '756', '1000', '824', '770', '666', '633', '619', '1', '991', '77H', 'PIER-7', '47', '29', '9', '77L', '433'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['1', '4', '9', '29', '42', '44', '47', '77H', '77L', '87', '433', '480', '485', '619', '633', '666', '745', '756', '770', '771', '776', '779', '824', '951', '952', '991', '1000', '1055', '1081', '1091', 'PIER-7', 'S2', 'S16', 'S22', 'S25', 'T78', 'U7', 'U10', 'U12', 'U14', 'U17']);
    });
    it('contributed by Scott', () => {
      expect([
        'FSI stop, Position: 5',
        'Mail Group stop, Position: 5',
        'Mail Group stop, Position: 5',
        'FSI stop, Position: 6',
        'FSI stop, Position: 6',
        'Newsstand stop, Position: 4',
        'Newsstand stop, Position: 4',
        'FSI stop, Position: 5'
      ].sort((a, b) => NaturalSort.SORT(a, b))).toEqual([
        'FSI stop, Position: 5',
        'FSI stop, Position: 5',
        'FSI stop, Position: 6',
        'FSI stop, Position: 6',
        'Mail Group stop, Position: 5',
        'Mail Group stop, Position: 5',
        'Newsstand stop, Position: 4',
        'Newsstand stop, Position: 4'
      ]);
    });
    it('issue #2 - undefined support - jarvinen pekka', () => {
      expect([2, 10, 1, 'azd', undefined, 'asd'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual([1, 2, 10, 'asd', 'azd', undefined]);
    });
    it('issue #2 - undefined support - jarvinen pekka', () => {
      expect([undefined, undefined, undefined, 1, undefined].sort((a, b) => NaturalSort.SORT(a, b))).toEqual([1, undefined, undefined, undefined, undefined]);
    });
    it('issue #3 - invalid numeric string sorting - guilermo.dev', () => {
      expect(['-1', '-2', '4', '-3', '0', '-5'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['-5', '-3', '-2', '-1', '0', '4']);
    });
    it('issue #5 - invalid sort order - Howie Schecter (naturalSort.insensitive = false)', () => {
      expect(['9', '11', '22', '99', 'A', 'aaaa', 'bbbb', 'Aaaa', 'aAaa', 'aa', 'AA', 'Aa', 'aA', 'BB', 'bB', 'aaA', 'AaA', 'aaa'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['9', '11', '22', '99', 'A', 'AA', 'Aa', 'AaA', 'Aaaa', 'BB', 'aA', 'aAaa', 'aa', 'aaA', 'aaa', 'aaaa', 'bB', 'bbbb']);
    });
    it('alphanumeric - number first', () => {
      expect(['5D', '1A', '2D', '33A', '5E', '33K', '33D', '5S', '2C', '5C', '5F', '1D', '2M'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['1A', '1D', '2C', '2D', '2M', '5C', '5D', '5E', '5F', '5S', '33A', '33D', '33K']);
    });
    it('issue #16 - Sorting incorrect when there is a space - adrien-be', () => {
      expect(['img 99', 'img199', 'imga99', 'imgz99'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['img 99', 'img199', 'imga99', 'imgz99']);
    });
    it('issue #16 - expanded test', () => {
      expect(['img199', 'img 99', 'imga99', 'imgz 99', 'imgb99', 'imgz199'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['img 99', 'img199', 'imga99', 'imgb99', 'imgz 99', 'imgz199']);
    });
    it('issue #18 - Any zeros that precede a number messes up the sorting - menixator', () => {
      expect(['1', '02', '3'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['1', '02', '3']);
    });
    it('issue #13 - [\'1.100\', \'1.10\', \'1.1\', \'1.54\'] etc do not sort properly... - rubenstolk', () => {
      expect(['1.100', '1.1', '1.10', '1.54'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['1.1', '1.10', '1.54', '1.100']);
    });
    it('issue #13 - [\'v1.100\', \'v1.10\', \'v1.1\', \'v1.54\'] etc do not sort properly... - rubenstolk (bypass float coercion)', () => {
      expect(['v1.100', 'v1.1', 'v1.10', 'v1.54'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['v1.1', 'v1.10', 'v1.54', 'v1.100']);
    });
    it('issue #14 - Very large numbers make sorting very slow - Mottie', () => {
      expect([
        'MySnmp 1234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
        'MySnmp 4234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
        'MySnmp 2234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
        'MySnmp 3234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567'
      ].sort((a, b) => NaturalSort.SORT(a, b))).toEqual([
        'MySnmp 1234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
        'MySnmp 2234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
        'MySnmp 3234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
        'MySnmp 4234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567'
      ]);
    });
    it('issue #21 - javascript error', () => {
      expect(['bar.1-2', 'bar.1'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['bar.1', 'bar.1-2']);
    });
    it('PR #19 - [\'SomeString\', \'SomeString 1\'] bombing on \'undefined is not an object\' - dannycochran', () => {
      expect(['SomeString', 'SomeString 1'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['SomeString', 'SomeString 1']);
    });
    it('issue #9 - Sorting umlauts characters \xC4, \xD6, \xDC - diogoalves', () => {
      expect(['Udet', '\xDCbelacker', 'Uell', '\xDClle', 'Ueve', '\xDCxk\xFCll', 'Uffenbach'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['\xDCbelacker', 'Udet', 'Uell', 'Ueve', 'Uffenbach', '\xDClle', '\xDCxk\xFCll']);
    });
    it('https://github.com/overset/javascript-natural-sort/issues/13 - [\'2.2 sec\',\'1.9 sec\',\'1.53 sec\'] - padded by spaces - harisb', () => {
      expect(['2.2 sec', '1.9 sec', '1.53 sec'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['1.53 sec', '1.9 sec', '2.2 sec']);
    });
    it('https://github.com/overset/javascript-natural-sort/issues/13 - [\'2.2sec\',\'1.9sec\',\'1.53sec\'] - no padding - harisb', () => {
      expect(['2.2sec', '1.9sec', '1.53sec'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['1.53sec', '1.9sec', '2.2sec']);
    });
  });
  describe('michiweber issues', () => {
    it('issue #1', () => {
      expect(['18_0306 Lunchuno (Office Delivery)', '18_0307 Cha Cha Portfoliobereinigung', '18_04 Freizeit', '18_10 EBB', '18_0305 Struktur und Organisation Gastronomie', '18_0401 Strategy Bad 2020'].sort((a, b) => NaturalSort.SORT(a, b))).toEqual(['18_0305 Struktur und Organisation Gastronomie', '18_0306 Lunchuno (Office Delivery)', '18_0307 Cha Cha Portfoliobereinigung', '18_04 Freizeit', '18_0401 Strategy Bad 2020', '18_10 EBB']);
    });
  });
});
