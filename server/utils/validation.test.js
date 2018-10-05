const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString',()=>{
    it('should reject non-string value',()=>{
        var name = 98;
        var res = isRealString(name);

        expect(res).toBe(false);
    });

    it('should reject string with only spaces', ()=>{
        var name = '    ';
        var res = isRealString(name);

        expect(res).toBe(false);
    });

    it('should allow string with non-space charecters',()=>{
        var name = 'champ';
        var res = isRealString(name);

        expect(res).toBe(true);
    });

});
