# steptakehome

## how to run this app:
1. rm -rf node_modules
2. yarn install
3. cd ios
4. rm -rf pods
5. rm podfile.lock
6. pod install
7. cd ..
8. yarn start --reset-cache
9. double click the `steptakehome.xcworkspace` (not the `steptakehome.xcodeproj`)
10. in Xcode, click build and run the app on simulator.

## bonus answers:
> Q1. what happens if the server fails randomly? let's simulate it
 answer: I had simulated it by creating a random number from 0,... to 4, when the random number is 0 (20% possibility), it will return Failed Get Code error. => `backend/utils/getErrorMessage.js`

> Q2. => `/src/components/WithDrawScreen/WithdrawBtn/index.js`
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

> Q3. add Throttle of 10 seconds to minimize the api calls:
I have implemented it in => `src/components/WithDrawScreen/index.js`

should you have any questions and feedbacks, please help to contact me at mmforlingying@gmail.com, thank you.