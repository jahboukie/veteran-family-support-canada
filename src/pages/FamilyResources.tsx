import React from 'react'
import { 
  BookOpenIcon,
  ShieldCheckIcon,
  HeartIcon,
  UserGroupIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

export default function FamilyResources() {
  const resourceCategories = [
    {
      title: 'Understanding Military Mental Health',
      icon: AcademicCapIcon,
      color: 'bg-blue-100 text-blue-600',
      resources: [
        {
          name: 'PTSD and Military Families',
          description: 'Understanding how PTSD affects veterans and their families',
          type: 'article',
          url: '#'
        },
        {
          name: 'Operational Stress Injuries',
          description: 'Learn about OSI and its impact on military personnel',
          type: 'guide',
          url: '#'
        },
        {
          name: 'Military Culture and Mental Health',
          description: 'How military culture affects help-seeking behavior',
          type: 'video',
          url: '#'
        }
      ]
    },
    {
      title: 'Communication & Support Strategies',
      icon: HeartIcon,
      color: 'bg-green-100 text-green-600',
      resources: [
        {
          name: 'Effective Communication with Veterans',
          description: 'How to talk to your veteran about mental health',
          type: 'guide',
          url: '#'
        },
        {
          name: 'Active Listening Techniques',
          description: 'Develop better listening skills for meaningful conversations',
          type: 'workshop',
          url: '#'
        },
        {
          name: 'Setting Healthy Boundaries',
          description: 'Balancing support with your own wellbeing',
          type: 'article',
          url: '#'
        }
      ]
    },
    {
      title: 'Crisis Recognition & Response',
      icon: ShieldCheckIcon,
      color: 'bg-red-100 text-red-600',
      resources: [
        {
          name: 'Warning Signs of Crisis',
          description: 'Recognizing when your veteran needs immediate help',
          type: 'checklist',
          url: '#'
        },
        {
          name: 'De-escalation Techniques',
          description: 'Calm and supportive approaches during difficult moments',
          type: 'training',
          url: '#'
        },
        {
          name: 'Creating a Safety Plan',
          description: 'Develop a personalized crisis response plan',
          type: 'template',
          url: '#'
        }
      ]
    },
    {
      title: 'Self-Care for Families',
      icon: HeartIcon,
      color: 'bg-purple-100 text-purple-600',
      resources: [
        {
          name: 'Secondary Trauma Prevention',
          description: 'Protecting your own mental health while supporting others',
          type: 'guide',
          url: '#'
        },
        {
          name: 'Stress Management for Caregivers',
          description: 'Techniques to manage your own stress and anxiety',
          type: 'course',
          url: '#'
        },
        {
          name: 'Building Resilience',
          description: 'Strengthen your ability to cope with challenges',
          type: 'workshop',
          url: '#'
        }
      ]
    }
  ]

  const canadianResources = [
    {
      name: 'Veterans Affairs Canada',
      description: 'Official government resources for veterans and families',
      phone: '1-866-522-2122',
      website: 'https://www.veterans.gc.ca',
      services: ['Benefits Information', 'Mental Health Services', 'Family Support']
    },
    {
      name: 'OSISS (Operational Stress Injury Social Support)',
      description: 'Peer support network for military families',
      phone: '1-800-883-6094',
      website: 'https://www.veterans.gc.ca/eng/health-support/mental-health-wellness/understand-mental-health/osiss',
      services: ['Peer Support', 'Family Programs', 'Group Sessions']
    },
    {
      name: 'Military Family Resource Centre',
      description: 'Local support for military families across Canada',
      phone: 'Varies by location',
      website: 'https://www.cafconnection.ca',
      services: ['Family Support', 'Childcare', 'Emergency Assistance']
    },
    {
      name: 'Canadian Mental Health Association',
      description: 'National mental health resources and programs',
      phone: '1-833-456-4566',
      website: 'https://cmha.ca',
      services: ['Crisis Support', 'Education', 'Advocacy']
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return BookOpenIcon
      case 'guide': return AcademicCapIcon
      case 'video': return ShieldCheckIcon
      case 'workshop': return UserGroupIcon
      case 'course': return GlobeAltIcon
      default: return BookOpenIcon
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      article: 'bg-blue-100 text-blue-800',
      guide: 'bg-green-100 text-green-800',
      video: 'bg-red-100 text-red-800',
      workshop: 'bg-purple-100 text-purple-800',
      course: 'bg-yellow-100 text-yellow-800',
      training: 'bg-orange-100 text-orange-800',
      checklist: 'bg-gray-100 text-gray-800',
      template: 'bg-indigo-100 text-indigo-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <BookOpenIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Family Resources & Education</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive resources to help you better understand and support your veteran's mental health journey.
        </p>
      </div>

      {/* Resource Categories */}
      <div className="space-y-12">
        {resourceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`p-2 rounded-lg ${category.color}`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.resources.map((resource, resourceIndex) => {
                const TypeIcon = getTypeIcon(resource.type)
                return (
                  <div key={resourceIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <TypeIcon className="h-5 w-5 text-gray-400 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeBadge(resource.type)}`}>
                            {resource.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Access Resource →
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Canadian Government Resources */}
      <div className="bg-red-50 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg" 
              alt="Canadian Flag" 
              className="h-5 w-8"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Canadian Government Resources</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {canadianResources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">{resource.name}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{resource.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GlobeAltIcon className="h-4 w-4 text-gray-500" />
                  <a href={resource.website} className="text-sm text-blue-600 hover:text-blue-800">
                    Visit Website
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Services:</p>
                <div className="flex flex-wrap gap-1">
                  {resource.services.map((service, serviceIndex) => (
                    <span key={serviceIndex} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Workshops */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Workshops & Events</h2>
        <div className="space-y-4">
          {[
            {
              title: 'Understanding PTSD in Military Families',
              date: 'March 15, 2024',
              time: '7:00 PM EST',
              format: 'Virtual Workshop',
              description: 'Learn about PTSD symptoms and how they affect family dynamics'
            },
            {
              title: 'Communication Skills for Military Spouses',
              date: 'March 22, 2024',
              time: '2:00 PM EST',
              format: 'In-Person (Toronto)',
              description: 'Develop effective communication strategies for difficult conversations'
            },
            {
              title: 'Self-Care for Military Families',
              date: 'March 29, 2024',
              time: '6:30 PM EST',
              format: 'Virtual Workshop',
              description: 'Practical self-care techniques for caregivers and family members'
            }
          ].map((workshop, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{workshop.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{workshop.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>{workshop.date}</span>
                    <span>{workshop.time}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {workshop.format}
                    </span>
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

      {/* Help & Support */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="text-center">
          <UserGroupIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need More Support?</h3>
          <p className="text-gray-600 mb-4">
            Our family support team is here to help you find the resources you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Contact Support Team
            </button>
            <button className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
              Join Support Group
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}