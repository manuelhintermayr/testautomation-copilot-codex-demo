# Test Automation with Copilot/Codex Demo

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Overview
This repository demonstrates the capabilities of AI-assisted test automation using GitHub Copilot and OpenAI Codex. It showcases a progressive, step-by-step approach to building comprehensive test automation for a web application.

## Repository Structure

### System Under Test (SUT)
The `sut/` folder contains the application being tested - a fully functional e-commerce webshop built with Vue.js 3 and Tailwind CSS. This single-page application includes:
- Product catalog with search functionality
- Shopping cart management
- Checkout process with delivery options
- Order confirmation

### Step-by-Step Solutions
The repository contains multiple `step_x` folders (step_0, step_1, step_2, ... step_n), where each folder represents an incremental advancement in the test automation journey:

- **step_0**: Initial Playwright project setup
- **step_1** through **step_n**: Each subsequent step builds upon the previous one, adding new test scenarios, patterns, or automation capabilities

Each step folder contains:
- The complete solution code for that step
- A README.md describing the prompt used to generate the solution
- Documentation of what was accomplished in that step
- Any relevant configuration or setup instructions

## Getting Started

1. Review the System Under Test in the `sut/` folder
2. Start with `step_0/` and progress through each step sequentially
3. Each step's README.md contains the exact prompt used and explains the evolution of the test automation

## Purpose

This demo illustrates how AI-powered tools can accelerate and enhance test automation development by:
- Generating test code from natural language descriptions
- Creating maintainable test patterns
- Implementing best practices in test automation
- Iteratively building comprehensive test coverage

Each step demonstrates a specific capability or pattern, showing the progression from basic setup to advanced test automation scenarios.
