import React from 'react';

const SocialTab = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="rmr-mb-6">
        <h1 className="rmr-text-3xl rmr-font-bold rmr-text-center rmr-mb-2">
          Social Metrics
        </h1>
        <p className="rmr-text-center rmr-text-lg rmr-text-gray-600">
          Comprehensive social impact analysis
        </p>
      </div>
      
      {/* Main Content */}
      <div className="rmr-card">
        <div className="rmr-p-6">
          <h5 className="rmr-text-xl rmr-font-semibold rmr-mb-4">Social Dashboard Coming Soon</h5>
          <p className="rmr-mb-4">This section will include detailed social metrics including:</p>
          <ul className="rmr-list-disc rmr-pl-4">
            <li>Employee satisfaction scores</li>
            <li>Diversity and inclusion metrics</li>
            <li>Community engagement</li>
            <li>Health and safety records</li>
            <li>Training and development</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SocialTab; 