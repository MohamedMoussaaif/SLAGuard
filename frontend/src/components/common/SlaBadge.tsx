import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { differenceInMinutes, formatDistanceToNow, isPast } from 'date-fns';

interface SlaBadgeProps {
  deadline: string;
  isBreached: boolean;
  status: string;
}

export const SlaBadge: React.FC<SlaBadgeProps> = ({ deadline, isBreached, status }) => {
  const [, setTick] = useState(0);

  // Update timer every minute
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  if (status === 'RESOLVED' || status === 'CLOSED') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
        <CheckCircle2 className="h-3.5 w-3.5" /> Resolved
      </span>
    );
  }

  const deadlineDate = new Date(deadline);
  const breached = isBreached || isPast(deadlineDate);
  const minutesLeft = differenceInMinutes(deadlineDate, new Date());

  // 1. Breached (Red)
  if (breached) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-red-100 text-red-800 border border-red-300">
        <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
        SLA Breached
      </span>
    );
  }

  // 2. Near Breach: Less than 2 hours left (Yellow/Amber)
  if (minutesLeft < 120) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
        <Clock className="h-3.5 w-3.5 text-amber-600 animate-spin" />
        {formatDistanceToNow(deadlineDate)} left
      </span>
    );
  }

  // 3. Safe (Green)
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
      <Clock className="h-3.5 w-3.5 text-emerald-500" />
      {formatDistanceToNow(deadlineDate)} left
    </span>
  );
};