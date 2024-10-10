import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Calendar = () => {

  const [activityData, setActivityData] = useState([]);
  const user = useSelector((store) => store.user);

  const fetchActivityData = async () => {
    try {
      console.log('Fetching activity data');
      console.log(user.userInfo.username);
      const response = await fetch(`http://localhost:3000/activity/all/${user.userInfo.username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.token}`, // Add the token in the Authorization header
            'Content-Type': 'application/json'
        }
    });
           
      if (!response ) {
        throw new Error('Network response was not ok');
      }

      const content = await response.json();
      setActivityData(content);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const data = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  const getHeatmapColor = (activityLevel) => {
    switch (activityLevel) {
      case 0:
        return 'bg-gray-200'; // No activity
      case 1:
        return 'bg-green-400';
      case 2:
        return 'bg-green-600';
      case 3:
        return 'bg-yellow-300';
      case 4:
        return 'bg-yellow-400';
      case 5:
        return 'bg-yellow-500'; // Highest activity
      default:
        return 'bg-red-400';
    }
  };

  useEffect(() => {
    // Fetch data only when component mounts or user changes
    const fetchData = async () => {
      await fetchActivityData();
    };
    fetchData();
  }, [user]);
  
  useEffect(() => {
    // Render calendar only when activityData changes
      renderCalendar();
  }, [activityData]);
  

  const renderCalendar = () => {
    const monthContainer = document.getElementById('month');
    if (monthContainer) {
      // Clear any previously rendered elements to avoid duplication
      monthContainer.innerHTML = '';

      Object.entries(data).forEach(([month, days]) => {
        console.log(`Rendering month: ${month}`);

        // Find the activity data for the month
        const monthActivity = activityData.find(
          (item) => item.month === parseInt(month)
        );

        // If activity data exists for the month, use it; otherwise, use default data
        const activityLevels = monthActivity
          ? Array.from({ length: days }, (_, i) =>
              monthActivity.days.find((d) => d.day === i + 1)?.data || 0
            )
          : Array.from({ length: days }, () => 0);

        // Create month div
        const monthDiv = document.createElement('div');
        monthDiv.classList.add(
          'flex', 'flex-col', 'items-center', 'justify-center',
          'w-64', 'h-auto', 'text-center', 'bg-white', 'rounded-lg', 'p-4', 'm-2', 'shadow-md'
        );

        // Create and append month heading
        const monthHeading = document.createElement('h3');
        monthHeading.classList.add('font-bold', 'text-lg', 'mb-2');
        monthHeading.textContent = `Month ${month}`;
        monthDiv.appendChild(monthHeading);

        // Create the grid container for the days
        const gridContainer = document.createElement('div');
        gridContainer.classList.add('grid', 'grid-cols-7', 'gap-1');

        // Create and append each day
        activityLevels.forEach((activityLevel, index) => {
          const dayDiv = document.createElement('div');
          dayDiv.classList.add('w-8', 'h-8', getHeatmapColor(activityLevel), 'rounded', 'flex', 'items-center', 'justify-center');

          const dayText = document.createElement('p');
          dayText.classList.add('text-xs', 'text-gray-800');
          dayText.textContent = index + 1;

          dayDiv.appendChild(dayText);
          gridContainer.appendChild(dayDiv);
        });

        monthDiv.appendChild(gridContainer);
        monthContainer.appendChild(monthDiv);
      });
    }
  };

  return <div id="month" className="flex flex-wrap justify-center"></div>;
};

export default Calendar;
