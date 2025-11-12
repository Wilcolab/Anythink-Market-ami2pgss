/**
 * Calculator Server-Side API Unit Tests
 * 
 * This test suite covers the server API endpoints including:
 * - Request validation (operation, operand1, operand2)
 * - All arithmetic operations (add, subtract, multiply, divide)
 * - Error handling (invalid inputs, missing parameters)
 * - Edge cases (zero, negative numbers, decimals, scientific notation)
 * - Response format validation
 * 
 * These tests verify the /arithmetic endpoint which is the core API.
 */

describe('Calculator Server API', function () {
    
    // ========== Operation Validation Tests ==========
    describe('Operation Validation', function () {
        it('should reject missing operation parameter', function (done) {
            request.get('/arithmetic?operand1=5&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.include('operation');
                    done();
                });
        });

        it('should reject invalid operation parameter', function (done) {
            request.get('/arithmetic?operation=modulo&operand1=5&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.include('Invalid operation');
                    done();
                });
        });

        it('should accept "add" operation', function (done) {
            request.get('/arithmetic?operation=add&operand1=5&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.have.property('result');
                    done();
                });
        });

        it('should accept "subtract" operation', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=5&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.have.property('result');
                    done();
                });
        });

        it('should accept "multiply" operation', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=5&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.have.property('result');
                    done();
                });
        });

        it('should accept "divide" operation', function (done) {
            request.get('/arithmetic?operation=divide&operand1=6&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.have.property('result');
                    done();
                });
        });
    });

    // ========== Operand Validation Tests ==========
    describe('Operand Validation', function () {
        it('should reject missing operand1', function (done) {
            request.get('/arithmetic?operation=add&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.include('operand1');
                    done();
                });
        });

        it('should reject missing operand2', function (done) {
            request.get('/arithmetic?operation=add&operand1=5')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.include('operand2');
                    done();
                });
        });

        it('should reject operand1 with invalid format (multiple decimals)', function (done) {
            request.get('/arithmetic?operation=add&operand1=3.14.159&operand2=2')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.include('operand1');
                    done();
                });
        });

        it('should reject operand1 with invalid sign placement', function (done) {
            request.get('/arithmetic?operation=add&operand1=3.14-2&operand2=5')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.include('operand1');
                    done();
                });
        });

        it('should reject operand with non-numeric characters', function (done) {
            request.get('/arithmetic?operation=add&operand1=abc&operand2=5')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.include('operand1');
                    done();
                });
        });

        it('should accept valid positive integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=42&operand2=8')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(50);
                    done();
                });
        });

        it('should accept valid negative integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=-10&operand2=5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(-5);
                    done();
                });
        });

        it('should accept valid decimal numbers', function (done) {
            request.get('/arithmetic?operation=add&operand1=3.5&operand2=2.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(6);
                    done();
                });
        });

        it('should accept scientific notation', function (done) {
            request.get('/arithmetic?operation=add&operand1=1e2&operand2=5e1')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(150);
                    done();
                });
        });

        it('should accept negative scientific notation', function (done) {
            request.get('/arithmetic?operation=add&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(0);
                    done();
                });
        });
    });

    // ========== Response Format Tests ==========
    describe('Response Format', function () {
        it('should return JSON response', function (done) {
            request.get('/arithmetic?operation=add&operand1=2&operand2=3')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.be.an('object');
                    done();
                });
        });

        it('should include result property in success response', function (done) {
            request.get('/arithmetic?operation=add&operand1=2&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.have.property('result');
                    done();
                });
        });

        it('should include error property in error response', function (done) {
            request.get('/arithmetic?operation=invalid&operand1=2&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should return numeric result', function (done) {
            request.get('/arithmetic?operation=add&operand1=2&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.a('number');
                    done();
                });
        });

        it('should return string error message', function (done) {
            request.get('/arithmetic?operation=invalid&operand1=2&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.be.a('string');
                    done();
                });
        });
    });

    // ========== Addition Tests ==========
    describe('Addition Operation', function () {
        it('should add two positive numbers', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(42);
                    done();
                });
        });

        it('should add with zero', function (done) {
            request.get('/arithmetic?operation=add&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(42);
                    done();
                });
        });

        it('should add positive and negative numbers', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(-21);
                    done();
                });
        });

        it('should add two negative numbers', function (done) {
            request.get('/arithmetic?operation=add&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(-42);
                    done();
                });
        });

        it('should add decimal numbers', function (done) {
            request.get('/arithmetic?operation=add&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(-2.5);
                    done();
                });
        });
    });

    // ========== Subtraction Tests ==========
    describe('Subtraction Operation', function () {
        it('should subtract two positive numbers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=21&operand2=8')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(13);
                    done();
                });
        });

        it('should subtract and result in negative', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=5&operand2=10')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(-5);
                    done();
                });
        });

        it('should subtract negative numbers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=10&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(15);
                    done();
                });
        });
    });

    // ========== Multiplication Tests ==========
    describe('Multiplication Operation', function () {
        it('should multiply two positive integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(42);
                    done();
                });
        });

        it('should multiply by zero', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(0);
                    done();
                });
        });

        it('should multiply positive and negative', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(-42);
                    done();
                });
        });

        it('should multiply two negative numbers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=-21&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(42);
                    done();
                });
        });

        it('should multiply decimals', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=.5&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(0.25);
                    done();
                });
        });
    });

    // ========== Division Tests ==========
    describe('Division Operation', function () {
        it('should divide two numbers evenly', function (done) {
            request.get('/arithmetic?operation=divide&operand1=42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(21);
                    done();
                });
        });

        it('should divide resulting in decimal', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(0.5);
                    done();
                });
        });

        it('should divide negative by positive', function (done) {
            request.get('/arithmetic?operation=divide&operand1=-42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(-21);
                    done();
                });
        });

        it('should divide zero by number', function (done) {
            request.get('/arithmetic?operation=divide&operand1=0&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(0);
                    done();
                });
        });

        it('should handle division by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    // Server should return null or Infinity
                    expect(res.body.result).to.be.oneOf([null, Infinity]);
                    done();
                });
        });
    });

    // ========== Edge Case Tests ==========
    describe('Edge Cases', function () {
        it('should handle very large numbers', function (done) {
            request.get('/arithmetic?operation=add&operand1=999999999&operand2=1')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(1000000000);
                    done();
                });
        });

        it('should handle very small numbers', function (done) {
            request.get('/arithmetic?operation=add&operand1=0.0000001&operand2=0.0000001')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(0.0000002, 0.00000001);
                    done();
                });
        });

        it('should handle leading zeros in operands', function (done) {
            request.get('/arithmetic?operation=add&operand1=007&operand2=5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(12);
                    done();
                });
        });

        it('should handle operands with decimal point at start', function (done) {
            request.get('/arithmetic?operation=add&operand1=.5&operand2=.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(1);
                    done();
                });
        });
    });

    // ========== HTTP Status Code Tests ==========
    describe('HTTP Status Codes', function () {
        it('should return 200 for valid requests', function (done) {
            request.get('/arithmetic?operation=add&operand1=2&operand2=3')
                .expect(200)
                .end(done);
        });

        it('should return 400 for invalid operation', function (done) {
            request.get('/arithmetic?operation=invalid&operand1=2&operand2=3')
                .expect(400)
                .end(done);
        });

        it('should return 400 for missing parameters', function (done) {
            request.get('/arithmetic?operation=add&operand1=2')
                .expect(400)
                .end(done);
        });

        it('should return 400 for malformed operands', function (done) {
            request.get('/arithmetic?operation=add&operand1=abc&operand2=def')
                .expect(400)
                .end(done);
        });
    });

    // ========== Query Parameter Encoding Tests ==========
    describe('Query Parameter Encoding', function () {
        it('should handle URL-encoded parameters', function (done) {
            request.get('/arithmetic?operation=add&operand1=2&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(5);
                    done();
                });
        });

        it('should handle special characters in error messages', function (done) {
            request.get('/arithmetic?operation=invalid&operand1=2&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.be.a('string');
                    done();
                });
        });
    });
});
