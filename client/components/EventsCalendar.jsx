
// import React, { useState } from "react";
// import moment from 'moment';

// import { format, subHours, startOfMonth } from 'date-fns';
// import { MonthlyBody, MonthlyCalendar, MonthlyNav, DefaultMonthlyEventItem} from '@zach.codes/react-calendar';
// import 'react-big-calendar/dist/calendar-tailwind.css';



// const EventsCalendar = () => {

//   const [ currentMonth, setCurrentMonth ] = useState(new Date());

//   return (
//     <MonthlyCalendar
//       currentMonth={currentMonth}
//       onCurrentMonthChange={date => setCurrentMonth(date)}
//     >
//       <MonthlyNav />
//       <MonthlyBody
//         events={[

//           { title: 'Meeting with Bob', date: new Date() },
//         ]}
//         renderDay={data =>
//           data.map((item, index) => (
//             <DefaultMonthlyEventItem
//               key={index}
//               title={item.title}
//               date={item.date}
//             />
//           ))
//         }
//       />
//     </MonthlyCalendar>
//   );
// };

//export default EventsCalendar;

import React, { useState } from "react";
import moment from 'moment';

import { format, subHours, startOfMonth } from 'date-fns';
import { MonthlyBody, MonthlyCalendar, MonthlyNav, DefaultMonthlyEventItem} from '@zach.codes/react-calendar';
//import 'react-big-calendar/dist/calendar-tailwind.css';



const EventsCalendar = () => {

  const [ currentMonth, setCurrentMonth ] = useState(new Date());

  return (
    <MonthlyCalendar
      currentMonth={currentMonth}
      onCurrentMonthChange={date => setCurrentMonth(date)}
    >
      <MonthlyNav />
      <MonthlyBody
        events={[

          { title: 'Meeting with Bob', date: new Date() },
        ]}
        renderDay={data =>
          data.map((item, index) => (
            <DefaultMonthlyEventItem
              key={index}
              title={item.title}
              date={item.date}
            />
          ))
        }
      />
    </MonthlyCalendar>
  );
};

export default EventsCalendar;

