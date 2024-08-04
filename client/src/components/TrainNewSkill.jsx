import React from 'react';
import { FaCheckCircle, FaUserGraduate, FaMobileAlt, FaClipboardCheck, FaQuestionCircle, FaClipboard } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-lg font-bold ml-3">{title}</h3>
    </div>
    <p className="text-gray-700">{description}</p>
  </div>
);

const TrainNewSkill = () => {
  const features = [
    {
      icon: <FaCheckCircle className="text-green-500" size={24} />,
      title: 'Wide range of courses',
      description: 'With courses ranging from dog grooming to retail banking, we\'re bound to have the perfect one for you'
    },
    {
      icon: <FaUserGraduate className="text-blue-500" size={24} />,
      title: 'Comprehensive Syllabus',
      description: 'Every course comes with easy to understand, yet detailed lessons created by experts'
    },
    {
      icon: <FaMobileAlt className="text-yellow-500" size={24} />,
      title: 'Study Anywhere/Any time',
      description: 'Study the course anywhere / any time on PC, mobile and tablet. You can even learn on your way to work'
    },
    {
      icon: <FaClipboardCheck className="text-green-500" size={24} />,
      title: 'Gain a Verifiable Qualification',
      description: 'Once you have completed your end of course test, your qualification can be validated via our website 24/7'
    },
    {
      icon: <FaQuestionCircle className="text-blue-500" size={24} />,
      title: 'Tutor Support',
      description: 'Our friendly and knowledgeable tutors are on hand to offer support if you need it'
    },
    {
      icon: <FaClipboard className="text-yellow-500" size={24} />,
      title: 'Approved Courses',
      description: 'All of our online courses have been checked and approved by CPD for your peace of mind'
    }
  ];

  return (
    <div className='p-8 mx-auto max-w-screen-xl'>
      <h1 className="text-3xl font-bold mb-8 text-center">Why You Should Train With New Skills Academy…</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default TrainNewSkill;