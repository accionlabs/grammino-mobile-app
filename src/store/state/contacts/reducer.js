import produce from "immer";
import * as types from "./types";

const initialState = {
  operation: "", //"loading","syncing"
  isLoading: false,
  hasError: false,
  errMsg: "",
  data: [],
  syncedContacts: [],
};

const contactsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOADING_CONTACTS: {
        draft.operation = "loading";
        draft.isLoading = true;
        draft.hasError = false;
        draft.errMsg = "";
        break;
      }
      case types.LOAD_CONTACTS_SUCCESS: {
        draft.operation = "";
        draft.isLoading = false;
        draft.hasError = false;
        draft.errMsg = "";
        draft.data = action.payload;
        break;
      }
      case types.LOAD_CONTACTS_FAILED: {
        draft.operation = "";
        draft.isLoading = false;
        draft.hasError = true;
        draft.errMsg = action.payload;
        break;
      }

      case types.SYNCING_CONTACTS: {
        draft.operation = "syncing";
        draft.isLoading = true;
        draft.hasError = false;
        draft.errMsg = "";
        break;
      }
      case types.SYNC_CONTACTS_SUCCESS: {
        draft.operation = "";
        draft.isLoading = false;
        draft.hasError = false;
        draft.errMsg = "";
        draft.syncedContacts = action.payload;
        break;
      }
      case types.LOAD_CONTACTS_FAILED: {
        draft.operation = "";
        draft.isLoading = false;
        draft.hasError = true;
        draft.errMsg = action.payload;
        dratt.syncedContacts = [];
        break;
      }

      default:
        break;
    }
  });

export default contactsReducer;
