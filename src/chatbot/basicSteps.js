const basicSteps = [
    {
      id: '1',
      message: 'Hello my friend, please tell me your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: 'leaveApplication',
    },
    {
      id: '3',
      message: 'Please select your profession?',
      trigger: '4',
    },
    {
      id: '4',
      options: [
        { value: 'student', label: 'Faculty', trigger: '5' },
        
      ],
    },
    {
      id: '5',
      message: 'That\'s Good!!',
      end: true,
    },
  ];
  
  export default basicSteps;
  