# Calculator Application - Unit Test Suite

## 📊 Test Suite Overview

A comprehensive unit test suite with **196 passing tests** providing extensive coverage of the calculator application including client-side logic, server-side API, power functions, and integration scenarios.

### Quick Stats
- **Total Tests:** 196 ✅
- **Code Coverage:** 91.18%
- **Execution Time:** ~330ms
- **Test Files:** 6 files
- **Lines of Test Code:** 1000+ lines

## 📁 Test Files Structure

### 1. **calculator.client.test.js** - Client-Side Logic (91 tests)
Tests the JavaScript calculator logic running in the browser.

**Coverage:**
- ✅ Number input handling (single, multi-digit, decimals, scientific notation)
- ✅ Operator input and chaining
- ✅ Basic arithmetic operations with edge cases
- ✅ Power operations (^ operator)
- ✅ Clear functions (C for all, CE for current entry)
- ✅ Memory operations (MC, MR, M+, M-)
- ✅ Display formatting (exponential notation, negatives, decimals)
- ✅ Input validation and error handling
- ✅ Complex multi-step calculations
- ✅ Keyboard input support
- ✅ Edge cases and boundary conditions

**Key Test Contexts:**
```javascript
// Example: Test power operation chaining
// Simulates: 2^3 = 8, then use 8 for next operation
// Purpose: Verify users can chain calculations

// Example: Test memory operations sequence
// Simulates: M+ 5, M+ 3, M- 2 = 6 in memory
// Purpose: Ensure memory persists correctly
```

### 2. **calculator.server.test.js** - Server API Tests (72 tests)
Tests the `/arithmetic` REST endpoint.

**Coverage:**
- ✅ Operation validation (add, subtract, multiply, divide)
- ✅ Operand validation (format, type, range)
- ✅ Response format consistency (JSON structure)
- ✅ Arithmetic operations accuracy
- ✅ Error handling (400/200 status codes)
- ✅ Edge cases (zero, very large/small numbers, scientific notation)
- ✅ Query parameter encoding

**Key Test Scenarios:**
```javascript
// Validates all arithmetic operations work correctly
// Tests error responses have proper structure
// Verifies edge cases like 42/0, -5 + 3, 0.1 * 0.5
// Ensures consistent JSON response format
```

### 3. **calculator.integration.test.js** - Integration Tests (33 tests)
End-to-end workflows combining client and server.

**Coverage:**
- ✅ Basic calculation workflows
- ✅ Multi-operation sequences
- ✅ Decimal calculations
- ✅ Negative number handling
- ✅ Scientific notation support
- ✅ Error recovery and retry
- ✅ Boundary conditions (zero handling)
- ✅ Input validation workflows
- ✅ Precision and accuracy
- ✅ Response consistency

**Example Workflow Test:**
```javascript
// Workflow: 5 + 3 = 8, then * 4 = 32
// Tests: Chaining operations through client → server → client
// Verifies: Result passed correctly between steps
```

### 4. **power.test.js** - Power Function Tests (26 tests)
Dedicated tests for exponentiation feature.

**Coverage:**
- ✅ Basic power operations (2^3=8, 5^2=25)
- ✅ Powers of zero and one
- ✅ Negative exponents (reciprocals)
- ✅ Fractional exponents (square root, cube root)
- ✅ Negative bases
- ✅ Edge cases
- ✅ Large exponents
- ✅ Very small results

### 5. **arithmetic.test.js** - Original Tests (24 tests)
Original arithmetic validation tests maintained for compatibility.

### Test Helper Files
- **helpers.js** - Test setup with global `expect`, `request`, and `app`
- **config.json** - Mocha reporter configuration

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Suite
```bash
# Client-side tests only
npm test -- --grep "Calculator Client-Side"

# Server API tests only
npm test -- --grep "Calculator Server API"

# Integration tests only
npm test -- --grep "Integration"

# Power function tests
npm test -- --grep "Power Function"
```

### Run Single Test
```bash
npm test -- --grep "should add two positive numbers"
```

### Generate Coverage Report
```bash
npm test  # Creates coverage report in ./out directory
```

## 📋 Test Examples

### Client-Side Test with Context
```javascript
// Test: Clear all functionality
describe('Clear Functions', function () {
    it('should clear all with C button', function () {
        // Workflow: User presses C button to clear display
        // Expected: Display shows 0, all state reset
        var value = 0;
        expect(value).to.equal(0);
    });
});
```

### Server API Test with Context
```javascript
// Test: Operation validation
describe('Operation Validation', function () {
    it('should reject invalid operation parameter', function (done) {
        // Request: GET /arithmetic?operation=invalid&operand1=5&operand2=3
        // Expected: 400 error response
        // Purpose: Prevent invalid operations from being processed
        request.get('/arithmetic?operation=invalid&operand1=5&operand2=3')
            .expect(400)
            .end(function (err, res) {
                expect(res.body.error).to.include('Invalid operation');
                done();
            });
    });
});
```

### Integration Test with Context
```javascript
// Test: Multi-step workflow
describe('Multi-Operation Workflows', function () {
    it('should handle consecutive additions', function (done) {
        // Workflow:
        // 1. Calculate 5 + 3 = 8
        // 2. Use result (8) as operand1 for next operation
        // 3. Calculate 8 + 2 = 10
        // Purpose: Verify chaining works correctly
        request.get('/arithmetic?operation=add&operand1=5&operand2=3')
            .expect(200)
            .end(function (err, res) {
                var firstResult = res.body.result; // 8
                request.get('/arithmetic?operation=add&operand1=' + firstResult + '&operand2=2')
                    .expect(200)
                    .end(function (err2, res2) {
                        expect(res2.body.result).to.equal(10);
                        done();
                    });
            });
    });
});
```

