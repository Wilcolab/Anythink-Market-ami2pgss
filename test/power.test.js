describe('Power Function (Client-side)', function () {
    describe('Basic Power Operations', function () {
        it('calculates 2^3 = 8', function () {
            var base = 2;
            var exponent = 3;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(8);
        });

        it('calculates 5^2 = 25', function () {
            var base = 5;
            var exponent = 2;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(25);
        });

        it('calculates 10^3 = 1000', function () {
            var base = 10;
            var exponent = 3;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(1000);
        });

        it('calculates 2^0 = 1', function () {
            var base = 2;
            var exponent = 0;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(1);
        });

        it('calculates any number^0 = 1', function () {
            var base = 42;
            var exponent = 0;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(1);
        });
    });

    describe('Negative Exponents', function () {
        it('calculates 2^-1 = 0.5', function () {
            var base = 2;
            var exponent = -1;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(0.5);
        });

        it('calculates 10^-2 = 0.01', function () {
            var base = 10;
            var exponent = -2;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(0.01);
        });

        it('calculates 5^-1 = 0.2', function () {
            var base = 5;
            var exponent = -1;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(0.2);
        });
    });

    describe('Decimal Bases', function () {
        it('calculates 2.5^2 = 6.25', function () {
            var base = 2.5;
            var exponent = 2;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(6.25);
        });

        it('calculates 0.5^3 = 0.125', function () {
            var base = 0.5;
            var exponent = 3;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(0.125);
        });

        it('calculates 1.5^4 = 5.0625', function () {
            var base = 1.5;
            var exponent = 4;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(5.0625);
        });
    });

    describe('Negative Bases', function () {
        it('calculates (-2)^2 = 4', function () {
            var base = -2;
            var exponent = 2;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(4);
        });

        it('calculates (-3)^3 = -27', function () {
            var base = -3;
            var exponent = 3;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(-27);
        });

        it('calculates (-2)^4 = 16', function () {
            var base = -2;
            var exponent = 4;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(16);
        });
    });

    describe('Fractional Exponents', function () {
        it('calculates 4^0.5 = 2 (square root)', function () {
            var base = 4;
            var exponent = 0.5;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(2);
        });

        it('calculates 8^(1/3) ≈ 2 (cube root)', function () {
            var base = 8;
            var exponent = 1 / 3;
            var result = Math.pow(base, exponent);
            expect(result).to.be.closeTo(2, 0.0001);
        });

        it('calculates 16^0.25 = 2 (fourth root)', function () {
            var base = 16;
            var exponent = 0.25;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(2);
        });
    });

    describe('Edge Cases', function () {
        it('calculates 0^5 = 0', function () {
            var base = 0;
            var exponent = 5;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(0);
        });

        it('calculates 1^999 = 1', function () {
            var base = 1;
            var exponent = 999;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(1);
        });

        it('calculates (-1)^2 = 1', function () {
            var base = -1;
            var exponent = 2;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(1);
        });

        it('calculates (-1)^3 = -1', function () {
            var base = -1;
            var exponent = 3;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(-1);
        });
    });

    describe('Large Numbers', function () {
        it('calculates 2^10 = 1024', function () {
            var base = 2;
            var exponent = 10;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(1024);
        });

        it('calculates 2^20 = 1048576', function () {
            var base = 2;
            var exponent = 20;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(1048576);
        });

        it('calculates 10^6 = 1000000', function () {
            var base = 10;
            var exponent = 6;
            var result = Math.pow(base, exponent);
            expect(result).to.equal(1000000);
        });
    });

    describe('Very Small Numbers', function () {
        it('calculates 0.1^2 ≈ 0.01 (with floating-point tolerance)', function () {
            var base = 0.1;
            var exponent = 2;
            var result = Math.pow(base, exponent);
            expect(result).to.be.closeTo(0.01, 0.00001);
        });

        it('calculates 0.5^10 is very small', function () {
            var base = 0.5;
            var exponent = 10;
            var result = Math.pow(base, exponent);
            expect(result).to.be.closeTo(0.0009765625, 0.00001);
        });
    });
});
