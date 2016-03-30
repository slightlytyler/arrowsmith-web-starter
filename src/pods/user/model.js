import { createProject } from 'pods/project/model';
import { push } from 'react-router-redux';

export const initializeUser = () => (dispatch, getState) => {
  const { firebase, auth } = getState();

  firebase
    .child('projects')
    .orderByChild('userId')
    .equalTo(auth.uid)
    .once('child_added', snapshot => {
      dispatch(push(`/projects/${snapshot.key()}/goals/active`));
    })
  ;

  dispatch(createProject('Awesome Project'));
};