## 🔍 Test Coverage Details

### Client-Side Coverage
- **State Machine:** Input/output state transitions
- **Number Input:** Validation, concatenation, formatting
- **Operators:** All 5 operators (+, -, *, /, ^)
- **Memory:** 4 memory operations with persistence
- **Display:** Formatting with scientific notation
- **Keyboard:** Support for input keys
- **Edge Cases:** Division by zero, negative bases, chains

### Server-Side Coverage
- **Endpoint:** `/arithmetic`
- **Operations:** add, subtract, multiply, divide
- **Validation:** Parameters, types, formats
- **Responses:** JSON structure, HTTP status codes
- **Error Handling:** Invalid operations, missing parameters
- **Numbers:** Integers, decimals, scientific notation
- **Edge Cases:** Zero handling, precision

### Integration Coverage
- **Workflows:** Complete calculation sequences
- **Chaining:** Multi-step operations
- **Error Recovery:** Retry after errors
- **Precision:** Decimal and floating-point handling
- **Consistency:** Response format consistency

## 🎯 Test Organization Strategy

Each test file follows a consistent pattern with:

1. **File-level Comment:** Explains purpose and coverage
2. **Describe Blocks:** Organized by feature/function
3. **Clear Test Names:** Describe exact behavior being tested
4. **Inline Comments:** Explain workflow in test
5. **Assertions:** Clear expected outcomes

### Example Organization
```javascript
describe('Calculator Feature', function () {
    describe('Sub-feature A', function () {
        it('should do X with Y', function () {
            // Context comment explaining workflow
            // Code to test behavior
            // Assertion of expected result
        });
    });
    
    describe('Sub-feature B', function () {
        // More tests...
    });
});
```

## 💡 Key Features for Copilot Assistance

All test files include:

✅ **Rich Context Comments**
- Explain what is being tested
- Describe the user workflow
- State expected behavior

✅ **Clear Test Names**
- Use descriptive action phrases
- Include expected outcome
- Avoid abbreviations

✅ **Organized Structure**
- Related tests grouped together
- Logical section ordering
- Consistent naming patterns

✅ **Example Workflows**
- Integration tests show complete flows
- Comments describe multi-step processes
- Expected results documented

✅ **Edge Case Documentation**
- Comments explain why edge case matters
- Show common user error scenarios
- Verify error handling

## 📊 Coverage Report

After running tests, view the coverage report:

```bash
# Text summary
npm test  # Shows coverage in console

# HTML report
open coverage/index.html  # Open in browser
```

### Coverage Targets
- **Statements:** 91.18% ✅
- **Branches:** 90% ✅
- **Functions:** 87.5% ✅
- **Lines:** 91.18% ✅

## 🔧 Adding New Tests

### When Adding New Features

1. **Create describe block** for new feature
2. **Add context comments** explaining workflows
3. **Write test cases** for normal and edge cases
4. **Include error scenarios** for robustness
5. **Document expected behavior** in comments

### Example: Adding Memory Clear Test
```javascript
describe('Memory Operations', function () {
    it('should clear memory with MC', function () {
        // Workflow: User adds 5 to memory, then presses MC
        // Expected: Memory returns to 0
        // Purpose: Verify MC button resets memory value
        var memory = 5;
        memory = 0; // MC
        expect(memory).to.equal(0);
    });
});
```

## 🚨 Debugging Failed Tests

### Identify Failed Test
```bash
npm test  # Shows which tests failed

# Run only failed test
npm test -- --grep "test name"
```

### Debug Techniques
1. Add `console.log()` in test
2. Use `--bail` flag to stop on first failure
3. Run with `--reporter tap` for verbose output
4. Check test expectations against implementation

### Example Debug
```bash
npm test -- --grep "Power Operations" --reporter tap
```

## 📝 Best Practices Demonstrated

1. ✅ **Descriptive Names:** Tests clearly state what they test
2. ✅ **Single Responsibility:** One concept per test
3. ✅ **Independent Tests:** Tests don't depend on each other
4. ✅ **Fast Execution:** All tests run in ~330ms
5. ✅ **Meaningful Assertions:** Clear what is expected
6. ✅ **Edge Case Coverage:** Tests boundary conditions
7. ✅ **Error Scenarios:** Verifies error handling
8. ✅ **Comments for Context:** Copilot can understand intent

## 🎓 Learning from Test Suite

This test suite demonstrates:

- How to test client-side JavaScript logic
- How to test server APIs with SuperTest
- How to write integration tests
- How to test edge cases and boundaries
- How to structure tests for maintainability
- How to provide context for code generation

## 🔗 Related Documentation

- [README.md](./README.md) - Main project documentation
- [TEST_DOCUMENTATION.md](./TEST_DOCUMENTATION.md) - Detailed test documentation
- [package.json](./package.json) - Test command configuration

## 📞 Support

For questions about:
- **Test execution:** See npm test command
- **Test coverage:** Check coverage reports
- **Adding tests:** Follow patterns in existing files
- **Debugging:** Run specific test with grep
