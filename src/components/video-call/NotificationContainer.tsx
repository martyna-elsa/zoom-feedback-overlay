
import React from 'react';
import NotificationAlert from './NotificationAlert';

interface NotificationContainerProps {
  headerVisible: boolean;
  showNotification: boolean;
  showFacilitatorHint: boolean;
  facilitatorVisibleToAll: boolean;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  headerVisible,
  showNotification,
  showFacilitatorHint,
  facilitatorVisibleToAll
}) => {
  const questionText = "There is one question which remained unanswered from Michael: \"Who else is involved in the decision-making process?\"";
  
  return (
    <>
      {showNotification && headerVisible && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-30 w-auto max-w-lg px-4 py-2">
          <NotificationAlert
            isVisible={true}
            title="Unanswered Question"
            description={questionText}
          />
        </div>
      )}
      
      {showFacilitatorHint && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-30 w-auto max-w-lg px-4 py-2">
          <NotificationAlert
            isVisible={true}
            title="Unanswered Question"
            description={questionText}
            isVisibleToAll={facilitatorVisibleToAll}
          />
        </div>
      )}
    </>
  );
};

export default NotificationContainer;
