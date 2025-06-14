import React from 'react'
import { 
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-family-red rounded-lg flex items-center justify-center">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">VetSupport Family</h1>
                <p className="text-sm text-gray-600">Supporting Canadian Military Families</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/auth'}
                className="bg-family-red text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Family Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg" 
                  alt="Canadian Flag" 
                  className="h-8 w-12"
                />
                <ShieldCheckIcon className="h-8 w-8 text-military-green" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Supporting Those Who
              <span className="block text-family-red">Support Our Veterans</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A comprehensive platform designed for families and support networks of Canadian Armed Forces veterans, 
              providing real-time monitoring, crisis support, and educational resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/auth'}
                className="bg-family-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Connect to Your Veteran
              </button>
              <button
                onClick={() => window.location.href = '/auth?demo=true'}
                className="bg-white text-family-red border-2 border-family-red px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                Try Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Family Support
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to support your veteran's mental health journey, with Canadian-specific resources and expert guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real-time Monitoring */}
            <div className="family-card text-center">
              <div className="w-12 h-12 bg-support-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-6 w-6 text-support-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Monitoring</h3>
              <p className="text-gray-600">
                Stay connected to your veteran's wellbeing with permission-based status updates and progress tracking.
              </p>
            </div>

            {/* Crisis Support */}
            <div className="family-card text-center">
              <div className="w-12 h-12 bg-crisis-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-crisis-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Crisis Support</h3>
              <p className="text-gray-600">
                Immediate alerts and guided intervention when your veteran needs support, with direct access to VAC crisis lines.
              </p>
            </div>

            {/* Family Education */}
            <div className="family-card text-center">
              <div className="w-12 h-12 bg-military-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-6 w-6 text-military-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Family Education</h3>
              <p className="text-gray-600">
                Learn effective support strategies, communication techniques, and self-care practices for military families.
              </p>
            </div>

            {/* Canadian Resources */}
            <div className="family-card text-center">
              <div className="w-12 h-12 bg-family-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-family-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Canadian Resources</h3>
              <p className="text-gray-600">
                Access Veterans Affairs Canada services, provincial resources, and OSISS family support networks.
              </p>
            </div>

            {/* Support Network */}
            <div className="family-card text-center">
              <div className="w-12 h-12 bg-support-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-support-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Support Network</h3>
              <p className="text-gray-600">
                Connect with other military families, share experiences, and build a strong support community.
              </p>
            </div>

            {/* Professional Integration */}
            <div className="family-card text-center">
              <div className="w-12 h-12 bg-military-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="h-6 w-6 text-military-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Integration</h3>
              <p className="text-gray-600">
                Seamless connection with healthcare providers and mental health professionals specializing in veterans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Resources */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              24/7 Crisis Support Resources
            </h2>
            <p className="text-lg text-gray-600">
              Immediate help is always available for Canadian veterans and their families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <PhoneIcon className="h-8 w-8 text-family-red mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">VAC Crisis Line</h3>
              <p className="text-2xl font-bold text-family-red mb-2">1-800-268-7708</p>
              <p className="text-sm text-gray-600">24/7 support for veterans and families</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <PhoneIcon className="h-8 w-8 text-family-red mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Canada Suicide Prevention</h3>
              <p className="text-2xl font-bold text-family-red mb-2">1-833-456-4566</p>
              <p className="text-sm text-gray-600">National crisis support service</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <PhoneIcon className="h-8 w-8 text-family-red mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">OSISS Family Support</h3>
              <p className="text-2xl font-bold text-family-red mb-2">1-800-883-6094</p>
              <p className="text-sm text-gray-600">Peer support for military families</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-military-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Support Your Veteran?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Canadian military families who are using VetSupport Family to provide better care and support for their veterans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/auth'}
              className="bg-white text-military-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </button>
            <button
              onClick={() => window.location.href = '/auth?demo=true'}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-military-green transition-colors"
            >
              Try Demo First
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">VetSupport Family</h3>
              <p className="text-gray-400">
                Supporting Canadian military families with comprehensive veteran mental health resources.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Crisis Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>VAC Crisis Line: 1-800-268-7708</li>
                <li>Suicide Prevention: 1-833-456-4566</li>
                <li>OSISS Support: 1-800-883-6094</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Veteran App</li>
                <li>Family Support</li>
                <li>Provider Network</li>
                <li>Canadian Resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VetSupport Family. Supporting Canadian veterans and their families.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}