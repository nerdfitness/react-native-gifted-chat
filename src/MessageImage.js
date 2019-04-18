/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View, ViewPropTypes } from 'react-native';
import Lightbox from 'react-native-lightbox';

export default class MessageImage extends React.Component {

  shouldComponentUpdate(nextProps) {
    const next = nextProps.currentMessage;
    const current = this.props.currentMessage;

    return (
      next.sent !== current.sent ||
      next.received !== current.received ||
      next.pending !== current.pending ||
      next.createdAt !== current.createdAt ||
      next.text !== current.text ||
      next.image !== current.image ||
      next.video !== current.video ||
      next.audio !== current.audio
    );
  }
  render() {
    const {
      containerStyle,
      lightboxProps,
      imageProps,
      imageStyle,
      currentMessage,
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <Lightbox
          activeProps={{
            style: styles.imageActive,
          }}
          {...lightboxProps}
        >
          <Image
            {...imageProps}
            style={[styles.image, imageStyle]}
            source={{ uri: currentMessage.image }}
          />
        </Lightbox>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
});

MessageImage.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  lightboxProps: {},
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};
