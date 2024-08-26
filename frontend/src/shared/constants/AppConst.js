export const authRole = {
  Admin: ['admin'],
  User: ['user', 'admin', 'teacher', 'parent'],
};

export const RoutePermittedRole = {
  Admin: 'admin',
  User: 'user',
  Teacher: 'teacher',
  Parent: 'parent',
};
export const defaultUser = {
  displayName: 'John Alex',
  email: 'demo@example.com',
  token: 'access-token',
  role: 'user',
  photoURL: '/assets/images/avatar/A11.jpg',
};
export const fileStackKey = 'Ach6MsgoQHGK6tCaq5uJgz';
export const initialUrl = '/sample/SurveyEditor'; // this url will open after login
export const landingUrl = '/';
