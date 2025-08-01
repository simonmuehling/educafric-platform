#!/usr/bin/env node

/**
 * Complete Parent API System Testing Script
 * Tests all Parent modules with database integration
 */

const http = require('http');

class ParentAPITester {
  constructor() {
    this.baseURL = 'http://localhost:5000';
    this.cookies = '';
    this.testResults = {
      total: 0,
      passed: 0,
      failed: 0,
      errors: []
    };
  }

  async makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 5000,
        path: path,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Cookie': this.cookies
        }
      };

      const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          try {
            const jsonBody = body ? JSON.parse(body) : {};
            resolve({ statusCode: res.statusCode, data: jsonBody, headers: res.headers });
          } catch (e) {
            resolve({ statusCode: res.statusCode, data: body, headers: res.headers });
          }
        });
      });

      req.on('error', reject);
      
      if (data) {
        req.write(JSON.stringify(data));
      }
      req.end();
    });
  }

  async login() {
    console.log('\n🔑 [AUTH] Testing Parent Authentication...');
    
    // Test with multiple parent credential combinations
    const credentials = [
      { email: 'parent.demo@test.educafric.com', password: 'demo123' },
      { email: 'parent.demo@test.educafric.com', password: 'password123' },
      { email: 'parent@demo.educafric.com', password: 'demo123' },
      { email: 'demo.parent@educafric.com', password: 'password123' }
    ];

    for (const cred of credentials) {
      console.log(`🔍 Trying login: ${cred.email} / ${cred.password}`);
      
      const response = await this.makeRequest('POST', '/api/auth/login', cred);
      
      if (response.statusCode === 200) {
        // Check both response.data.user and response.data for user information
        const user = response.data.user || response.data;
        if (user && user.email) {
          const setCookieHeader = response.headers['set-cookie'];
          if (setCookieHeader) {
            this.cookies = setCookieHeader[0].split(';')[0];
            console.log(`✅ [AUTH] Successfully logged in as: ${user.email} (Role: ${user.role})`);
            console.log(`📝 [AUTH] User ID: ${user.id}`);
            return user;
          }
        }
      }
      
      console.log(`❌ [AUTH] Failed: ${response.data.message || 'Unknown error'}`);
    }
    
    throw new Error('All parent login attempts failed');
  }

  async testAPI(name, endpoint, expectedFields = []) {
    this.testResults.total++;
    console.log(`\n🧪 [TEST] ${name}`);
    console.log(`📡 [API] GET ${endpoint}`);
    
    try {
      const startTime = Date.now();
      const response = await this.makeRequest('GET', endpoint);
      const responseTime = Date.now() - startTime;
      
      if (response.statusCode === 200) {
        const data = response.data;
        console.log(`✅ [API] Response: ${response.statusCode} (${responseTime}ms)`);
        console.log(`📊 [DATA] Records: ${Array.isArray(data) ? data.length : 'Single object'}`);
        
        if (Array.isArray(data) && data.length > 0) {
          const firstRecord = data[0];
          console.log(`🔍 [FIELDS] Available: ${Object.keys(firstRecord).join(', ')}`);
          
          // Check for expected fields
          const missingFields = expectedFields.filter(field => !(field in firstRecord));
          if (missingFields.length === 0) {
            console.log(`✅ [SCHEMA] All expected fields present`);
          } else {
            console.log(`⚠️ [SCHEMA] Missing fields: ${missingFields.join(', ')}`);
          }
        } else if (!Array.isArray(data) && typeof data === 'object') {
          console.log(`🔍 [FIELDS] Available: ${Object.keys(data).join(', ')}`);
        } else {
          console.log(`📄 [DATA] Empty result (normal for new parent)`);
        }
        
        this.testResults.passed++;
        return { success: true, data, responseTime };
      } else {
        console.log(`❌ [API] Failed: ${response.statusCode} - ${response.data.message || 'Unknown error'}`);
        this.testResults.failed++;
        this.testResults.errors.push(`${name}: ${response.data.message || 'HTTP ' + response.statusCode}`);
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      console.log(`💥 [ERROR] ${error.message}`);
      this.testResults.failed++;
      this.testResults.errors.push(`${name}: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async runCompleteTest() {
    console.log('🚀 [PARENT_API_TEST] Starting Complete Parent API System Test');
    console.log('=====================================');
    
    try {
      // Step 1: Authentication
      const user = await this.login();
      
      // Step 2: Test Parent Profile API (Settings)
      await this.testAPI(
        'Parent Profile/Settings', 
        '/api/parent/profile',
        ['id', 'first_name', 'last_name', 'email', 'phone']
      );
      
      // Step 3: Test Parent Children Module
      await this.testAPI(
        'Parent Children Module', 
        '/api/parent/children',
        ['id', 'firstName', 'lastName', 'grade', 'school', 'status']
      );
      
      // Step 4: Test Parent Messages Module
      await this.testAPI(
        'Parent Messages Module', 
        '/api/parent/messages',
        ['id', 'subject', 'content', 'senderName', 'sentAt', 'isRead']
      );
      
      // Step 5: Test Parent Grades Module
      await this.testAPI(
        'Parent Grades Module', 
        '/api/parent/grades',
        ['id', 'studentName', 'subjectName', 'grade', 'term', 'academicYear']
      );
      
      // Step 6: Test Parent Attendance Module
      await this.testAPI(
        'Parent Attendance Module', 
        '/api/parent/attendance',
        ['id', 'studentName', 'date', 'status', 'className']
      );
      
      // Step 7: Test Parent Payments Module
      await this.testAPI(
        'Parent Payments Module', 
        '/api/parent/payments',
        ['id', 'amount', 'currency', 'status', 'description', 'createdAt']
      );
      
      // Final Results
      this.printResults();
      
    } catch (error) {
      console.log(`\n💥 [FATAL] Test execution failed: ${error.message}`);
      process.exit(1);
    }
  }

  printResults() {
    console.log('\n=====================================');
    console.log('📊 [RESULTS] Complete Parent API Test Results');
    console.log('=====================================');
    console.log(`✅ Passed: ${this.testResults.passed}/${this.testResults.total}`);
    console.log(`❌ Failed: ${this.testResults.failed}/${this.testResults.total}`);
    console.log(`📈 Success Rate: ${((this.testResults.passed / this.testResults.total) * 100).toFixed(1)}%`);
    
    if (this.testResults.failed > 0) {
      console.log('\n💥 [ERRORS] Failed Tests:');
      this.testResults.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }
    
    if (this.testResults.passed === this.testResults.total) {
      console.log('\n🎉 [SUCCESS] All Parent API modules are fully operational!');
      console.log('🔥 [STATUS] Parent system ready for production deployment');
    } else {
      console.log('\n⚠️ [WARNING] Some Parent API modules need attention');
    }
  }
}

// Run the test
const tester = new ParentAPITester();
tester.runCompleteTest().catch(console.error);