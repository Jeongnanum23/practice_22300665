
import React from 'react';

function FriendList({ friends }) {
  return (
    <div id="div_students">
      {friends.map(friend => (
        <div className="student-item" key={friend.id}>
          {friend.id} - {friend.name}
        </div>
      ))}
    </div>
  );
}

export default FriendList;
