import React, { createContext, useContext, useState } from 'react';
import './notification.css';

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);
    const [active, setActive] = useState(false);

    const displayNotification = (type, message) => {
        setNotification({ type, message });
        setActive(false);

        setTimeout(() => {
            setActive(true)
        }, 10)

        setTimeout(() => {
            setActive(false); // Start fading out the notification
            setTimeout(() => {
                setNotification(null); // Remove the notification after fade out
            }, 500); // This should match the transition time for opacity
        }, 5000);
    };

    return (
        <NotificationContext.Provider value={displayNotification}>
            {children}
            {notification && (
                <div className={`notification ${notification.type} ${active ? 'active' : ''}`}>
                    {notification.message}
                </div>
            )}
        </NotificationContext.Provider>
    );
};
