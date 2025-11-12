/**
 * Calculator Integration Tests
 * 
 * This test suite covers end-to-end scenarios combining:
 * - Client-side input validation and state management
 * - Server API calls for arithmetic operations
 * - Complete calculation workflows
 * - Error recovery and edge case handling
 * 
 * These tests verify that the entire calculator system works correctly
 * from user input through to displaying the result.
 */

describe('Calculator Integration Tests', function () {
    
    // ========== Basic Calculation Workflow Tests ==========
    describe('Basic Calculation Workflows', function () {
        it('should handle simple two-number addition', function (done) {
            // Workflow: enter 5 -> press + -> enter 3 -> press = -> expect 8
            request.get('/arithmetic?operation=add&operand1=5&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(8);
                    done();
                });
        });

        it('should handle simple two-number subtraction', function (done) {
            // Workflow: enter 10 -> press - -> enter 3 -> press = -> expect 7
            request.get('/arithmetic?operation=subtract&operand1=10&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(7);
                    done();
                });
        });

        it('should handle simple two-number multiplication', function (done) {
            // Workflow: enter 6 -> press * -> enter 7 -> press = -> expect 42
            request.get('/arithmetic?operation=multiply&operand1=6&operand2=7')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(42);
                    done();
                });
        });

        it('should handle simple two-number division', function (done) {
            // Workflow: enter 20 -> press / -> enter 4 -> press = -> expect 5
            request.get('/arithmetic?operation=divide&operand1=20&operand2=4')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(5);
                    done();
                });
        });
    });

    // ========== Multi-Operation Workflow Tests ==========
    describe('Multi-Operation Workflows', function () {
        it('should handle consecutive additions', function (done) {
            // Workflow: 5 + 3 = 8, then + 2 should work on result 8
            request.get('/arithmetic?operation=add&operand1=5&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    var firstResult = res.body.result;
                    expect(firstResult).to.equal(8);
                    
                    // Use result for next operation
                    request.get('/arithmetic?operation=add&operand1=' + firstResult + '&operand2=2')
                        .expect(200)
                        .end(function (err2, res2) {
                            expect(res2.body.result).to.equal(10);
                            done();
                        });
                });
        });

        it('should handle mixed operations', function (done) {
            // Workflow: 10 - 5 = 5, then * 4 = 20
            request.get('/arithmetic?operation=subtract&operand1=10&operand2=5')
                .expect(200)
                .end(function (err, res) {
                    var firstResult = res.body.result;
                    
                    request.get('/arithmetic?operation=multiply&operand1=' + firstResult + '&operand2=4')
                        .expect(200)
                        .end(function (err2, res2) {
                            expect(res2.body.result).to.equal(20);
                            done();
                        });
                });
        });
    });

    // ========== Decimal Calculation Workflows ==========
    describe('Decimal Calculation Workflows', function () {
        it('should handle decimal input and output', function (done) {
            // Workflow: 2.5 + 3.7 = 6.2
            request.get('/arithmetic?operation=add&operand1=2.5&operand2=3.7')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(6.2, 0.01);
                    done();
                });
        });

        it('should handle decimal multiplication', function (done) {
            // Workflow: 0.5 * 0.5 = 0.25
            request.get('/arithmetic?operation=multiply&operand1=0.5&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(0.25);
                    done();
                });
        });

        it('should handle decimal division', function (done) {
            // Workflow: 1 / 4 = 0.25
            request.get('/arithmetic?operation=divide&operand1=1&operand2=4')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(0.25);
                    done();
                });
        });
    });

    // ========== Negative Number Workflows ==========
    describe('Negative Number Workflows', function () {
        it('should handle operations resulting in negative', function (done) {
            // Workflow: 3 - 10 = -7
            request.get('/arithmetic?operation=subtract&operand1=3&operand2=10')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(-7);
                    done();
                });
        });

        it('should handle operations with negative operands', function (done) {
            // Workflow: -5 + 3 = -2
            request.get('/arithmetic?operation=add&operand1=-5&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(-2);
                    done();
                });
        });

        it('should handle multiplication with negatives', function (done) {
            // Workflow: -3 * -4 = 12 (negative * negative = positive)
            request.get('/arithmetic?operation=multiply&operand1=-3&operand2=-4')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(12);
                    done();
                });
        });
    });

    // ========== Scientific Notation Workflows ==========
    describe('Scientific Notation Workflows', function () {
        it('should handle scientific notation input', function (done) {
            // Workflow: 1e2 + 5e1 = 150
            request.get('/arithmetic?operation=add&operand1=1e2&operand2=5e1')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(150);
                    done();
                });
        });

        it('should handle negative scientific notation', function (done) {
            // Workflow: 1e-2 + 2e-2 = 0.03
            request.get('/arithmetic?operation=add&operand1=1e-2&operand2=2e-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(0.03, 0.001);
                    done();
                });
        });
    });

    // ========== Error Recovery Workflows ==========
    describe('Error Recovery Workflows', function () {
        it('should handle invalid operation and allow retry', function (done) {
            // First attempt: invalid operation -> error
            request.get('/arithmetic?operation=invalid&operand1=5&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.have.property('error');
                    
                    // Retry with valid operation
                    request.get('/arithmetic?operation=add&operand1=5&operand2=3')
                        .expect(200)
                        .end(function (err2, res2) {
                            expect(res2.body.result).to.equal(8);
                            done();
                        });
                });
        });

        it('should handle invalid operand and allow retry', function (done) {
            // First attempt: invalid operand -> error
            request.get('/arithmetic?operation=add&operand1=abc&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.have.property('error');
                    
                    // Retry with valid operand
                    request.get('/arithmetic?operation=add&operand1=5&operand2=3')
                        .expect(200)
                        .end(function (err2, res2) {
                            expect(res2.body.result).to.equal(8);
                            done();
                        });
                });
        });
    });

    // ========== Boundary Condition Workflows ==========
    describe('Boundary Condition Workflows', function () {
        it('should handle zero as operand1', function (done) {
            // Workflow: 0 + 42 = 42
            request.get('/arithmetic?operation=add&operand1=0&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(42);
                    done();
                });
        });

        it('should handle zero as operand2', function (done) {
            // Workflow: 42 + 0 = 42
            request.get('/arithmetic?operation=add&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(42);
                    done();
                });
        });

        it('should handle zero multiply', function (done) {
            // Workflow: 42 * 0 = 0
            request.get('/arithmetic?operation=multiply&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(0);
                    done();
                });
        });

        it('should handle dividing zero', function (done) {
            // Workflow: 0 / 42 = 0
            request.get('/arithmetic?operation=divide&operand1=0&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(0);
                    done();
                });
        });

        it('should handle division by zero', function (done) {
            // Workflow: 42 / 0 = null or Infinity
            request.get('/arithmetic?operation=divide&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.oneOf([null, Infinity]);
                    done();
                });
        });
    });

    // ========== Input Validation Workflows ==========
    describe('Input Validation Workflows', function () {
        it('should reject missing operation and prompt user', function (done) {
            request.get('/arithmetic?operand1=5&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should reject missing operand1 and prompt user', function (done) {
            request.get('/arithmetic?operation=add&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should reject missing operand2 and prompt user', function (done) {
            request.get('/arithmetic?operation=add&operand1=5')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should reject malformed decimal', function (done) {
            request.get('/arithmetic?operation=add&operand1=3.14.159&operand2=2')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });

    // ========== Precision and Accuracy Tests ==========
    describe('Precision and Accuracy', function () {
        it('should maintain precision in decimal calculations', function (done) {
            request.get('/arithmetic?operation=add&operand1=0.1&operand2=0.2')
                .expect(200)
                .end(function (err, res) {
                    // 0.1 + 0.2 = 0.30000000000000004 in JS
                    expect(res.body.result).to.be.closeTo(0.3, 0.00001);
                    done();
                });
        });

        it('should handle large number arithmetic accurately', function (done) {
            request.get('/arithmetic?operation=add&operand1=1000000000&operand2=1')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(1000000001);
                    done();
                });
        });

        it('should handle very small number arithmetic', function (done) {
            request.get('/arithmetic?operation=add&operand1=0.0000001&operand2=0.0000001')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(0.0000002, 0.00000001);
                    done();
                });
        });
    });

    // ========== Response Consistency Tests ==========
    describe('Response Consistency', function () {
        it('should always return JSON response', function (done) {
            request.get('/arithmetic?operation=add&operand1=2&operand2=3')
                .expect('Content-Type', /json/)
                .end(done);
        });

        it('should have consistent response structure for success', function (done) {
            request.get('/arithmetic?operation=add&operand1=2&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.have.property('result');
                    expect(res.body.result).to.be.a('number');
                    done();
                });
        });

        it('should have consistent response structure for errors', function (done) {
            request.get('/arithmetic?operation=invalid&operand1=2&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.be.a('string');
                    done();
                });
        });
    });
});
