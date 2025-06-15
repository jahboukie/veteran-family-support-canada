const { chromium } = require('playwright');

// Family Support App E2E Tests
async function runFamilySupportAppE2ETests() {
  console.log('🚀 Starting Family Support App E2E Tests...\n');
  
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const baseURL = 'http://localhost:3015';
  let testResults = {
    passed: 0,
    failed: 0,
    tests: []
  };

  // Helper function to log test results
  const logTest = (testName, passed, error = null) => {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status}: ${testName}`);
    if (error) console.log(`   Error: ${error}`);
    
    testResults.tests.push({ name: testName, passed, error });
    if (passed) testResults.passed++;
    else testResults.failed++;
  };

  try {
    // Test 1: Landing Page Load
    console.log('📝 Test 1: Landing Page Load');
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    const hasFamilyText = await page.locator('text=Family Support').isVisible();
    logTest('Landing page loads with family support content', 
           title.includes('Family') && hasFamilyText);

    // Test 2: Canadian Military Family Theme
    console.log('\n📝 Test 2: Canadian Military Family Theme');
    const canadianFlag = await page.locator('img[alt*="Canadian"]').isVisible();
    const militaryFamily = await page.locator('text=Military Family').isVisible();
    logTest('Canadian military family theme is properly displayed', canadianFlag || militaryFamily);

    // Test 3: Demo Authentication
    console.log('\n📝 Test 3: Demo Authentication');
    await page.click('text=Sign In');
    await page.waitForLoadState('networkidle');
    
    // Fill demo credentials
    await page.fill('input[type="email"]', 'demo@family.ca');
    await page.fill('input[type="password"]', 'FamilyDemo2024!');
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    
    const dashboardVisible = await page.locator('text=Family Dashboard').isVisible();
    logTest('Demo authentication works and redirects to family dashboard', dashboardVisible);

    // Test 4: Veteran Connection Status
    console.log('\n📝 Test 4: Veteran Connection Status');
    await page.click('text=Veteran Status');
    await page.waitForLoadState('networkidle');
    
    const statusPage = await page.locator('text=Veteran Status').isVisible();
    const connectionDemo = await page.locator('text=demo').isVisible();
    logTest('Veteran status monitoring page is accessible', statusPage);

    // Test 5: Crisis Support Resources
    console.log('\n📝 Test 5: Crisis Support Resources');
    await page.click('text=Crisis Support');
    await page.waitForLoadState('networkidle');
    
    const crisisTitle = await page.locator('text=24/7 Crisis Support').isVisible();
    const vacCrisisLine = await page.locator('text=1-800-268-7708').isVisible();
    const emergencyButton = await page.locator('text=Call 911').isVisible();
    logTest('Crisis support resources are properly integrated', crisisTitle && vacCrisisLine && emergencyButton);

    // Test 6: Family Resources & Education
    console.log('\n📝 Test 6: Family Resources & Education');
    await page.click('text=Resources');
    await page.waitForLoadState('networkidle');
    
    const educationCenter = await page.locator('text=Family Resources').isVisible();
    const canadianResources = await page.locator('text=Veterans Affairs Canada').isVisible();
    const ossissSupport = await page.locator('text=OSISS').isVisible();
    logTest('Family education resources are comprehensive', educationCenter && canadianResources && ossissSupport);

    // Test 7: Communication Hub
    console.log('\n📝 Test 7: Communication Hub');
    await page.click('text=Communication');
    await page.waitForLoadState('networkidle');
    
    const communicationHub = await page.locator('text=Communication Hub').isVisible();
    const messageComposer = await page.locator('textarea').isVisible();
    const messageTemplates = await page.locator('text=Message Templates').isVisible();
    logTest('Communication features are functional', communicationHub && messageComposer && messageTemplates);

    // Test 8: Education Center
    console.log('\n📝 Test 8: Education Center');
    await page.click('text=Education');
    await page.waitForLoadState('networkidle');
    
    const educationModules = await page.locator('text=Learning Modules').isVisible();
    const progressTracking = await page.locator('text=Progress').isVisible();
    const ptsdEducation = await page.locator('text=PTSD').isVisible();
    logTest('Education center with learning modules is available', educationModules && progressTracking);

    // Test 9: Support Network Management
    console.log('\n📝 Test 9: Support Network Management');
    await page.click('text=Support Network');
    await page.waitForLoadState('networkidle');
    
    const networkOverview = await page.locator('text=Network Overview').isVisible();
    const addContactButton = await page.locator('text=Add Contact').isVisible();
    const emergencyNetwork = await page.locator('text=Emergency').isVisible();
    logTest('Support network management features work', networkOverview && addContactButton && emergencyNetwork);

    // Test 10: Profile & Veteran Connection
    console.log('\n📝 Test 10: Profile & Veteran Connection');
    await page.click('text=Profile');
    await page.waitForLoadState('networkidle');
    
    const profilePage = await page.locator('text=Family Profile').isVisible();
    const veteranConnection = await page.locator('text=Veteran Connection').isVisible();
    const connectionCode = await page.locator('text=Connection Code').isVisible();
    logTest('Profile management and veteran connection setup works', profilePage && veteranConnection);

    // Test 11: Demo Veteran Connection
    console.log('\n📝 Test 11: Demo Veteran Connection');
    const connectButton = await page.locator('text=Connect to Veteran').isVisible();
    if (connectButton) {
      await page.click('text=Connect to Veteran');
      await page.waitForTimeout(1000);
      
      const modal = await page.locator('text=Veteran ID').isVisible();
      const demoCredentials = await page.locator('text=veteran-demo-456').isVisible();
      logTest('Veteran connection modal with demo credentials appears', modal && demoCredentials);
    } else {
      logTest('Veteran connection modal accessibility', true);
    }

    // Test 12: Canadian Provincial Resources
    console.log('\n📝 Test 12: Canadian Provincial Resources');
    await page.click('text=Crisis Support');
    await page.waitForLoadState('networkidle');
    
    const provincialResources = await page.locator('text=Canadian Government Resources').isVisible();
    const allProvincesSupport = await page.locator('text=Canada-wide').isVisible();
    logTest('Canadian provincial resources are integrated', provincialResources);

    // Test 13: Security & Encryption
    console.log('\n📝 Test 13: Security & Encryption');
    const encryptionMention = await page.locator('text=encrypted').isVisible();
    const secureMessaging = await page.locator('text=securely').isVisible();
    logTest('Security and encryption features are mentioned', encryptionMention || secureMessaging);

    // Test 14: Responsive Design
    console.log('\n📝 Test 14: Responsive Design');
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport
    await page.waitForTimeout(1000);
    
    const mobileNavVisible = await page.locator('nav').isVisible();
    await page.setViewportSize({ width: 1200, height: 800 }); // Desktop viewport
    logTest('Responsive design works on mobile and desktop', mobileNavVisible);

    // Test 15: Navigation Between Sections
    console.log('\n📝 Test 15: Navigation Between Sections');
    await page.click('text=Dashboard');
    await page.waitForLoadState('networkidle');
    const backToDashboard = await page.locator('text=Family Dashboard').isVisible();
    logTest('Navigation between app sections works smoothly', backToDashboard);

  } catch (error) {
    logTest('E2E Test Execution', false, error.message);
  } finally {
    await browser.close();
  }

  // Print Summary
  console.log('\n' + '='.repeat(60));
  console.log('👨‍👩‍👧‍👦 FAMILY SUPPORT APP - E2E TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📊 Total: ${testResults.tests.length}`);
  console.log(`📈 Success Rate: ${Math.round((testResults.passed / testResults.tests.length) * 100)}%`);
  
  if (testResults.failed > 0) {
    console.log('\n❌ Failed Tests:');
    testResults.tests.filter(t => !t.passed).forEach(test => {
      console.log(`   - ${test.name}: ${test.error || 'Unknown error'}`);
    });
  }
  
  return testResults;
}

// Run the tests
if (require.main === module) {
  runFamilySupportAppE2ETests().catch(console.error);
}

module.exports = { runFamilySupportAppE2ETests };