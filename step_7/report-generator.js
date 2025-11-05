const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

class ReportGenerator {
    constructor() {
        this.parser = new xml2js.Parser();
    }

    async generateHtmlReport(junitXmlPath, outputPath) {
        const xmlData = fs.readFileSync(junitXmlPath, 'utf8');
        const parsedData = await this.parser.parseStringPromise(xmlData);
        const testsuites = parsedData.testsuites;
        
        const stats = this.calculateStats(testsuites);
        const html = this.generateHtmlContent(testsuites, stats);
        
        fs.writeFileSync(outputPath, html);
        console.log(`✅ Custom HTML report generated: ${outputPath}`);
    }

    async generateConfluenceReport(junitXmlPath, outputPath) {
        const xmlData = fs.readFileSync(junitXmlPath, 'utf8');
        const parsedData = await this.parser.parseStringPromise(xmlData);
        const testsuites = parsedData.testsuites;
        
        const stats = this.calculateStats(testsuites);
        const markdown = this.generateConfluenceContent(testsuites, stats);
        
        fs.writeFileSync(outputPath, markdown);
        console.log(`✅ Confluence report generated: ${outputPath}`);
    }

    calculateStats(testsuites) {
        let total = 0;
        let passed = 0;
        let failed = 0;
        let skipped = 0;
        let duration = 0;

        if (testsuites.testsuite) {
            const suites = Array.isArray(testsuites.testsuite) ? testsuites.testsuite : [testsuites.testsuite];
            
            suites.forEach(suite => {
                total += parseInt(suite.$.tests || 0);
                failed += parseInt(suite.$.failures || 0);
                skipped += parseInt(suite.$.skipped || 0);
                duration += parseFloat(suite.$.time || 0);
            });
            
            passed = total - failed - skipped;
        }

        return {
            total,
            passed,
            failed,
            skipped,
            duration: Math.round(duration * 100) / 100,
            passRate: total > 0 ? Math.round((passed / total) * 100) : 0
        };
    }

    generateHtmlContent(testsuites, stats) {
        const timestamp = new Date().toLocaleString();
        const statusColor = stats.failed > 0 ? '#e74c3c' : '#27ae60';
        
        let testCaseRows = '';
        
        if (testsuites.testsuite) {
            const suites = Array.isArray(testsuites.testsuite) ? testsuites.testsuite : [testsuites.testsuite];
            
            suites.forEach(suite => {
                if (suite.testcase) {
                    const testcases = Array.isArray(suite.testcase) ? suite.testcase : [suite.testcase];
                    
                    testcases.forEach(testcase => {
                        const status = testcase.failure ? 'FAILED' : testcase.skipped ? 'SKIPPED' : 'PASSED';
                        const statusClass = testcase.failure ? 'failed' : testcase.skipped ? 'skipped' : 'passed';
                        const time = parseFloat(testcase.$.time || 0).toFixed(2);
                        
                        let errorMessage = '';
                        let errorDetails = '';
                        
                        if (testcase.failure && testcase.failure[0]) {
                            errorMessage = testcase.failure[0].$.message || 'Test failure';
                            errorDetails = testcase.failure[0]._ || '';
                            
                            // Extract key error information
                            if (errorDetails) {
                                const lines = errorDetails.split('\n');
                                const errorLine = lines.find(line => line.trim().startsWith('Error:')) || '';
                                errorDetails = errorLine.replace('Error:', '').trim().substring(0, 150);
                            }
                        }
                        
                        const errorInfo = errorMessage ? `<div class="error-container"><span class="error-message" title="${errorMessage}">❌ ${errorMessage.substring(0, 80)}...</span>${errorDetails ? `<div class="error-details">${errorDetails}...</div>` : ''}</div>` : '✅';
                        
                        testCaseRows += `
                            <tr class="${statusClass}">
                                <td class="test-name">${testcase.$.name}</td>
                                <td class="test-suite">${suite.$.name || 'Unknown Suite'}</td>
                                <td class="status status-${statusClass}">${status}</td>
                                <td class="duration">${time}s</td>
                                <td class="error">${errorInfo}</td>
                            </tr>
                        `;
                    });
                }
            });
        }

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechShop Test Report - Step 4</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 300;
        }

