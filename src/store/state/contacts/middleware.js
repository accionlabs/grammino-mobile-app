import * as types from './types';
import {environment} from '../../../environment';
import * as contactsActions from './actions';
import {createLogic} from 'redux-logic';
import axios from 'axios';
import {setHeaders, setHeaders2} from '../../../services/auth';
import isEmpty from 'lodash/isEmpty';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {processPhoneNumber} from '../../../utils';

const loadContactsLogic = createLogic({
  type: types.LOAD_CONTACTS,
  latest: true,
  process({getState, action}, dispatch, done) {
    dispatch(contactsActions.loadingContacts());
    const {
      app: {
        auth: {phone},
      },
    } = getState();

    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      })
        .then((granted) => {
          console.log('Grantedddddd', granted);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            let validContacts = [];
            Contacts.getAll()
              .then((contacts) => {
                contacts.map((contact) => {
                  if (contact.phoneNumbers.length > 0) {
                    contact.phoneNumbers.forEach((phoneNumber) => {
                      let processedPhoneNumber = processPhoneNumber(
                        phoneNumber.number,
                      );
                      if (
                        processedPhoneNumber !== phone &&
                        !validContacts.includes(processedPhoneNumber)
                      ) {
                        validContacts.push(processedPhoneNumber);
                      }
                    });
                  }
                });
                if (validContacts.length > 0) {
                  console.log('Syncing contacts with server...');
                  dispatch(contactsActions.loadContactsSuccess(validContacts));
                  dispatch(contactsActions.syncContacts(validContacts));
                } else {
                  console.log('No valid contact found!');
                }
                done();
              })
              .catch((err) => {
                console.log('Catch', err);
                dispatch(
                  contactsActions.loadContactsFailed(
                    'An error occured while reading contacts',
                  ),
                );
                done();
              });
          } else {
            dispatch(
              contactsActions.loadContactsFailed(
                'Please grant permissions for reading contacts',
              ),
            );
            done();
          }
        })
        .catch((err) => {
          console.log('An error occured while accessing contacts');
          dispatch(
            contactsActions.loadContactsFailed(
              'An error occured while reading contacts',
            ),
          );
          done();
        });
    } catch (error) {
      dispatch(
        contactsActions.loadContactsFailed(
          'An error occured while reading contacts',
        ),
      );
      done();
    }
  },
});

const syncContactsLogic = createLogic({
  type: types.SYNC_CONTACTS,
  latest: true,
  process({getState, action}, dispatch, done) {
    dispatch(contactsActions.syncingContacts());
    const {
      app: {
        auth: {token},
      },
    } = getState();
    const phoneNumbers = action.payload;

    axios
      .post(
        environment + 'api/updateContacts',
        {
          phoneNumbers,
        },
        {
          headers: setHeaders({
            token: token,
          }),
        },
      )
      .then((res) => {
        const {error, message} = res.data;
        if (error) {
          dispatch(contactsActions.syncContactsFailed(message));
        } else {
          const {data} = res.data;
          dispatch(contactsActions.syncContactsSuccess(data));
        }
      })
      .catch((err) => {
        dispatch(contactsActions.syncContactsFailed());
      })
      .finally(() => {
        done();
      });
  },
});

export default [loadContactsLogic, syncContactsLogic];
