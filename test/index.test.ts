import Bot from '../src';

describe('Bot', () => {
    it('should be exist', () => {
        expect(Bot).toBeDefined();
    });

    describe('Walk', () => {
        let bot: Bot;
        beforeEach(() => {
            bot = new Bot;
        });

        it('should return initial position', () => {
            const expected = 'X: 0 Y: 0 Direction: North';

            expect(bot.walk()).toEqual(expected);
        });

        it('should turn bot 90 degree to the right (clockwise)', () => {
            const expected = 'X: 0 Y: 0 Direction: East';

            expect(bot.walk('R')).toEqual(expected);
        });

        it('should turn bot 90 degree to the left (counterclockwise)', () => {
            const expected = 'X: 0 Y: 0 Direction: West';

            expect(bot.walk('L')).toEqual(expected);
        });

        it('should support rotation', () => {
            expect(bot.walk('RR')).toEqual('X: 0 Y: 0 Direction: South');
            expect(bot.walk('RRRR')).toEqual('X: 0 Y: 0 Direction: North');
            expect(bot.walk('LL')).toEqual('X: 0 Y: 0 Direction: South');
            expect(bot.walk('LLLL')).toEqual('X: 0 Y: 0 Direction: North');
        });

        it('should walk straight for any given positive integer', () => {
            expect(bot.walk('W1')).toEqual('X: 0 Y: 1 Direction: North');
            expect(bot.walk('W3')).toEqual('X: 0 Y: 3 Direction: North');
            expect(bot.walk('W10000')).toEqual('X: 0 Y: 10000 Direction: North');
        });

        it('should not move forward when given negative number', () => {
            expect(bot.walk('W-1')).toEqual('X: 0 Y: 0 Direction: North');
        });

        it('should support sequential direction code', () => {
            expect(bot.walk('RW15RW1')).toEqual('X: 15 Y: -1 Direction: South');
            expect(bot.walk('LW15LRW1')).toEqual('X: -16 Y: 0 Direction: West');
            expect(bot.walk('W5RW5RW2RW1R')).toEqual('X: 4 Y: 3 Direction: North');
            expect(bot.walk('RRW11RLLW19RRW12LW1')).toEqual('X: 7 Y: -12 Direction: South');
            expect(bot.walk('LLW100W50RW200W10')).toEqual('X: -210 Y: -150 Direction: West');
            expect(bot.walk('LLLLLW99RRRRRW88LLLRL')).toEqual('X: -99 Y: 88 Direction: East');
            expect(bot.walk('W55555RW555555W444444W1')).toEqual('X: 1000000 Y: 55555 Direction: East');
        });
    });
});
