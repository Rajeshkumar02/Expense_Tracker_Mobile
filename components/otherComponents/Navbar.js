import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//screen
import Income from '../screens/Income/Income'
import Expense from '../screens/Expense/Expense';
import Profile from '../screens/Profile/Profile'

const IncomeRoute = () => <Income/>;

const ExpenseRoute = () => <Expense/>;

const ProfileRoute = () => <Profile/>;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Expense', title: <Text style={{color:"white"}}>Expense</Text>, focusedIcon: 'hand-extended-outline'},
    { key: 'Income', title: <Text style={{color:"white"}}>Income</Text>, focusedIcon: 'hand-coin-outline' },
    { key: 'Profile', title: <Text style={{color:"white"}}>Profile</Text>, focusedIcon: 'face-man-profile'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Expense: ExpenseRoute,
    Income: IncomeRoute,
    Profile: ProfileRoute,
  });

  return (
     <SafeAreaProvider>
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{backgroundColor:'#2b2b2b'}}
      activeColor="black"
      inactiveColor='white'
      theme={{colors: {secondaryContainer: 'white'}}}
    />
     </SafeAreaProvider>
  );
};

export default MyComponent;