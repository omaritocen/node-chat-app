const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'omar';
        let text = 'this is a text from omar';
        let message = generateMessage(from, text);
        expect(message).toMatchObject({
            from,
            text
        });
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'omar';
        let latitude = 31;
        let longitude = 32;
        let url = 'https://www.google.com/maps?q=31,32';
        let locationMessage = generateLocationMessage(from, latitude, longitude);
        expect(typeof locationMessage.createdAt).toBe('number');
        expect(locationMessage).toMatchObject({
            from,
            url
        });
    });
});