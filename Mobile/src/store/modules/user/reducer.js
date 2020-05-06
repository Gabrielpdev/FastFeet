import produce from 'immer';

const INITIAL_SATE = {
  profile: null,
  loading: false,
};

export default function deliveryman(state = INITIAL_SATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.deliveryman;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }

      default:
    }
  });
}
