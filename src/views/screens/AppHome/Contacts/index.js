import React from 'react';
import {Block} from 'galio-framework';
import SearchBar from '../../../components/Search';
import {ScrollView, StyleSheet, Dimensions, Text} from 'react-native';
import Header from '../Header';
import {useMountEffect} from '../../../../utils/hooks';
import {contactsOperations} from '../../../../store/state/contacts';
import {useDispatch, useSelector} from 'react-redux';
import Contact from './Contact';
import {MESSAGE_FACTORY} from '../../../../constants/messages';

const {width} = Dimensions.get('screen');

function Contacts(props) {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const language = useSelector((state) => state.app.lang);

  useMountEffect(() => {
    dispatch(contactsOperations.loadContacts());
  });

  const {operation, isLoading, hasError, errMsg, syncedContacts} = contacts;

  return (
    <Block flex style={styles.container}>
      <Header title="Messages" />
      <SearchBar />
      <Block flex center>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}>
          {isLoading ? (
            <Text>
              {operation === 'loading'
                ? MESSAGE_FACTORY[language].loading_contacts
                : MESSAGE_FACTORY[language].syncing_contacts}
            </Text>
          ) : hasError ? (
            <Text>{errMsg}</Text>
          ) : syncedContacts.length === 0 ? (
            <Text>{MESSAGE_FACTORY[language].no_contacts_registered}</Text>
          ) : (
            syncedContacts.map((contact, index) => (
              <Contact contact={contact} key={`contact=${index}`} />
            ))
          )}
        </ScrollView>
      </Block>
    </Block>
  );
}

Contacts.propTypes = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  scrollView: {
    width: width,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
});

export default Contacts;
