import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {Block, Text} from 'galio-framework';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appOperations} from '../../../store/state/app';
import {ProgressBar} from '@react-native-community/progress-bar-android';

function AppIndicator(props) {
  const dispatch = useDispatch();
  const loaderInfo = useSelector((state) => state.app.loader);
  const errorInfo = useSelector((state) => state.app.error);

  const dismissError = () => {
    dispatch(appOperations.dismissErrorModal());
  };

  return (
    <Modal
      visible={loaderInfo.isVisible || errorInfo.isVisible}
      animationType="fade"
      transparent={true}>
      <Block
        style={[
          styles.container,
          {justifyContent: errorInfo.isVisible ? 'flex-end' : 'flex-start'},
        ]}>
        {errorInfo.isVisible ? (
          <Block style={styles.errorBlock}>
            <View style={styles.errorDismisser}>
              <TouchableOpacity onPress={dismissError}>
                <MaterialIcons name="close" size={30} color="#F04E58" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="error" size={60} color="#F04E58" />
            </View>
            <View style={{width: '70%'}}>
              <Text style={styles.errorTitle} h6>
                Oops!
              </Text>
              <Text style={styles.errorText}>
                {errorInfo.message ||
                  'An error occured while accessing your contacts. Please grant permission for accessing the same'}
              </Text>
            </View>
          </Block>
        ) : (
          <>
            <Block style={styles.loaderBlock}>
              <Text style={styles.loaderText}>
                {loaderInfo.message || 'Please wait...'}
              </Text>
              <ProgressBar
                color="#F04E58"
                styleAttr="Horizontal"
                style={{
                  width: '100%',
                  height: 25,
                  padding: 0,
                  margin: 0,
                  position: 'absolute',
                  bottom: -10,
                }}
              />
            </Block>
          </>
        )}
      </Block>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  errorBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#F04E58',
  },
  errorDismisser: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -25,
    right: 5,
  },
  loaderBlock: {
    margin: 0,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    height: 50,
    // paddingTop: 10,
    // paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorTitle: {
    fontFamily: 'Avenir Black',
    margin: 0,
  },
  errorText: {
    fontFamily: 'Avenir-Roman',
  },
  loaderText: {
    // marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Avenir Black',
  },
});

AppIndicator.propTypes = {};

export default AppIndicator;
