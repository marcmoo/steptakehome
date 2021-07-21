import React, {useState, useEffect, memo} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import ServiceAPI from '../../../backend/ServiceAPI';
import WithdrawBtn from './WithdrawBtn';
import CodeAndAmt from './CodeAndAmt';
import styles from './WithdrawStyle';
import useInterval from '../../hooks/useInterval';
// improvement: import Proptypes and add defaultProps.
// improvement: add jsdoc

const serviceApiInstance = new ServiceAPI();

const WithDrawScreen = () => {
  const [count, setCount] = useState(0);
  const [showThrottleText, setThrottleTextShow] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(null);
  const [currentWithdrawAmt, setCurrentWithdrawAmt] = useState(null);
  const [errorMessage, setError] = useState(null);
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);

  useInterval(() => {
    if (count !== 0) {
      setCount(count - 1);
    }
  }, 1000);

  useEffect(() => {
    if (count === 0) {
      setThrottleTextShow(false);
    }
  }, [count]);

  const updateBalance = async (withdrawAmt = 10) => {
    if (count === 0) {
      try {
        setError(null);
        setLoading(true);
        const response = await serviceApiInstance.getCode(withdrawAmt);
        setCurrentWithdrawAmt(withdrawAmt);
        setCurrentBalance(response.balance);
        setCode(response.code);
        setLoading(false);
        setCount(10);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    } else {
      setThrottleTextShow(true);
    }
  };

  const disabled = loading || currentBalance === 0;

  // Bonus Task add 10 second timer to minimize frequent api calls.
  const renderThrottoTimer = () => {
    return (
      showThrottleText && (
        <Text>Next Withdraw Available in {count} Seconds</Text>
      )
    );
  };

  const renderSpinner = () => {
    if (loading) {
      // improvement: separate this and set it as a pure component, wrap it with React.memo HOC to prevent unnecessary re-renders
      return <ActivityIndicator size="large" />; // as it is not a list, re-renders may not be really heavy in this case.
    }
    return null;
  };

  // improvement: create a button ArrayList, [{ withdrawAmt: Int }], and render buttons by Array.prototype.map or use FlatList to iterate and show buttons as a list.
  const renderButtons = () => {
    return (
      <View>
        <WithdrawBtn
          disabled={disabled}
          withdrawAmt={10}
          onPress={amt => updateBalance(amt)}
        />
        <WithdrawBtn
          disabled={disabled}
          withdrawAmt={100}
          onPress={amt => updateBalance(amt)}
        />
      </View>
    );
  };

  return (
    <View style={styles.containerStyle}>
      <CodeAndAmt
        currentBalance={currentBalance}
        code={code}
        currentWithdrawAmt={currentWithdrawAmt}
      />
      {renderButtons()}
      <View>
        <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
        {renderSpinner()}
        {renderThrottoTimer()}
      </View>
    </View>
  );
};

export default memo(WithDrawScreen);
