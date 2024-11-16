import React, { useState, useEffect } from 'react';
import FriendList from './components/FriendList';
import FriendForm from './components/FriendForm';
import Modal from './components/Modal';
import './index.css';

function App() {
  const [friends, setFriends] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [isListVisible, setIsListVisible] = useState(false);
  const [inputId, setInputId] = useState('');  

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const response = await fetch("https://6729c63f6d5fa4901b6e4b0c.mockapi.io/assignment_4/friend_list");
    const data = await response.json();
    setFriends(data);
  };

  const openModal = (mode, friend = null) => {
    setEditMode(mode === 'update');
    setCurrentFriend(friend);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFriend(null);
  };

  const addFriend = async (friend) => {
    const response = await fetch("https://6729c63f6d5fa4901b6e4b0c.mockapi.io/assignment_4/friend_list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(friend)
    });
    const newFriend = await response.json();
    setFriends([...friends, newFriend]);
    closeModal();
  };

  const updateFriend = async (friend) => {
    const response = await fetch(`https://6729c63f6d5fa4901b6e4b0c.mockapi.io/assignment_4/friend_list/${inputId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(friend)
    });
    const updatedFriend = await response.json();
    setFriends(friends.map(f => (f.id === updatedFriend.id ? updatedFriend : f)));
    closeModal();
  };

  const deleteFriend = async () => {
    await fetch(`https://6729c63f6d5fa4901b6e4b0c.mockapi.io/assignment_4/friend_list/${inputId}`, { method: "DELETE" });
    setFriends(friends.filter(friend => friend.id !== inputId));
  };

  const showList = () => {
    setIsListVisible(true);
  };

  return (
    <div className="App">
      <h1>Friend List</h1>
      
      <button onClick={() => openModal('add')}>데이터 추가</button>

      
      <div className="form-group">
        <label>ID:</label>
        <input 
          type="text" 
          value={inputId} 
          onChange={(e) => setInputId(e.target.value)} 
        />
      </div>

      {/* 수정 버튼 */}
      <button onClick={() => {
        const friendToUpdate = friends.find(friend => friend.id === inputId);
        if (friendToUpdate) {
          openModal('update');
        } else {
          alert('해당 ID의 친구를 찾을 수 없습니다.');
        }
      }}>
        데이터 수정
      </button>

    
      <button onClick={() => {
        if (inputId) {
          deleteFriend();
          alert("친구 정보가 삭제되었습니다.");
        } else {
          alert("ID를 입력해주세요.");
        }
      }}>
        데이터 삭제
      </button>

      <button onClick={showList}>
        리스트 보기
      </button>

    
      {isListVisible && <FriendList friends={friends} />}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <FriendForm 
          onSubmit={editMode ? updateFriend : addFriend} 
          initialData={{}}  
        />
      </Modal>
    </div>
  );
}

export default App;
