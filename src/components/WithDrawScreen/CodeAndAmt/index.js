import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styles from './codeAndAmtStyle';

const CodeAndAmt = ({currentBalance, code, currentWithdrawAmt}) => {
  if (currentBalance !== null && code !== null) {
    return (
      <View style={styles.upperContainerStyle}>
        <Text style={styles.contentTextStyle}>
          Code: {code} for ${currentWithdrawAmt}
        </Text>
        <Text style={styles.contentTextStyle}>Balance: ${currentBalance}</Text>
      </View>
    );
  }
  return null;
};

export default memo(CodeAndAmt);
