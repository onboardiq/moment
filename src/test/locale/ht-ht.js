import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('ht-ht');

test('parse', function (assert) {
    var i,
        tests =
            'janvye janv._fevriye fevr._mas mas_avril avr._me me_jen jen_jiyè jiyè._out out_septanm sept._oktòb okt._novanm nov._desanm des.'.split(
                '_'
            ),
        testsNoDot =
            'janvye janv_fevriye fevr_mas mas_avril avr_me me_jen jen_jiyè jiyè_out out_septanm sept_oktòb okt_novanm nov_desanm des'.split(
                '_'
            );

    function equalTest(input, mmm, i) {
        assert.equal(
            moment(input, mmm).month(),
            i,
            input + ' should be month ' + (i + 1)
        );
    }

    function equalTestStrict(input, mmm, monthIndex) {
        assert.equal(
            moment(input, mmm, true).month(),
            monthIndex,
            input + ' ' + mmm + ' should be strict month ' + (monthIndex + 1)
        );
    }

    for (i = 0; i < 12; i++) {
        tests[i] = tests[i].split(' ');
        equalTest(tests[i][0], 'MMM', i);
        equalTest(tests[i][1], 'MMM', i);
        equalTest(tests[i][0], 'MMMM', i);
        equalTest(tests[i][1], 'MMMM', i);
        equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);

        equalTestStrict(tests[i][1], 'MMM', i);
        equalTestStrict(tests[i][0], 'MMMM', i);
        equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
        equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
        equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
    }

    for (i = 0; i < 12; i++) {
        testsNoDot[i] = testsNoDot[i].split(' ');
        equalTest(testsNoDot[i][0], 'MMM', i);
        equalTest(testsNoDot[i][1], 'MMM', i);
        equalTest(testsNoDot[i][0], 'MMMM', i);
        equalTest(testsNoDot[i][1], 'MMMM', i);
        equalTest(testsNoDot[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTest(testsNoDot[i][1].toLocaleLowerCase(), 'MMMM', i);
        equalTest(testsNoDot[i][0].toLocaleUpperCase(), 'MMMM', i);
        equalTest(testsNoDot[i][1].toLocaleUpperCase(), 'MMMM', i);

        equalTestStrict(testsNoDot[i][1], 'MMM', i);
        equalTestStrict(testsNoDot[i][0], 'MMMM', i);
        equalTestStrict(testsNoDot[i][1].toLocaleLowerCase(), 'MMM', i);
        equalTestStrict(testsNoDot[i][1].toLocaleUpperCase(), 'MMM', i);
        equalTestStrict(testsNoDot[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTestStrict(testsNoDot[i][0].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            [
                'dddd, MMMM Do YYYY, h:mm:ss a',
                'dimanch, fevriye 14 2010, 3:25:50 pm',
            ],
            ['ddd, hA', 'dim., 3PM'],
            ['M Mo MM MMMM MMM', '2 2e 02 fevriye fevr.'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14 14'],
            ['d do dddd ddd dd', '0 0e dimanch dim. di'],
            ['DDD DDDo DDDD', '45 45e 045'],
            ['w wo ww', '6 6e 06'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'pm PM'],
            ['[le] Do [jou nan mwa a]', 'le 14 jou nan mwa a'],
            ['[le] DDDo [jou nan ane a]', 'le 45e jou nan ane a'],
            ['LTS', '15:25:50'],
            ['L', '14/02/2010'],
            ['LL', '14 fevriye 2010'],
            ['LLL', '14 fevriye 2010 15:25'],
            ['LLLL', 'dimanch 14 fevriye 2010 15:25'],
            ['l', '14/2/2010'],
            ['ll', '14 fevr. 2010'],
            ['lll', '14 fevr. 2010 15:25'],
            ['llll', 'dim. 14 fevr. 2010 15:25'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;

    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2017, 0, 1]).format('Mo'), '1ye', '1ye');
    assert.equal(moment([2017, 1, 1]).format('Mo'), '2e', '2e');

    assert.equal(moment([2017, 0, 1]).format('Qo'), '1ye', '1ye');
    assert.equal(moment([2017, 3, 1]).format('Qo'), '2e', '2e');

    assert.equal(moment([2017, 0, 1]).format('Do'), '1ye', '1ye');
    assert.equal(moment([2017, 0, 2]).format('Do'), '2', '2');

    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1ye', '1ye');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2e', '2e');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3e', '3e');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4e', '4e');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5e', '5e');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6e', '6e');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7e', '7e');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8e', '8e');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9e', '9e');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10e', '10e');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11e', '11e');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12e', '12e');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13e', '13e');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14e', '14e');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15e', '15e');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16e', '16e');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17e', '17e');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18e', '18e');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19e', '19e');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20e', '20e');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21e', '21e');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22e', '22e');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23e', '23e');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24e', '24e');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25e', '25e');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26e', '26e');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27e', '27e');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28e', '28e');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29e', '29e');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30e', '30e');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31e', '31e');

    assert.equal(moment([2017, 0, 1]).format('do'), '0e', '0e');
    assert.equal(moment([2017, 0, 2]).format('do'), '1ye', '1ye');

    assert.equal(moment([2017, 0, 4]).format('wo Wo'), '1ye 1ye', '1ye 1ye');
    assert.equal(moment([2017, 0, 11]).format('wo Wo'), '2e 2e', '2e 2e');
});