        .header .subtitle {
            font-size: 1.2em;
            opacity: 0.9;
        }

        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 40px;
            background: #f8f9fa;
        }

        .stat-card {
            background: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-number {
            font-size: 3em;
            font-weight: bold;
            color: ${statusColor};
            margin-bottom: 10px;
        }

        .stat-label {
            font-size: 1.1em;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .pass-rate {
            font-size: 2.5em !important;
        }

        .table-container {
            padding: 40px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        th {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        td {
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
            vertical-align: top;
        }

        .test-name {
            font-weight: 600;
            color: #333;
        }

        .test-suite {
            color: #666;
            font-size: 0.9em;
        }

        .status {
            font-weight: bold;
            padding: 8px 16px;
            border-radius: 20px;
            text-align: center;
            color: white;
        }

        .status-passed {
            background: #27ae60;
        }

        .status-failed {
            background: #e74c3c;
        }

        .status-skipped {
            background: #f39c12;
        }

        .duration {
            font-family: 'Courier New', monospace;
            color: #666;
        }

        .error-message {
            cursor: help;
            color: #e74c3c;
            font-weight: bold;
        }

        .error-container {
            max-width: 300px;
        }

        .error-details {
            margin-top: 5px;
            font-size: 0.8em;
            color: #666;
            background: #f8f9fa;
            padding: 5px 8px;
            border-radius: 4px;
            border-left: 3px solid #e74c3c;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .passed {
            background: rgba(39, 174, 96, 0.05);
        }

        .failed {
            background: rgba(231, 76, 60, 0.05);
        }

        .skipped {
            background: rgba(243, 156, 18, 0.05);
        }

        .footer {
            padding: 30px 40px;
            background: #f8f9fa;
            color: #666;
            text-align: center;
            border-top: 1px solid #eee;
        }

        .summary {
            background: white;
            margin: 20px 40px;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .summary h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.5em;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .summary-item {
            text-align: center;
        }

        .summary-item .number {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .summary-item .label {
            color: #666;
            text-transform: uppercase;
            font-size: 0.9em;
            letter-spacing: 1px;
        }

        .passed-color { color: #27ae60; }
        .failed-color { color: #e74c3c; }
        .skipped-color { color: #f39c12; }
        .total-color { color: #3498db; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 TechShop Test Report</h1>
            <div class="subtitle">Step 4 - JUnit XML Custom Report | Generated on ${timestamp}</div>
        </div>

        <div class="summary">
            <h2>📊 Test Execution Summary</h2>
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="number total-color">${stats.total}</div>
                    <div class="label">Total Tests</div>
                </div>
                <div class="summary-item">
                    <div class="number passed-color">${stats.passed}</div>
                    <div class="label">Passed</div>
                </div>
                <div class="summary-item">
                    <div class="number failed-color">${stats.failed}</div>
                    <div class="label">Failed</div>
                </div>
                <div class="summary-item">
                    <div class="number skipped-color">${stats.skipped}</div>
                    <div class="label">Skipped</div>
                </div>
                <div class="summary-item">
                    <div class="number total-color">${stats.passRate}%</div>
                    <div class="label">Pass Rate</div>
                </div>
                <div class="summary-item">
                    <div class="number total-color">${stats.duration}s</div>
                    <div class="label">Duration</div>
                </div>
            </div>
        </div>

        <div class="table-container">
            <h2 style="margin-bottom: 20px; color: #333;">📋 Detailed Test Results</h2>
            <table>
                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Test Suite</th>
                        <th>Status</th>
                        <th>Duration</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    ${testCaseRows}
                </tbody>
            </table>
        </div>

        <div class="footer">
            <p>📊 Report generated from JUnit XML by TechShop Step 4 Custom Report Generator</p>
            <p>🚀 Powered by Playwright & Node.js | Generated at ${timestamp}</p>
        </div>
    </div>
</body>
</html>`;
    }

    generateConfluenceContent(testsuites, stats) {
        const timestamp = new Date().toLocaleString();
        let testResults = '';
        
        if (testsuites.testsuite) {
            const suites = Array.isArray(testsuites.testsuite) ? testsuites.testsuite : [testsuites.testsuite];
            
            suites.forEach(suite => {
                if (suite.testcase) {
                    const testcases = Array.isArray(suite.testcase) ? suite.testcase : [suite.testcase];
                    
                    testcases.forEach(testcase => {
                        const status = testcase.failure ? '❌ FAILED' : testcase.skipped ? '⚠️ SKIPPED' : '✅ PASSED';
                        const time = parseFloat(testcase.$.time || 0).toFixed(2);
                        
                        let errorMessage = '';
                        let errorDetails = '';
                        
                        if (testcase.failure && testcase.failure[0]) {
                            errorMessage = testcase.failure[0].$.message || 'Test failure';
                            errorDetails = testcase.failure[0]._ || '';
                            
                            // Extract key error information for Confluence
                            if (errorDetails) {
                                const lines = errorDetails.split('\n');
                                const errorLine = lines.find(line => line.trim().startsWith('Error:')) || '';
                                errorDetails = errorLine.replace('Error:', '').trim().substring(0, 100);
                            }
                        }
                        
                        const errorInfo = errorMessage ? `**Error:** ${errorMessage.substring(0, 60)}...${errorDetails ? `<br/>**Details:** ${errorDetails}...` : ''}` : '✅ OK';
                        
                        testResults += `| ${testcase.$.name} | ${suite.$.name || 'Unknown Suite'} | ${status} | ${time}s | ${errorInfo} |\n`;
                    });
                }
            });
        }

        return `# 🧪 TechShop Test Report - Step 4

**Generated on:** ${timestamp}  
**Report Type:** JUnit XML Custom Analysis

---

## 📊 Executive Summary

### Test Execution Overview

> **Key Metrics**
> - **Total Tests:** ${stats.total}
> - **Passed:** ${stats.passed} ✅
> - **Failed:** ${stats.failed} ❌  
> - **Skipped:** ${stats.skipped} ⚠️
> - **Pass Rate:** ${stats.passRate}%
> - **Total Duration:** ${stats.duration} seconds

---

## 🎯 Test Status Overview

**Overall Status:** ${stats.failed > 0 ? '🔴 **TESTS FAILED**' : '🟢 **ALL TESTS PASSED**'}

- **✅ Passed Tests:** ${stats.passed}/${stats.total}
- **❌ Failed Tests:** ${stats.failed}/${stats.total}
- **⚠️ Skipped Tests:** ${stats.skipped}/${stats.total}

---

## 📋 Detailed Test Results

| Test Name | Test Suite | Status | Duration | Result |
|-----------|------------|--------|----------|--------|
${testResults}

---

## 📈 Quality Metrics

### Performance & Quality Indicators

#### Pass Rate Analysis
- **Current Pass Rate:** ${stats.passRate}%
- **Target Pass Rate:** 100%
- **Status:** ${stats.passRate >= 95 ? '🟢 **EXCELLENT**' : stats.passRate >= 80 ? '🟡 **GOOD**' : '🔴 **NEEDS IMPROVEMENT**'}

#### Execution Time
- **Total Execution Time:** ${stats.duration} seconds
- **Average Test Time:** ${stats.total > 0 ? (stats.duration / stats.total).toFixed(2) : '0'} seconds per test

---

## 🔧 Recommendations

${stats.failed > 0 ? `
> **⚠️ Action Required**
> 
> **${stats.failed} test(s) are currently failing.** Please review the failed tests and address the underlying issues:
> 
> - Check test environment setup
> - Verify application functionality  
> - Review test data and dependencies
> - Update test assertions if application behavior changed
` : `
> **✅ Great Work!**
> 
> **All tests are passing!** 🎉 
> 
> Consider the following to maintain high quality:
> - Add more edge case testing
> - Implement visual regression tests  
> - Add performance benchmarks
> - Review test coverage metrics
`}

---

## 📊 Test Environment

- **Platform:** Playwright with Chromium Browser
- **Framework:** Node.js + Vite Development Server  
- **Reporting:** JUnit XML → Custom HTML + Confluence
- **Test Scope:** E2E Testing for TechShop Application

---

*Report generated by TechShop Step 4 Custom Report Generator*  
*Last Updated: ${timestamp}*`;
    }
}

// Main execution
async function main() {
    const generator = new ReportGenerator();
    const reportsDir = path.join(__dirname, 'reports');
    const junitXmlPath = path.join(reportsDir, 'junit.xml');
    const htmlReportPath = path.join(reportsDir, 'custom-report.html');
    const confluenceReportPath = path.join(reportsDir, 'confluence-report.md');

    try {
        if (!fs.existsSync(junitXmlPath)) {
            console.error('❌ JUnit XML file not found. Please run tests first.');
            process.exit(1);
        }

        console.log('🚀 Generating custom reports...');
        
        await generator.generateHtmlReport(junitXmlPath, htmlReportPath);
        await generator.generateConfluenceReport(junitXmlPath, confluenceReportPath);
        
        console.log('\\n✨ Report generation completed successfully!');
        console.log(`📄 HTML Report: ${htmlReportPath}`);
        console.log(`📝 Confluence Report: ${confluenceReportPath}`);
        
    } catch (error) {
        console.error('❌ Error generating reports:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = ReportGenerator;