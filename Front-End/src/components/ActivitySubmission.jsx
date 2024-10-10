import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function ActivitySubmission() {
  const [activityTitle, setActivityTitle] = useState('');
  const [description, setDescription] = useState('');
  const user = useSelector((store) => store.user); // Retrieve user info from Redux store

  // Handle input changes
  const handleTitleChange = (e) => {
    setActivityTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle form submission


  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    console.log('Activity Submitted:', { activityTitle, description });
  
    // Send a POST request to submit the activity
    try {
      const response = await fetch(`http://localhost:3000/activity/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          username: user?.userInfo.username, // Assuming user has a username property
          title: activityTitle,
          description, // Optional if you want to include description
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Activity submitted successfully:', data);
        // Optionally reset the form or show a success message
        setActivityTitle('');
        setDescription('');
      } else {
        console.error('Failed to submit activity');
      }
    } catch (error) {
      console.error('Error submitting activity:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit Activity</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Activity Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={activityTitle}
            onChange={handleTitleChange}
            required // Make this field required
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={description}
            onChange={handleDescriptionChange}
            required // Make this field required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Submit Activity
        </button>
      </form>
    </div>
  );
}

export default ActivitySubmission;
