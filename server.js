const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const chatRoomRoutes = require('./routes/chatrooms');
const profileRoutes = require('./routes/profile');
const friendRequestRoutes = require('./routes/friendRequests');
const errorHandling = require('./middlewares/errorHandling');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', authRoutes);
app.use('/api', chatRoomRoutes);
app.use('/api', profileRoutes);
app.use('/api', friendRequestRoutes);
app.use(errorHandling);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
