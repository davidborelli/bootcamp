import React from 'react';
import PropTypes from 'prop-types';

import { Browser } from './styles';

export default function WebView({ navigation }) {
  const webView = navigation.getParam('item');

  return <Browser source={{ uri: webView.html_url }} />;
}

WebView.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

WebView.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('item').name,
});
