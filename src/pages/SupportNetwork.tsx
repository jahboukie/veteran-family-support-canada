import React, { useState } from 'react'
import { 
  UserGroupIcon,
  PlusIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  HeartIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { useFamily } from '../contexts/FamilyContext'

export default function SupportNetwork() {
  const { familyProfile } = useFamily()
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: false,
    notificationPreference: 'phone'
  })

  // Demo support network data
  const supportContacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      relationship: 'Sister',
      phone: '+1 (416) 555-0123',
      email: 'sarah.j@email.com',
      address: 'Toronto, ON',
      emergencyContact: true,
      lastContact: '2024-03-10',
      status: 'active'
    },
    {
      id: 2,
      name: 'Mike Thompson',
      relationship: 'Best Friend',
      phone: '+1 (416) 555-0456',
      email: 'mike.thompson@email.com',
      address: 'Mississauga, ON',
      emergencyContact: true,
      lastContact: '2024-03-08',
      status: 'active'
    },
    {
      id: 3,
      name: 'Dr. Lisa Chen',
      relationship: 'Family Doctor',
      phone: '+1 (416) 555-0789',
      email: 'dr.chen@clinic.com',
      address: 'Toronto, ON',
      emergencyContact: false,
      lastContact: '2024-02-28',
      status: 'professional'
    },
    {
      id: 4,
      name: 'OSISS Support Group',
      relationship: 'Support Group',
      phone: '+1 (800) 883-6094',
      email: 'support@osiss.ca',
      address: 'Virtual/Local Chapters',
      emergencyContact: false,
      lastContact: '2024-03-05',
      status: 'organization'
    }
  ]

  const supportGroups = [
    {
      name: 'Military Spouses Support Circle',
      type: 'Local Group',
      location: 'Toronto, ON',
      members: 24,
      nextMeeting: '2024-03-20',
      description: 'Weekly support group for military spouses and partners'
    },
    {
      name: 'OSISS Family Network',
      type: 'Official Program',
      location: 'Canada-wide',
      members: 500,
      nextMeeting: '2024-03-18',
      description: 'Peer support network for families affected by operational stress injuries'
    },
    {
      name: 'Virtual Family Check-ins',
      type: 'Online Group',
      location: 'Virtual',
      members: 45,
      nextMeeting: '2024-03-15',
      description: 'Bi-weekly virtual meetups for military families'
    }
  ]

  const networkResources = [
    {
      title: 'Crisis Response Team',
      description: 'Coordinated response for mental health emergencies',
      contacts: ['Emergency Services', 'VAC Crisis Line', 'Family Doctor', 'Emergency Contact'],
      actionPlan: 'Immediate notification protocol for crisis situations'
    },
    {
      title: 'Daily Support Circle',
      description: 'Regular check-ins and emotional support',
      contacts: ['Family Members', 'Close Friends', 'Support Group'],
      actionPlan: 'Routine communication and wellbeing monitoring'
    },
    {
      title: 'Professional Care Team',
      description: 'Mental health and medical professionals',
      contacts: ['Therapist', 'Family Doctor', 'Psychiatrist', 'Social Worker'],
      actionPlan: 'Coordinated care and treatment planning'
    }
  ]

  const handleAddContact = () => {
    // Add contact logic here
    setShowAddContact(false)
    setNewContact({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      emergencyContact: false,
      notificationPreference: 'phone'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'professional': return 'bg-blue-100 text-blue-800'
      case 'organization': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return HeartIcon
      case 'professional': return ShieldCheckIcon
      case 'organization': return UserGroupIcon
      default: return UserGroupIcon
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <UserGroupIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Support Network</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Build and maintain a strong support network to help you and your veteran through difficult times.
        </p>
      </div>

      {/* Network Overview */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Network Overview</h2>
          <button
            onClick={() => setShowAddContact(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Contact
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{supportContacts.length}</div>
            <p className="text-sm text-gray-600">Total Contacts</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {supportContacts.filter(c => c.emergencyContact).length}
            </div>
            <p className="text-sm text-gray-600">Emergency Contacts</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{supportGroups.length}</div>
            <p className="text-sm text-gray-600">Support Groups</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {supportContacts.filter(c => c.status === 'professional').length}
            </div>
            <p className="text-sm text-gray-600">Professionals</p>
          </div>
        </div>
      </div>

      {/* Support Contacts */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Support Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportContacts.map((contact) => {
            const StatusIcon = getStatusIcon(contact.status)
            return (
              <div key={contact.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(contact.status)}`}>
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.relationship}</p>
                    </div>
                  </div>
                  {contact.emergencyContact && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium">
                      Emergency
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    {contact.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                    {contact.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {contact.address}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last contact: {contact.lastContact}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.open(`tel:${contact.phone}`)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <PhoneIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => window.open(`mailto:${contact.email}`)}
                      className="p-1 text-green-600 hover:text-green-800"
                    >
                      <EnvelopeIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Support Groups */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Support Groups & Communities</h2>
        <div className="space-y-4">
          {supportGroups.map((group, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <UserGroupIcon className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-900">{group.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {group.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>📍 {group.location}</span>
                    <span>👥 {group.members} members</span>
                    <span>📅 Next: {group.nextMeeting}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                    Join Group
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Network Response Plans */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Network Response Plans</h2>
        <div className="space-y-6">
          {networkResources.map((resource, index) => (
            <div key={index} className="border-l-4 border-blue-200 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 mb-3">{resource.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Key Contacts:</p>
                  <div className="flex flex-wrap gap-1">
                    {resource.contacts.map((contact, contactIndex) => (
                      <span key={contactIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {contact}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Action Plan:</p>
                  <p className="text-sm text-gray-600">{resource.actionPlan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Network Activation */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mt-1" />
          <div className="ml-3">
            <h3 className="font-semibold text-red-900 mb-2">Emergency Network Activation</h3>
            <p className="text-red-800 mb-4">
              In case of a mental health crisis, your support network can be automatically notified based on your preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                <PhoneIcon className="h-4 w-4 mr-2" />
                Activate Emergency Network
              </button>
              <button className="flex items-center justify-center px-4 py-2 bg-white text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors">
                <ShieldCheckIcon className="h-4 w-4 mr-2" />
                Review Emergency Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Support Contact</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newContact.emergencyContact}
                  onChange={(e) => setNewContact({...newContact, emergencyContact: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                />
                <label className="text-sm text-gray-700">Emergency Contact</label>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddContact(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}