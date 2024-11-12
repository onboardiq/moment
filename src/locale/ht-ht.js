//! moment.js locale configuration
//! locale : Haitian Creole [ht-ht]
//! author : Horacio Bertorello

import moment from '../moment';

var monthsStrictRegex =
        /^(janvye|fevriye|mas|avril|me|jen|jiyè|out|septanm|oktòb|novanm|desanm)/i,
    monthsShortStrictRegex =
        /(janv\.?|fevr\.?|mas|avr\.?|me|jen|jiyè\.?|out|sept\.?|okt\.?|nov\.?|des\.?)/i,
    monthsRegex =
        /(janv\.?|fevr\.?|mas|avr\.?|me|jen|jiyè\.?|out|sept\.?|okt\.?|nov\.?|des\.?|janvye|fevriye|mas|avril|me|jen|jiyè|out|septanm|oktòb|novanm|desanm)/i,
    monthsParse = [
        /^janv/i,
        /^fevr/i,
        /^mas/i,
        /^avr/i,
        /^me/i,
        /^jen/i,
        /^jiyè/i,
        /^out/i,
        /^sept/i,
        /^okt/i,
        /^nov/i,
        /^des/i,
    ];

export default moment.defineLocale('ht', {
    months: 'janvye_fevriye_mas_avril_me_jen_jiyè_out_septanm_oktòb_novanm_desanm'.split(
        '_'
    ),
    monthsShort:
        'janv._fevr._mas_avr._me_jen_jiyè._out_sept._okt._nov._des.'.split('_'),
    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: monthsStrictRegex,
    monthsShortStrictRegex: monthsShortStrictRegex,
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays: 'dimanch_lendi_madi_mèkredi_jedi_vandredi_samdi'.split('_'),
    weekdaysShort: 'dim._len._mad._mèk._jed._ven._sam.'.split('_'),
    weekdaysMin: 'di_le_ma_me_je_ve_sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm',
    },
    calendar: {
        sameDay: '[Jodi a nan] LT',
        nextDay: '[Demain nan] LT',
        nextWeek: 'dddd [nan] LT',
        lastDay: '[Ye nan] LT',
        lastWeek: 'dddd [dènye nan] LT',
        sameElse: 'L',
    },
    relativeTime: {
        future: 'nan %s',
        past: 'sa gen %s',
        s: 'kèk segonn',
        ss: '%d segonn',
        m: 'yon minit',
        mm: '%d minit',
        h: 'yon èdtan',
        hh: '%d èdtan',
        d: 'yon jou',
        dd: '%d jou',
        w: 'yon semèn',
        ww: '%d semèn',
        M: 'yon mwa',
        MM: '%d mwa',
        y: 'yon ane',
        yy: '%d ane',
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ye|)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'D':
                return number + (number === 1 ? 'ye' : '');
            default:
            case 'M':
            case 'Q':
            case 'DDD':
            case 'd':
                return number + (number === 1 ? 'ye' : 'e');
            case 'w':
            case 'W':
                return number + (number === 1 ? 'ye' : 'e');
        }
    },
    week: {
        dow: 1,
        doy: 4,
    },
});
