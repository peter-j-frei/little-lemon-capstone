import React, {useReducer } from 'react';
import ReservationForm from './ReservationForm';

// useEffect(() => {
//   const fetchTimes = async () => {
//       const times = await fetchAPI(new Date().toISOString().split('T')[0]);
//       dispatch({ type: 'INIT_TIMES', times });
//   };

//   fetchTimes();
// }, []);

// provided api inaccessible/ not working
// export const initializeTimes = async () => {
//     const today = new Date().toISOString().split('T')[0];
//     return fetchAPI(today);
// }

// provided api inaccessible/ not working, so mocking the api
export const initializeTimes = () => {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
}

// export const updateTimes = async (selectedDate) => {
//     return fetchAPI(selectedDate);
// }

// provided api inaccessible/ not working, so mocking the api
export const updateTimes = (selectedDate) => {
  const dateObj = new Date(selectedDate);
  const dayOfWeek = dateObj.getUTCDay();

  const timesMap = {
      0: ["18:00", "19:00", "20:00", "21:00", "22:00"],
      1: ["17:00", "19:00", "21:00", "22:00"],
      2: ["18:00", "20:00", "22:00"],      
      3: ["17:00", "19:00", "22:00"],      
      4: ["17:00", "18:00", "21:00"],      
      5: ["19:00", "20:00"],      
      6: ["20:00"], 
  };

  return timesMap[dayOfWeek] || [];
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT_TIMES':
            return action.times;
        case 'UPDATE_TIMES':
            return action.times; 
        default:
            return state;
    }
}

const BookingPage = () => {
    const [availableTimes, dispatch] = useReducer(reducer, []);

    React.useEffect(() => {
        (async () => {
            const times = await initializeTimes();
            dispatch({ type: 'INIT_TIMES', times });
        })();
    }, []);

    return (
            <ReservationForm availableTimes={availableTimes} dispatch={dispatch} />
    );
};

export default BookingPage;
