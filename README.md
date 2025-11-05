# Test Automation with Copilot/Codex Demo

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Overview
This repository demonstrates the capabilities of AI-assisted test automation using GitHub Copilot and OpenAI Codex. It showcases a progressive, step-by-step approach to building comprehensive test automation for a web application.

## Repository Structure

### Step-by-Step Solutions
The repository contains multiple `step_x` folders (step_0, step_1, step_2, ... step_n), where each folder represents an incremental advancement in the test automation journey:

- **step_0** through **step_n**: Each subsequent step builds upon the previous one, adding new test scenarios, patterns, or automation capabilities

Each step folder contains:
- The complete solution code for that step
- A PROMPT.md file documenting the exact prompts used and the results achieved
- A README.md describing what was accomplished in that step
- Any relevant configuration or setup instructions

### System Under Test (SUT)
Located in `step_x/sut/`, this folder contains the application being tested - a fully functional e-commerce webshop - everything mocked. 

## Getting Started

1. Start with `step_0/` folder
2. Review the `step_0/PROMPT.md` to understand the prompts and implementation
3. Explore the System Under Test in `step_0/sut/`
4. Progress through each subsequent step sequentially
5. Each step's PROMPT.md and README.md explain the evolution of the test automation

## Solution Results:

- **step_0**: Initial Playwright project setup and System Under Test (SUT)
  - Contains the `sut/` subfolder with a fully functional e-commerce webshop built with Vue.js 3 and Tailwind CSS
  - Includes Playwright test framework configuration
  - See `step_0/PROMPT.md` for detailed prompts and implementation notes


## Purpose

This demo illustrates how AI-powered tools can accelerate and enhance test automation development by:
- Generating test code from natural language descriptions
- Creating maintainable test patterns
- Implementing best practices in test automation
- Iteratively building comprehensive test coverage

Each step demonstrates a specific capability or pattern, showing the progression from basic setup to advanced test automation scenarios.
