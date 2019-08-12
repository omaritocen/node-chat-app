const expect = require('expect');

const {generateMessage} = require('./message');

describe('generate message', () => {
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