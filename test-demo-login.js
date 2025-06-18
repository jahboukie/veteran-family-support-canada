// Quick test for demo login functionality
import { chromium } from 'playwright';

async function testDemoLogin() {
  console.log('🍁 Testing Canadian Family Support Demo Login...\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to auth page
    console.log('📍 Navigating to auth page...');
    await page.goto('http://localhost:3015/auth');
    await page.waitForLoadState('networkidle');
    
    // Load demo credentials
    console.log('🔧 Loading demo credentials...');
    await page.click('text=🍁 Load Canadian Demo Credentials');
    await page.waitForTimeout(1000);
    
    // Verify credentials are loaded
    const email = await page.inputValue('input[type="email"]');
    const password = await page.inputValue('input[type="password"]');
    
    console.log(`📧 Email loaded: ${email}`);
    console.log(`🔐 Password loaded: ${password ? '✓ Password set' : '✗ No password'}`);
    
    // Submit login
    console.log('🚀 Submitting login...');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    // Check if redirected to dashboard
    const currentUrl = page.url();
    console.log(`📍 Current URL: ${currentUrl}`);
    
    if (currentUrl.includes('/dashboard')) {
      console.log('✅ SUCCESS: Demo login worked! Redirected to dashboard.');
      
      // Check for dashboard elements
      const dashboardTitle = await page.locator('h1').first().textContent();
      console.log(`📊 Dashboard title: ${dashboardTitle}`);
      
      // Check for family member name
      const familyName = await page.locator('text=Sarah Johnson').isVisible();
      console.log(`👤 Family member name visible: ${familyName ? '✅' : '❌'}`);
      
    } else {
      console.log('❌ FAILED: Not redirected to dashboard');
      
      // Check for error messages
      const errorToast = await page.locator('[role="alert"]').isVisible();
      if (errorToast) {
        const errorText = await page.locator('[role="alert"]').textContent();
        console.log(`⚠️ Error message: ${errorText}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testDemoLogin().catch(console.error);
