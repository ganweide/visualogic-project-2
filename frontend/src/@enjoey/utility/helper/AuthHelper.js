import {authRole} from 'shared/constants/AppConst';

export const getUserFromAuth0 = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.sub,
      displayName: user.name,
      email: user.email,
      photoURL: user.picture,
      role: authRole.User,
    };
  return user;
};

export const getUserFromFirebase = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.uid,
      displayName: user.displayName ? user.displayName : 'Web User',
      email: user.email,
      photoURL: user.photoURL ? user.photoURL : '/assets/images/avatar/A11.jpg',
      role: authRole.User,
    };
  return user;
};
export const getUserFromAWS = (user) => {
  if (user) {
    if (user.challengeParam) {
      return {
        id: 1,
        uid: user.challengeParam.userAttributes['custom:user-id'],
        displayName: user.username ? user.username : 'Web User',
        email: user.challengeParam.userAttributes['email'],
        photoURL: user.photoURL,
        role: user.challengeParam.userAttributes['custom:role'],
      };
    } else {
      return {
        id: 1,
        uid: user.attributes['custom:user-id'],
        displayName: user.username ? user.username : 'Web User',
        email: user.attributes.email,
        photoURL: user.photoURL,
        role: user.attributes['custom:role'],
        // role: authRole.User,
      };
    }
  }

  return user;
};

export const getUserFromJwtAuth = (user) => {
  if (user)
    return {
      id: 1,
      uid: user._id,
      displayName: user.name,
      email: user.email,
      photoURL: user.avatar,
      role: authRole.User,
    };
  return user;
};
