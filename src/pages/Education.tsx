import React from 'react'
import { 
  AcademicCapIcon,
  BookOpenIcon,
  PlayIcon,
  DocumentTextIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

export default function Education() {
  const educationModules = [
    {
      id: 1,
      title: 'Understanding Military Mental Health',
      description: 'Learn about common mental health challenges faced by Canadian veterans',
      duration: '30 minutes',
      type: 'course',
      level: 'beginner',
      topics: ['PTSD', 'Depression', 'Anxiety', 'OSI'],
      status: 'available'
    },
    {
      id: 2,
      title: 'Communication Strategies for Families',
      description: 'Effective ways to communicate with your veteran about mental health',
      duration: '45 minutes',
      type: 'workshop',
      level: 'intermediate',
      topics: ['Active Listening', 'Boundary Setting', 'Crisis Communication'],
      status: 'available'
    },
    {
      id: 3,
      title: 'Supporting Your Veteran Through Treatment',
      description: 'How to be a supportive partner during the recovery journey',
      duration: '1 hour',
      type: 'course',
      level: 'intermediate',
      topics: ['Treatment Options', 'Recovery Process', 'Relapse Prevention'],
      status: 'available'
    },
    {
      id: 4,
      title: 'Self-Care for Military Families',
      description: 'Protecting your own mental health while supporting your veteran',
      duration: '40 minutes',
      type: 'workshop',
      level: 'beginner',
      topics: ['Secondary Trauma', 'Stress Management', 'Resilience Building'],
      status: 'available'
    },
    {
      id: 5,
      title: 'Crisis Recognition and Response',
      description: 'Identifying warning signs and responding appropriately to mental health crises',
      duration: '1.5 hours',
      type: 'certification',
      level: 'advanced',
      topics: ['Warning Signs', 'De-escalation', 'Emergency Response', 'Safety Planning'],
      status: 'available'
    },
    {
      id: 6,
      title: 'Understanding Canadian Veteran Services',
      description: 'Navigate VAC benefits and support services available to your family',
      duration: '35 minutes',
      type: 'course',
      level: 'beginner',
      topics: ['VAC Benefits', 'OSISS Programs', 'Local Resources'],
      status: 'available'
    }
  ]

  const progressStats = {
    completedModules: 2,
    totalModules: 6,
    certificationsEarned: 0,
    totalHours: 3.5
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpenIcon
      case 'workshop': return UserGroupIcon
      case 'certification': return AcademicCapIcon
      default: return DocumentTextIcon
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-800'
      case 'workshop': return 'bg-green-100 text-green-800'
      case 'certification': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700'
      case 'intermediate': return 'bg-yellow-100 text-yellow-700'
      case 'advanced': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <AcademicCapIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Family Education Center</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Enhance your understanding of military mental health and develop skills to better support your veteran.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {progressStats.completedModules}/{progressStats.totalModules}
            </div>
            <p className="text-sm text-gray-600">Modules Completed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {progressStats.certificationsEarned}
            </div>
            <p className="text-sm text-gray-600">Certifications Earned</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {progressStats.totalHours}h
            </div>
            <p className="text-sm text-gray-600">Total Learning Time</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {Math.round((progressStats.completedModules / progressStats.totalModules) * 100)}%
            </div>
            <p className="text-sm text-gray-600">Overall Progress</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{progressStats.completedModules} of {progressStats.totalModules} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progressStats.completedModules / progressStats.totalModules) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Learning Modules */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Available Learning Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationModules.map((module) => {
            const TypeIcon = getTypeIcon(module.type)
            return (
              <div key={module.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(module.type)}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(module.type)}`}>
                        {module.type}
                      </span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getLevelColor(module.level)}`}>
                        {module.level}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{module.duration}</span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{module.description}</p>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Topics Covered:</p>
                  <div className="flex flex-wrap gap-1">
                    {module.topics.map((topic, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {module.id <= progressStats.completedModules ? (
                      <div className="flex items-center text-green-600">
                        <ShieldCheckIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-500">
                        <PlayIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Available</span>
                      </div>
                    )}
                  </div>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      module.id <= progressStats.completedModules
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {module.id <= progressStats.completedModules ? 'Review' : 'Start Module'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Resources */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <DocumentTextIcon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Crisis Reference Card</h3>
            <p className="text-sm text-gray-600 mb-3">Printable quick reference for crisis situations</p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Download PDF
            </button>
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <HeartIcon className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Self-Care Toolkit</h3>
            <p className="text-sm text-gray-600 mb-3">Resources for maintaining your own wellbeing</p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Access Toolkit
            </button>
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <UserGroupIcon className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Community Forum</h3>
            <p className="text-sm text-gray-600 mb-3">Connect with other military families</p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Join Discussion
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Webinars */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Live Sessions</h2>
        <div className="space-y-4">
          {[
            {
              title: 'Q&A with Mental Health Professionals',
              date: 'March 20, 2024',
              time: '7:00 PM EST',
              presenter: 'Dr. Sarah Wilson, Clinical Psychologist'
            },
            {
              title: 'Family Communication Workshop',
              date: 'March 27, 2024',
              time: '6:00 PM EST',
              presenter: 'OSISS Family Support Team'
            }
          ].map((session, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{session.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Presenter: {session.presenter}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>{session.date}</span>
                    <span>{session.time}</span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}