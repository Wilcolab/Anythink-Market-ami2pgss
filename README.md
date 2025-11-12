# GitHub Copilot Workshop

## Enhance a Node Calculator app using GitHub Copilot

<img width="400" alt="Node Calculator image" src="./assets/Node%20calculator%20image.png">

The project contains a simple node.js application that exposes REST APIs to perform arithmetic on integers, and provides a test suite with mocha and chai.

## Features

### Core Arithmetic Operations
- ➕ **Addition** – Add two numbers
- ➖ **Subtraction** – Subtract two numbers
- ✖️ **Multiplication** – Multiply two numbers
- ➗ **Division** – Divide two numbers (with zero handling)

### Advanced Features
- **Power/Exponentiation** (^) – Calculate power operations using `Math.pow()` locally on the client
- **Decimal Support** – Work with floating-point numbers
- **Sign Toggle** – Negate numbers with +/- toggle
- **Clear Functions**:
  - **C** – Clear all (resets calculator to initial state)
  - **CE** – Clear entry (clears current input)

### Memory Operations (NEW)
- **MC** – Memory Clear: Clears the stored memory value
- **MR** – Memory Recall: Recalls stored memory value to display
- **M+** – Memory Add: Adds current display value to memory
- **M-** – Memory Subtract: Subtracts current display value from memory
- Visual indicator displays stored memory value when non-zero

### User Interface Enhancements (NEW)
- Modern gradient background (purple to violet)
- Colorful button design with distinct colors for different operation types:
  - Purple: Memory buttons
  - Orange: Clear buttons
  - Green: Operator buttons
  - Red: Equals button
  - Blue: Display screen
- Responsive hover and active button states with smooth animations
- Centered calculator layout with optimized spacing
- Professional styling with box shadows and rounded corners
- Memory indicator display

## Keyboard Support
The calculator supports keyboard input:
- **0-9** – Number keys
- **.** – Decimal point
- **+, -, *, /** – Operator keys
- **=** – Equals (calculate result)

## Instructions 

In order to run the app use:

```bash
npm start
```

### Running Tests

To run the test suite with coverage:

```bash
npm test
```

### Build

To build the project:

```bash
npm run build
```

### Lint

To run ESLint:

```bash
npm run lint
```

## Architecture

### Backend (Node.js/Express)
- REST API endpoints for arithmetic operations
- Support for add, subtract, multiply, divide operations
- Input validation and error handling
- Scientific notation support

### Frontend (Vanilla JavaScript)
- State machine-based input handling
- Client-side computation for power operations
- Memory management system
- Responsive UI with CSS Grid layout
- Event-driven architecture with keyboard support

### Testing
- Unit tests using Mocha and Chai
- Supertest for API endpoint testing
- Code coverage reporting with NYC
- Multi-reporter setup for CI/CD integration

## Recent Updates

**v2.0 - Calculator Update (November 2025)**
- ✨ Added exponentiation support with Math.pow() (^)
- 💾 Implemented memory operations (MC, MR, M+, M-)
- 🎨 Complete UI redesign with modern gradients and colors
- 🎯 Improved layout centering and spacing
- ✅ All tests passing (24/24)

## Acknowledgements

A special thanks to the following awesome Hubbers who have contributed in many different ways to this repository. 
[pierluigi](https://github.com/pierluigi), [parroty](https://github.com/yuichielectric), [yuichielectric](https://github.com/yuichielectric), [dchomh](https://github.com/dchomh), [nolecram](https://github.com/nolecram), [rsymo](https://github.com/rsymo), [damovisa](https://github.com/damovisa) and anyone else I've inadvertently missed.

_v1.0 Released June, 2023_  
_v2.0 Updated November, 2025_

