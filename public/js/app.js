// Registration Form Submission
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const userId = document.getElementById('regUserId').value;
    const deviceId = document.getElementById('regDeviceId').value;
    const name = document.getElementById('regName').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, deviceId, name, phone, password })
        });
        const data = await response.json();
        alert(data.message || 'Registration successful!');
    } catch (error) {
        console.error('Error:', error);
    }
});

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const userId = document.getElementById('loginUserId').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            window.location.href = 'chat.html';
        } else {
            alert(data.error || 'Login failed!');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Create Chat Room Form Submission
document.getElementById('createRoomForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const roomId = document.getElementById('roomId').value;
    const name = document.getElementById('roomName').value;
    const password = document.getElementById('roomPassword').value;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/api/chatrooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ roomId, name, password })
        });
        const data = await response.json();
        alert(data.message || 'Room created successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
});

// WebSocket for Chat Room
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
    console.log('WebSocket connection opened');
};

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML += `<div><strong>${message.userId}:</strong> ${message.message}</div>`;
};

document.getElementById('messageForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.getElementById('messageInput').value;
    const userId = 'your_user_id'; // Replace with actual user ID
    const chatRoomId = 'your_chat_room_id'; // Replace with actual chat room ID

    ws.send(JSON.stringify({ userId, chatRoomId, message }));
    document.getElementById('messageInput').value = '';
});
