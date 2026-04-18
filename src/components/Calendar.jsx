import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isWithinInterval,
  startOfDay,
  endOfDay
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Calendar({ 
  lastPeriodStart, 
  nextPeriodDate, 
  ovulationDate, 
  fertileWindowStart, 
  fertileWindowEnd 
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sparkles, setSparkles] = useState([]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleDayClick = (e) => {
    // Show sparkle effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSparkle = { id: Date.now(), x, y };

    setSparkles((prev) => [...prev, newSparkle]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 600); // Duration of the animation
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;

      const isCurrentMonth = isSameMonth(cloneDay, monthStart);
      const isPeriodPrediction = isWithinInterval(cloneDay, {
        start: startOfDay(nextPeriodDate),
        end: endOfDay(addDays(nextPeriodDate, 4))
      });
      const isLastPeriod = isWithinInterval(cloneDay, {
        start: startOfDay(lastPeriodStart),
        end: endOfDay(addDays(lastPeriodStart, 4))
      });
      const isOvulation = isSameDay(cloneDay, ovulationDate);
      
      const inFertileWindow = isWithinInterval(cloneDay, { 
        start: startOfDay(fertileWindowStart), 
        end: startOfDay(fertileWindowEnd) 
      });

      // Styling based on state
      let dayClassName = "calendar-day ";
      if (!isCurrentMonth) {
        dayClassName += "disabled ";
      }
      
      if (isPeriodPrediction || isLastPeriod) {
        dayClassName += "highlight-period ";
      } else if (inFertileWindow && !isOvulation) {
        dayClassName += "highlight-fertile ";
      } else if (isOvulation) {
        dayClassName += "highlight-ovulation ";
      }

      days.push(
        <div 
          className={dayClassName} 
          key={cloneDay.toISOString()}
          onClick={isCurrentMonth ? handleDayClick : undefined}
        >
          <span>{formattedDate}</span>
          {isOvulation && <div className="dot ovulation-dot"></div>}
          {(isPeriodPrediction || isLastPeriod) && <div className="dot period-dot"></div>}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="calendar-row" key={day.toISOString()}>
        {days}
      </div>
    );
    days = [];
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
    <div className="calendar-weekday" key={d}>{d}</div>
  ));

  return (
    <div className="glass-panel calendar-container">
      <div className="calendar-header">
        <button className="icon-btn" onClick={prevMonth}><ChevronLeft size={20}/></button>
        <span className="month-label">{format(currentDate, "MMMM yyyy")}</span>
        <button className="icon-btn" onClick={nextMonth}><ChevronRight size={20}/></button>
      </div>
      <div className="calendar-weekdays">
        {weekDays}
      </div>
      <div className="calendar-grid">
        {rows}
        {sparkles.map(s => (
          <div 
            key={s.id} 
            className="sparkle" 
            style={{ left: s.x, top: s.y }}
          >
            ✨
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-swatch" style={{background: 'var(--primary-color)'}}></div>
          <span>Period (Logged & Predicted)</span>
        </div>
        <div className="legend-item">
          <div className="legend-swatch" style={{background: '#e8def8'}}></div>
          <span>Fertile Window</span>
        </div>
        <div className="legend-item">
          <div className="legend-swatch" style={{background: '#d0bcff'}}></div>
          <span>Ovulation</span>
        </div>
      </div>
    </div>
  );
}
