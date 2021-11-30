import { User } from '../interface/User';
import { mockLoggedInUserProfile, mockOtherUsersProfile } from './mockUserProfile';
const mockLoggedInUser: User = {
  email: 'mockLoggedInUser@gmail.com',
  username: 'mock LoggedIn user',
  id: '1',
  profile: mockLoggedInUserProfile,
};

const mockOtherUser1: User = {
  username: 'Mock test user 1',
  email: 'mockTestUser1@gmail.com',
  id: '2',
  profile: mockOtherUsersProfile[0],
};
const mockOtherUser2: User = {
  username: 'Mock test user 2',
  email: 'mockTestUser2@gmail.com',
  id: '3',
  profile: mockOtherUsersProfile[1],
};
const mockOtherUser3: User = {
  username: 'Mock test user 3',
  email: 'mockTestUser3@gmail.com',
  id: '4',
  profile: mockOtherUsersProfile[2],
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
