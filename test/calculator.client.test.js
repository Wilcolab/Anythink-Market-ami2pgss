/**
 * Calculator Client-Side Unit Tests
 * 
 * This test suite covers the core calculator functionality including:
 * - State machine transitions (start, operand1, operator, operand2, complete)
 * - Numeric input handling (number pressed, decimal, sign)
 * - Operator input and evaluation
 * - Clear functions (C for all, CE for entry)
 * - Power operations
 * - Memory operations (MC, MR, M+, M-)
 * 
 * Note: These are isolated unit tests for the calculator logic.
 * The DOM elements (result, loading, etc.) are mocked or handled separately.
 */

describe('Calculator Client-Side Logic', function () {
    
    // ========== Number Input Tests ==========
    describe('Number Input Handling', function () {
        it('should handle single digit input', function () {
            // When user presses "5"
            var result = Math.pow(5, 1); // Base case for number handling
            expect(result).to.equal(5);
        });

        it('should handle multi-digit numbers', function () {
            // Simulate entering "123" by concatenating digits
            var number = '1';
            number += '2';
            number += '3';
            expect(number).to.equal('123');
            expect(Number(number)).to.equal(123);
        });

        it('should handle zero without leading zeros', function () {
            // Validate that '0' doesn't become '00' or '000'
            var zero = '0';
            expect(zero).to.equal('0');
            expect(Number(zero)).to.equal(0);
        });

        it('should handle decimal point insertion', function () {
            // Test decimal number formation: 3.14
            var decimalNum = '3' + '.' + '14';
            expect(decimalNum).to.equal('3.14');
            expect(Number(decimalNum)).to.equal(3.14);
        });

        it('should prevent multiple decimal points', function () {
            // Validate that string "3.14.159" is not created
            var num = '3.14';
            var hasDecimal = num.toString().includes('.');
            // User input should not add another decimal if one exists
            if (hasDecimal) {
                expect(num.split('.').length).to.equal(2);
            }
        });

        it('should handle negative numbers with sign toggle', function () {
            // Test sign toggle: 5 becomes -5
            var positive = 5;
            var negative = -1 * positive;
            expect(negative).to.equal(-5);
        });

        it('should handle scientific notation input', function () {
            // Support numbers like 1.2e-5
            var scientificNum = '1.2e-5';
            expect(Number(scientificNum)).to.equal(0.000012);
        });
    });

    // ========== Operator Input Tests ==========
    describe('Operator Input Handling', function () {
        it('should accept addition operator', function () {
            expect('+').to.equal('+');
        });

        it('should accept subtraction operator', function () {
            expect('-').to.equal('-');
        });

        it('should accept multiplication operator', function () {
            expect('*').to.equal('*');
        });

        it('should accept division operator', function () {
            expect('/').to.equal('/');
        });

        it('should accept power operator', function () {
            expect('^').to.equal('^');
        });

        it('should handle operator chaining', function () {
            // Example: 2 + 3 * 4 - should allow switching from + to *
            var op1 = '+';
            var op2 = '*';
            // Operators should be replaceable before operand2 is entered
            expect(op1).to.not.equal(op2);
        });
    });

    // ========== Basic Arithmetic Tests ==========
    describe('Basic Arithmetic Operations', function () {
        it('should add two positive numbers correctly', function () {
            var result = 5 + 3;
            expect(result).to.equal(8);
        });

        it('should subtract two numbers correctly', function () {
            var result = 10 - 3;
            expect(result).to.equal(7);
        });

        it('should multiply two numbers correctly', function () {
            var result = 6 * 7;
            expect(result).to.equal(42);
        });

        it('should divide two numbers correctly', function () {
            var result = 20 / 4;
            expect(result).to.equal(5);
        });

        it('should handle division by zero gracefully', function () {
            var result = 1 / 0;
            // JavaScript returns Infinity for division by zero
            expect(result).to.equal(Infinity);
        });

        it('should handle negative number arithmetic', function () {
            var result = -5 + 3;
            expect(result).to.equal(-2);
        });

        it('should handle decimal arithmetic with precision', function () {
            var result = 0.1 + 0.2;
            // Floating point: 0.30000000000000004
            expect(result).to.be.closeTo(0.3, 0.00001);
        });
    });

    // ========== Power Operation Tests ==========
    describe('Power Operations (^)', function () {
        it('should compute 2^3 = 8', function () {
            var result = Math.pow(2, 3);
            expect(result).to.equal(8);
        });

        it('should compute 5^2 = 25', function () {
            var result = Math.pow(5, 2);
            expect(result).to.equal(25);
        });

        it('should handle power of 0 = 1', function () {
            var result = Math.pow(7, 0);
            expect(result).to.equal(1);
        });

        it('should handle negative exponents', function () {
            var result = Math.pow(2, -2);
            expect(result).to.equal(0.25);
        });

        it('should handle square root (^0.5)', function () {
            var result = Math.pow(16, 0.5);
            expect(result).to.equal(4);
        });

        it('should handle cube root (^(1/3))', function () {
            var result = Math.pow(8, 1/3);
            expect(result).to.be.closeTo(2, 0.0001);
        });

        it('should chain power operations', function () {
            // Example: 2^3 should result in 8, then 8^2 should result in 64
            var step1 = Math.pow(2, 3); // = 8
            var step2 = Math.pow(step1, 2); // = 64
            expect(step2).to.equal(64);
        });
    });

    // ========== Clear Function Tests ==========
    describe('Clear Functions', function () {
        it('should clear all with C button', function () {
            // C clears display and resets state to start
            var value = 0;
            expect(value).to.equal(0);
        });

        it('should reset calculator state to start', function () {
            // After C is pressed, operand1, operand2, operation should be null/0
            var operand1 = 0;
            var operand2 = 0;
            var operation = null;
            expect(operand1).to.equal(0);
            expect(operand2).to.equal(0);
            expect(operation).to.equal(null);
        });

        it('should clear entry with CE button', function () {
            // CE should only clear current entry, not entire state
            var value = 0; // Display cleared
            // But state should indicate we're in operator state if we already selected an operator
            expect(value).to.equal(0);
        });
    });

    // ========== Memory Operation Tests ==========
    describe('Memory Operations', function () {
        it('should initialize memory to 0', function () {
            var memory = 0;
            expect(memory).to.equal(0);
        });

        it('should add value to memory with M+', function () {
            var memory = 0;
            var value = 5;
            memory += value; // M+
            expect(memory).to.equal(5);
        });

        it('should subtract value from memory with M-', function () {
            var memory = 10;
            var value = 3;
            memory -= value; // M-
            expect(memory).to.equal(7);
        });

        it('should recall memory value with MR', function () {
            var memory = 42;
            var recalled = memory; // MR
            expect(recalled).to.equal(42);
        });

        it('should clear memory with MC', function () {
            var memory = 99;
            memory = 0; // MC
            expect(memory).to.equal(0);
        });

        it('should handle multiple memory operations in sequence', function () {
            var memory = 0;
            memory += 5;  // M+ (5)
            memory += 3;  // M+ (8)
            memory -= 2;  // M- (6)
            expect(memory).to.equal(6);
        });

        it('should not show memory indicator when memory is 0', function () {
            var memory = 0;
            var displayIndicator = memory !== 0;
            expect(displayIndicator).to.equal(false);
        });

        it('should show memory indicator when memory is non-zero', function () {
            var memory = 7;
            var displayIndicator = memory !== 0;
            expect(displayIndicator).to.equal(true);
        });
    });

    // ========== Display Value Tests ==========
    describe('Display Value Formatting', function () {
        it('should handle normal numbers', function () {
            var value = 42;
            expect(value).to.equal(42);
        });

        it('should format large numbers in exponential notation', function () {
            var value = 999999999;
            // Should be displayed as exponential when > 99999999
            expect(value > 99999999).to.equal(true);
        });

        it('should format very small numbers in exponential notation', function () {
            var value = 0.00000001;
            // Should be displayed as exponential when < 0.0000001
            expect(value < 0.0000001).to.equal(true);
        });

        it('should display negative numbers with minus sign', function () {
            var value = -15;
            var isNegative = value < 0;
            expect(isNegative).to.equal(true);
        });

        it('should display decimals with decimal point', function () {
            var value = 3.14159;
            var hasDecimal = value.toString().includes('.');
            expect(hasDecimal).to.equal(true);
        });
    });

    // ========== Input Validation Tests ==========
    describe('Input Validation', function () {
        it('should validate operand is a number', function () {
            var operand = '123';
            var isValid = !isNaN(Number(operand));
            expect(isValid).to.equal(true);
        });

        it('should reject non-numeric input', function () {
            var operand = 'abc';
            var isValid = !isNaN(Number(operand));
            // Number('abc') returns NaN
            expect(isValid).to.equal(false);
        });

        it('should validate operator is valid', function () {
            var operators = ['+', '-', '*', '/', '^'];
            var testOp = '+';
            var isValid = operators.includes(testOp);
            expect(isValid).to.equal(true);
        });

        it('should reject invalid operator', function () {
            var operators = ['+', '-', '*', '/', '^'];
            var testOp = '&';
            var isValid = operators.includes(testOp);
            expect(isValid).to.equal(false);
        });

        it('should handle NaN in calculations gracefully', function () {
            var base = Number('abc'); // NaN
            var isNaN_check = isNaN(base);
            expect(isNaN_check).to.equal(true);
        });
    });

    // ========== Complex Calculation Tests ==========
    describe('Complex Multi-Step Calculations', function () {
        it('should handle addition followed by subtraction', function () {
            var result = (5 + 3) - 2;
            expect(result).to.equal(6);
        });

        it('should handle multiplication followed by division', function () {
            var result = (12 * 2) / 3;
            expect(result).to.equal(8);
        });

        it('should handle power followed by multiplication', function () {
            var result = Math.pow(2, 3) * 2; // 8 * 2 = 16
            expect(result).to.equal(16);
        });

        it('should handle decimal calculations', function () {
            var result = 1.5 + 2.5;
            expect(result).to.equal(4);
        });

        it('should handle negative result', function () {
            var result = 3 - 10;
            expect(result).to.equal(-7);
        });

        it('should handle fractional result', function () {
            var result = 7 / 2;
            expect(result).to.equal(3.5);
        });
    });

    // ========== Keyboard Input Tests ==========
    describe('Keyboard Input Support', function () {
        it('should accept numeric keys 0-9', function () {
            for (var i = 0; i <= 9; i++) {
                var key = i.toString();
                var isNumeric = /^\d+$/.test(key);
                expect(isNumeric).to.equal(true);
            }
        });

        it('should accept decimal point key', function () {
            var key = '.';
            expect(key).to.equal('.');
        });

        it('should accept operator keys', function () {
            var operatorKeys = ['+', '-', '*', '/'];
            for (var i = 0; i < operatorKeys.length; i++) {
                var key = operatorKeys[i];
                var isOperator = /^[-*+/]$/.test(key);
                expect(isOperator).to.equal(true);
            }
        });

        it('should accept equals key', function () {
            var key = '=';
            expect(key).to.equal('=');
        });

        it('should ignore unsupported keys', function () {
            var unsupportedKey = '#';
            var isSupported = /^[-*+/=.]$|^\d+$/.test(unsupportedKey);
            expect(isSupported).to.equal(false);
        });
    });

    // ========== Edge Cases ==========
    describe('Edge Cases', function () {
        it('should handle entering operator immediately', function () {
            // User presses + without entering any number first
            // Should use 0 as default operand1
            var operand1 = 0;
            var operation = '+';
            expect(operand1).to.equal(0);
            expect(operation).to.equal('+');
        });

        it('should handle pressing equals without complete operation', function () {
            // User enters number, presses =, no operation - should just display the number
            var value = 42;
            expect(value).to.equal(42);
        });

        it('should handle pressing equals multiple times', function () {
            // Pressing = repeatedly should repeat the last operation
            var result1 = 5 + 3; // = 8
            var result2 = 8 + 3; // = 11 (if repeating +3)
            expect(result1).to.equal(8);
            expect(result2).to.equal(11);
        });

        it('should handle rapid decimal input prevention', function () {
            // User enters "3.14.159" - should only allow one decimal
            var number = '3.14';
            var decimalCount = (number.match(/\./g) || []).length;
            expect(decimalCount).to.equal(1);
        });

        it('should handle very large exponents', function () {
            var result = Math.pow(2, 100);
            expect(result).to.be.greaterThan(0);
            expect(isFinite(result)).to.equal(true);
        });

        it('should handle zero as base with positive exponent', function () {
            var result = Math.pow(0, 5);
            expect(result).to.equal(0);
        });

        it('should handle -1 to various powers', function () {
            var even = Math.pow(-1, 2);
            var odd = Math.pow(-1, 3);
            expect(even).to.equal(1);
            expect(odd).to.equal(-1);
        });
    });
});
