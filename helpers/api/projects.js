// localDevices.js
const localDevices = [
  {
    _id: '1',
    id: '1',
    name: 'MRI Scanner',
    description: 'High-resolution 3T MRI scanner for detailed diagnostic imaging',
    department_id: [1, 2],
    branches: [1, 3],
    working_time_slots: [
      {
        type: 'dateRange',
        startDay: 'Monday',
        endDay: 'Friday',
        recurringTime: {
          startTime: '08:00',
          endTime: '18:00'
        }
      },
      {
        type: 'singleDate',
        date: '2023-12-25',
        startTime: '10:00',
        endTime: '14:00'
      }
    ],
    sessionPeriod: '45 minutes',
    imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s",
    location: 'Main Radiology Department, Floor 2',
    client: 'City General Hospital',
    surgeon: 'Dr. Ahmed Mahmoud',
    category: 'Diagnostic Imaging',
    tags: ['Radiology', 'Non-invasive', 'Diagnostic'],
    date: 'Installed: 15 Jan 2023'
  },
  {
    _id: '2',
    id: '2',
    name: 'CT Scanner',
    description: '64-slice CT scanner with advanced imaging capabilities',
    department_id: [1, 3],
    branches: [1, 2, 4],
    working_time_slots: [
      {
        type: 'dateRange',
        startDay: 'Sunday',
        endDay: 'Thursday',
        recurringTime: {
          startTime: '07:00',
          endTime: '22:00'
        }
      }
    ],
    sessionPeriod: '30 minutes',
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s",
    location: 'Imaging Center, Floor 1',
    client: 'City General Hospital',
    surgeon: 'Dr. Samira Al-Farsi',
    category: 'Diagnostic Imaging',
    tags: ['Radiology', 'Fast', 'High-resolution'],
    date: 'Installed: 10 Mar 2022'
  },
  {
    _id: '3',
    id: '3',
    name: 'Ultrasound Machine',
    description: 'Advanced Doppler ultrasound with 3D imaging capabilities',
    department_id: [4, 5],
    branches: [2, 3, 5],
    working_time_slots: [
      {
        type: 'dateRange',
        startDay: 'Saturday',
        endDay: 'Wednesday',
        recurringTime: {
          startTime: '09:00',
          endTime: '17:00'
        }
      }
    ],
    sessionPeriod: '30-60 minutes',
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s",
    location: 'Maternity Wing, Floor 3',
    client: 'City General Hospital',
    surgeon: 'Dr. Layla Hassan',
    category: 'Diagnostic Imaging',
    tags: ['Obstetrics', 'Cardiology', 'Portable'],
    date: 'Installed: 05 May 2023'
  },
  {
    _id: '4',
    id: '4',
    name: 'X-Ray Machine',
    description: 'Digital radiography system with low radiation exposure',
    department_id: [1, 6],
    branches: [1, 2, 3, 4, 5],
    working_time_slots: [
      {
        type: 'dateRange',
        startDay: 'Monday',
        endDay: 'Saturday',
        recurringTime: {
          startTime: '07:00',
          endTime: '23:00'
        }
      }
    ],
    sessionPeriod: '15 minutes',
    imageUrl: '/images/xray.jpg',
    image: '/images/xray.jpg',
    location: 'Emergency Department, Floor 1',
    client: 'City General Hospital',
    surgeon: 'Dr. Omar Khalid',
    category: 'Diagnostic Imaging',
    tags: ['Emergency', 'Fast', 'Basic'],
    date: 'Installed: 20 Feb 2021'
  },
  {
    _id: '5',
    id: '5',
    name: 'ECG Machine',
    description: '12-lead ECG machine with advanced cardiac monitoring',
    department_id: [2, 7],
    branches: [1, 3, 4],
    working_time_slots: [
      {
        type: 'dateRange',
        startDay: 'Sunday',
        endDay: 'Thursday',
        recurringTime: {
          startTime: '08:00',
          endTime: '20:00'
        }
      }
    ],
    sessionPeriod: '20 minutes',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s',
    location: 'Cardiology Department, Floor 2',
    client: 'City General Hospital',
    surgeon: 'Dr. Karim Abdullah',
    category: 'Cardiac Monitoring',
    tags: ['Cardiology', 'Portable', 'Essential'],
    date: 'Installed: 15 Nov 2022'
  },
  {
    _id: '6',
    id: '6',
    name: 'Dialysis Machine',
    description: 'Advanced hemodialysis system for renal failure patients',
    department_id: [3],
    branches: [1, 2],
    working_time_slots: [
      {
        type: 'dateRange',
        startDay: 'Monday',
        endDay: 'Friday',
        recurringTime: {
          startTime: '06:00',
          endTime: '18:00'
        }
      }
    ],
    sessionPeriod: '4 hours',
    imageUrl: '/images/dialysis.jpg',
    image: '/images/dialysis.jpg',
    location: 'Nephrology Unit, Floor 4',
    client: 'City General Hospital',
    surgeon: 'Dr. Amina Saleh',
    category: 'Treatment',
    tags: ['Nephrology', 'Life-saving', 'Specialized'],
    date: 'Installed: 30 Sep 2020'
  }
];

export default localDevices;