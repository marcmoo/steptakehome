import React, {memo, useMemo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './WithdrawBtnStyle';

/**
 * bonus Question:
 * tapping one of the buttons in rapid succession. what happens?
 * a. does the app stay responsive?
 * Answer: the app re-render slowly because per api call is taking time.
 * How to solve this problem:
 * 1. disable the button after user clicked one of the button
 * 2. add a debounce HOC function to prevent several api calls at a time. (this is a best solution, because on Android, this solution is better);
 * b. can the balance go negative?
 * Answer: Yes but we can prevent this by handle it at BE and FE:
 * 1. handle it by FE: when currentBalance is less than the button's withdraw amount, the button option should be disabled
 * 2. handle it by BE: when the withdraw amount sent to backend is higher than the amount of the user's balance, it should return error message of 'Error: money not enough'
 * I currently used the BE handles this problem, becuase we want to show the error message.
 */

const WithDrawScreen = ({withdrawAmt, disabled, onPress}) => {
  const memoizedButtonStyle = useMemo(() => {
    const buttonContainerStyle = [
      styles.buttonStyle,
      disabled && styles.buttonLoadingStyle,
    ];
    return buttonContainerStyle;
  }, [disabled]);

  const memoizedButtonTextStyle = useMemo(() => {
    const buttonTextStyle = [
      styles.buttonTextStyle,
      disabled && styles.buttonLoadingTextStyle,
    ];
    return buttonTextStyle;
  }, [disabled]);

  return (
    <TouchableOpacity
      style={memoizedButtonStyle}
      onPress={() => onPress(withdrawAmt)}
      disabled={disabled}>
      <Text style={memoizedButtonTextStyle}>Withdraw ${withdrawAmt}</Text>
    </TouchableOpacity>
  );
};

export default memo(WithDrawScreen);
