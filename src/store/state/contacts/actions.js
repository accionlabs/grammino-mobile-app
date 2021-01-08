import * as types from "./types";

export const loadContacts = () => ({
  type: types.LOAD_CONTACTS,
});

export const loadingContacts = () => ({
  type: types.LOADING_CONTACTS,
});

export const loadContactsSuccess = (data) => ({
  type: types.LOAD_CONTACTS_SUCCESS,
  payload: data,
});

export const loadContactsFailed = (data) => ({
  type: types.LOAD_CONTACTS_FAILED,
  payload: data,
});

export const syncContacts = (data) => ({
  type: types.SYNC_CONTACTS,
  payload: data,
});

export const syncingContacts = () => ({
  type: types.SYNCING_CONTACTS,
});

export const syncContactsSuccess = (data) => ({
  type: types.SYNC_CONTACTS_SUCCESS,
  payload: data,
});

export const syncContactsFailed = (data) => ({
  type: types.SYNC_CONTACTS_FAILED,
  payload: data,
});
