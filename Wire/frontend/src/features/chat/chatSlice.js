import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  activeConversationId: null,
  messages: [],
  typingUsers: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation(state, action) {
      state.activeConversationId = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setTypingUsers(state, action) {
      state.typingUsers = action.payload;
    }
  }
});

export const { setActiveConversation, addMessage, setTypingUsers } = chatSlice.actions;
export default chatSlice.reducer;
