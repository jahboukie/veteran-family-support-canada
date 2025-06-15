import React from 'react'
import { 
  PhoneIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  HeartIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function CrisisSupport() {
  const crisisResources = [
    {
      name: 'VAC Crisis Line',
      phone: '1-800-268-7708',
      description: '24/7 crisis support for Canadian veterans and their families',
      hours: '24/7',
      languages: ['English', 'French'],
      type: 'veteran_specific'
    },
    {
      name: 'Canada Suicide Prevention Service',
      phone: '1-833-456-4566',
      description: 'National suicide prevention service available to all Canadians',
      hours: '24/7',
      languages: ['English', 'French'],
      type: 'general_crisis'
    },
    {
      name: 'OSISS Family Support',
      phone: '1-800-883-6094',
      description: 'Peer support network for families affected by operational stress injuries',
      hours: 'Varies by location',
      languages: ['English', 'French'],
      type: 'family_support'
    },
    {
      name: 'Emergency Services',
      phone: '911',
      description: 'Immediate emergency response for life-threatening situations',
      hours: '24/7',
      languages: ['English', 'French'],
      type: 'emergency'
    }
  ]

  const safetyPlanSteps = [
    {
      step: 1,
      title: 'Warning Signs',
      description: 'Recognize early warning signs of crisis in your veteran',
      examples: ['Increased isolation', 'Sleep changes', 'Mood swings', 'Substance use']
    },
    {
      step: 2,
      title: 'Coping Strategies',
      description: 'Help your veteran use healthy coping mechanisms',
      examples: ['Deep breathing', 'Physical exercise', 'Mindfulness', 'Creative activities']
    },
    {
      step: 3,
      title: 'Support People',
      description: 'Contact trusted friends, family, or support network',
      examples: ['Family members', 'Close friends', 'Military buddies', 'Support groups']
    },
    {
      step: 4,
      title: 'Professional Help',
      description: 'Connect with mental health professionals immediately',
      examples: ['Therapist', 'Doctor', 'Crisis counselor', 'Psychiatric services']
    },
    {
      step: 5,
      title: 'Environment Safety',
      description: 'Ensure immediate environment is safe and supportive',
      examples: ['Remove harmful items', 'Stay together', 'Safe location', 'Emergency contacts']
    }
  ]

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'veteran_specific': return ShieldCheckIcon
      case 'family_support': return HeartIcon
      case 'emergency': return ExclamationTriangleIcon
      default: return PhoneIcon
    }
  }

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'veteran_specific': return 'bg-red-100 text-red-600'
      case 'family_support': return 'bg-blue-100 text-blue-600'
      case 'emergency': return 'bg-orange-100 text-orange-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const callNumber = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">🍁 24/7 Crisis Support</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Immediate help is available for Canadian veterans and their families. 
          You are not alone in this journey.
        </p>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
        <div className="flex items-start">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-400 mt-1" />
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-red-800 mb-2">If this is an emergency</h3>
            <p className="text-red-700 mb-4">
              If your veteran is in immediate danger or having thoughts of suicide, 
              call emergency services immediately or go to the nearest emergency room.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => callNumber('911')}
                className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <PhoneIcon className="h-4 w-4 mr-2" />
                Call 911
              </button>
              <button
                onClick={() => callNumber('1-800-268-7708')}
                className="flex items-center justify-center px-4 py-2 bg-white text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
              >
                <PhoneIcon className="h-4 w-4 mr-2" />
                VAC Crisis Line
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Resources */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Crisis Support Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crisisResources.map((resource, index) => {
            const IconComponent = getResourceIcon(resource.type)
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getResourceColor(resource.type)}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{resource.name}</h3>
                    <button
                      onClick={() => callNumber(resource.phone)}
                      className="text-2xl font-bold text-red-600 hover:text-red-800 mb-2 block"
                    >
                      {resource.phone}
                    </button>
                    <p className="text-sm text-gray-700 mb-3">{resource.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <ClockIcon className="h-4 w-4" />
                        <span>{resource.hours}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {resource.languages.map((lang) => (
                          <span key={lang} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Family Safety Plan */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Family Crisis Safety Plan</h2>
        <p className="text-gray-600 mb-6">
          Having a plan helps you respond effectively when your veteran is in crisis. 
          Review these steps with your family and keep this information easily accessible.
        </p>
        
        <div className="space-y-6">
          {safetyPlanSteps.map((step) => (
            <div key={step.step} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {step.step}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-700 mb-3">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.examples.map((example, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crisis Communication Tips */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Crisis Communication Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-800 mb-3">✓ What TO Do</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Listen without judgment</li>
              <li>• Stay calm and reassuring</li>
              <li>• Take threats seriously</li>
              <li>• Remove access to harmful items</li>
              <li>• Stay with your veteran if safe</li>
              <li>• Call for professional help</li>
              <li>• Follow up after the crisis</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-800 mb-3">✗ What NOT to Do</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Don't argue or challenge</li>
              <li>• Don't promise to keep secrets</li>
              <li>• Don't leave them alone</li>
              <li>• Don't try to solve everything yourself</li>
              <li>• Don't minimize their feelings</li>
              <li>• Don't give up or walk away</li>
              <li>• Don't blame yourself</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Support for Families */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <HeartIcon className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Support for Families</h3>
            <p className="text-blue-800 mb-4">
              Supporting a veteran in crisis can be emotionally exhausting. Remember to take care of yourself too.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800 font-medium">OSISS Family Support: 1-800-883-6094</span>
              </div>
              <div className="flex items-center space-x-2">
                <ChatBubbleLeftRightIcon className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800">Connect with other military families in our support network</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference Card */}
      <div className="bg-gray-900 text-white rounded-lg p-6">
        <h3 className="font-semibold mb-4">🍁 Canadian Crisis Quick Reference</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium">Emergency</p>
            <p className="text-gray-300">911</p>
          </div>
          <div>
            <p className="font-medium">VAC Crisis</p>
            <p className="text-gray-300">1-800-268-7708</p>
          </div>
          <div>
            <p className="font-medium">Suicide Prevention</p>
            <p className="text-gray-300">1-833-456-4566</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Save these numbers in your phone for quick access during emergencies
        </p>
      </div>
    </div>
  )
}