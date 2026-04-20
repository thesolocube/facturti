import React from 'react';

const Notification = ({ notification }) => (
  <div className={`notification ${notification.type} ${notification.show ? 'show' : ''}`}>
    {notification.msg}
  </div>
);

export default Notification;
