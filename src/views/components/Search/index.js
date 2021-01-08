import {Block, Input} from 'galio-framework';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import Theme from "../../../constants/Theme";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {MESSAGE_FACTORY} from '../../../constants/messages';
import Theme from '../../../constants/Theme';

const Search = () => {
  const [term, setTerm] = useState('');
  const language = useSelector((state) => state.app.lang);

  return (
    <Block style={styles.searchContainer}>
      <Input
        value={term}
        onChangeText={(e) => {
          setTerm(e);
        }}
        right
        rounded={true}
        color="#4A4A4A"
        placeholder={MESSAGE_FACTORY[language].search}
        placeholderTextColor="#4A4A4A"
        style={styles.searchInput}
        iconContent={<FontAwesome name="search" size={25} color="#4A4A4A" />}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    marginTop: -5,
  },
  searchInput: {
    borderColor: Theme.COLORS.INPUT,
    height: 50,
    fontFamily: 'SourceSansPro-SemiBold',
    backgroundColor: '#FAF9F9',
    borderColor: '#DEDEDE',
    margin: 0,
  },
});

export default Search;