test('format month', function (assert) {
    var i,
        expected =
            'janvye janv._fevriye fevr._mas mas_avril avr._me me_jen jen_jiyè jiyè._out out_septanm sept._oktòb okt._novanm nov._desanm des.'.split(
                '_'
            );

    for (i = 0; i < expected.length; i++) {
        assert.equal(
            moment([2011, i, 1]).format('MMMM MMM'),
            expected[i],
            expected[i]
        );
    }
});

test('format week', function (assert) {
    var i,
        expected =
            'dimanch dim. di_lendi len. le_madi mad. ma_mèkredi mèk. me_jedi jed. je_vandredi ven. ve_samdi sam. sa'.split(
                '_'
            );

    for (i = 0; i < expected.length; i++) {
        assert.equal(
            moment([2011, 0, 2 + i]).format('dddd ddd dd'),
            expected[i],
            expected[i]
        );
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);

    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
        'kèk segonn',
        '44 segonn = kèk segonn'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'yon minit',
        '45 segonn = yon minit'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'yon minit',
        '89 segonn = yon minit'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 minit',
        '90 segonn = 2 minit'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 minit',
        '44 minit = 44 minit'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'yon èdtan',
        '45 minit = yon èdtan'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'yon èdtan',
        '89 minit = yon èdtan'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 èdtan',
        '90 minit = 2 èdtan'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 èdtan',
        '5 èdtan = 5 èdtan'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 èdtan',
        '21 èdtan = 21 èdtan'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'yon jou',
        '22 èdtan = yon jou'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'yon jou',
        '35 èdtan = yon jou'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 jou',
        '36 èdtan = 2 jou'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'yon jou',
        '1 jou = yon jou'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 jou',
        '5 jou = 5 jou'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 jou',
        '25 jou = 25 jou'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'yon mwa',
        '26 jou = yon mwa'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'yon mwa',
        '30 jou = yon mwa'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'yon mwa',
        '43 jou = yon mwa'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 mwa',
        '46 jou = 2 mwa'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 mwa',
        '75 jou = 2 mwa'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 mwa',
        '76 jou = 3 mwa'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'yon mwa',
        '1 mwa = yon mwa'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 mwa',
        '5 mwa = 5 mwa'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'yon ane',
        '345 jou = yon ane'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 ane',
        '548 jou = 2 ane'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'yon ane',
        '1 ane = yon ane'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 ane',
        '5 ane = 5 ane'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'nan kèk segonn', 'prefix');
    assert.equal(moment(0).from(30000), 'sa gen kèk segonn', 'suffix');
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'nan kèk segonn',
        'nan kèk segonn'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), 'nan 5 jou', 'nan 5 jou');
});

test('same day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'Jodi a nan 12:00',
        'Jodi a nan menm lè a'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'Jodi a nan 12:25',
        'Kounye a plis 25 minit'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'Jodi a nan 13:00',
        'Kounye a plis 1 èdtan'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'Demain nan 12:00',
        'Demain nan menm lè a'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'Jodi a nan 11:00',
        'Kounye a mwens 1 èdtan'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'Ye nan 12:00',
        'Ye nan menm lè a'
    );
});

test('same next week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd [nan] LT'),
            'Jodi + ' + i + ' jou tan kounye a'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [nan] LT'),
            'Jodi + ' + i + ' jou kòmansman jou'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [nan] LT'),
            'Jodi + ' + i + ' jou fen jou'
        );
    }
});

test('same last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd [dènye nan] LT'),
            'Jodi - ' + i + ' jou tan kounye a'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [dènye nan] LT'),
            'Jodi - ' + i + ' jou kòmansman jou'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [dènye nan] LT'),
            'Jodi - ' + i + ' jou fen jou'
        );
    }
});

test('same all else', function (assert) {
    var semenDe_sa = moment().subtract({ w: 1 }),
        semènKounyeA = moment().add({ w: 1 });

    assert.equal(
        semenDe_sa.calendar(),
        semenDe_sa.format('L'),
        '1 semèn de sa'
    );
    assert.equal(
        semènKounyeA.calendar(),
        semènKounyeA.format('L'),
        'nan 1 semèn'
    );

    semenDe_sa = moment().subtract({ w: 2 });
    semènKounyeA = moment().add({ w: 2 });

    assert.equal(
        semenDe_sa.calendar(),
        semenDe_sa.format('L'),
        '2 semèn de sa'
    );
    assert.equal(
        semènKounyeA.calendar(),
        semènKounyeA.format('L'),
        'nan 2 semèn'
    );
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '52 52 52e',
        '1 janvye 2012 ta dwe semèn 52'
    );
    assert.equal(
        moment([2012, 0, 2]).format('w ww wo'),
        '1 01 1ye',
        '2 janvye 2012 ta dwe semèn 1'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '1 01 1ye',
        '8 janvye 2012 ta dwe semèn 1'
    );
    assert.equal(
        moment([2012, 0, 9]).format('w ww wo'),
        '2 02 2e',
        '9 janvye 2012 ta dwe semèn 2'
    );
    assert.equal(
        moment([2012, 0, 15]).format('w ww wo'),
        '2 02 2e',
        '15 janvye 2012 ta dwe semèn 2'
    );
});
