
import React from 'react';
import { Bell } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface NotificationAlertProps {
  isVisible: boolean;
  title: string;
  description: string;
  variant?: 'default' | 'destructive' | null | undefined;
  isVisibleToAll?: boolean;
}

const NotificationAlert: React.FC<NotificationAlertProps> = ({
  isVisible,
  title,
  description,
  variant = 'default',
  isVisibleToAll = false
}) => {
  if (!isVisible) return null;

  return (
    <Alert 
      variant={variant} 
      className={`${isVisibleToAll ? 'bg-blue-500/90 text-white' : 'bg-white/90 text-gray-700'} backdrop-blur-sm border-blue-600/40 shadow-md`}
    >
      <Bell className={`h-4 w-4 ${isVisibleToAll ? 'text-white' : 'text-blue-500'}`} />
      <AlertTitle>
        {title} {isVisibleToAll && <span className="text-xs font-normal ml-2">(Visible to everyone)</span>}
      </AlertTitle>
      <AlertDescription className={isVisibleToAll ? '' : 'text-gray-600'}>
        {description}
      </AlertDescription>
    </Alert>
  );
};

export default NotificationAlert;
