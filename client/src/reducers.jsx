import {
  CHANGE_VIEW,
  RECEIVE_ROOM,
  RECEIVE_ERROR,
  UPDATE_PLAYERS,
} from './actions';

export function players(state = null, action) {
  switch(action.type) {
    case RECEIVE_ROOM:
      return action.players;
    case UPDATE_PLAYERS:
      return action.players;
    default:
      return state;
  }
}

export function name(state = null, action) {
  switch(action.type) {
    case RECEIVE_ROOM:
      return action.name;
    default:
      return state;
  }
}

export function error(state = null, action) {
  switch(action.type) {
    case RECEIVE_ERROR:
      return action.error;
    case RECEIVE_ROOM:
      return null;
    case CHANGE_VIEW:
      return null;
    default:
      return state;
  }
}

export function view(state = 'landing', action) {
  switch(action.type) {
    case CHANGE_VIEW:
      return action.newView;
    case RECEIVE_ROOM:
      return 'waiting';
    default:
      return state;
  }
}
