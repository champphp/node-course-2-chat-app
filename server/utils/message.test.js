const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',() =>{
    it('should generate correct message object',()=>{
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from,text);

        expect(message.createAt).toBeA('number');
        expect(message).toInclude({from,text});

    });

});

describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var from = 'Jen';
        var latitude = 15;
        var longitude = 16;
        var url = 'https://www.google.com/maps?q=15,16';
        var message = generateLocationMessage(from,latitude,longitude);

        expect(message.createAt).toBeA('number');
        expect(message).toInclude({from,url});
    });
});
