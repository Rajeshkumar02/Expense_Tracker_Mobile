import React, { useEffect, useState } from "react";
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//NetInfo
import NetInfo from "@react-native-community/netinfo";

//Nointernet Screen
import NoInternet from "./components/otherComponents/NoInternet";

//Firebase
import auth from '@react-native-firebase/auth';

// Screens
import Login from "./components/screens/Login/Login";
import Signup from "./components/screens/Signup/Signup";
import Navbar from "./components/otherComponents/Navbar";
import Forgotpassword from "./components/screens/Forgotpassword/Forgotpassword";
import Expense from "./components/screens/Expense/Expense";
import AddExpense from "./components/screens/Expense/Addnew";
import ExpenseList from "./components/screens/Expense/ExpenseList";
import AddNewExpense from "./components/screens/Expense/AddNewExpense";
import Income from "./components/screens/Income/Income";
import AddIncome from "./components/screens/Income/Addnew";
import IncomeList from "./components/screens/Income/IncomeList";
import AddNewIncome from "./components/screens/Income/AddNewIncome";
import Profile from "./components/screens/Profile/Profile";
import Changepassword from "./components/screens/Profile/ChangePassword";
import ExpenseData from "./components/screens/Profile/ExpenseData";
import IncomeData from "./components/screens/Profile/IncomeData";

export default function App() {

  const [isOffline, setOfflineStatus] = useState(false);

  const Stack = createNativeStackNavigator();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#1C1C1C',
    },
  };

  const [user, setuser] = useState("");
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setuser(auth().currentUser);
    });
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
  }, [])

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        animated={true}
        backgroundColor="#000000"
      />
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
        <>
          {isOffline
            ?
            (
              <>
                <Stack.Screen name="NoInternet" component={NoInternet} />
              </>
            )
            :
            (
              <>
                {user ? (
                  <>
                    <Stack.Screen name="Navbar" component={Navbar} />
                    <Stack.Screen name="Expense" component={Expense} />
                    <Stack.Screen name="AddExpense" component={AddExpense} />
                    <Stack.Screen name="ExpenseList" component={ExpenseList} />
                    <Stack.Screen name="AddNewExpense" component={AddNewExpense} />
                    <Stack.Screen name="Income" component={Income} />
                    <Stack.Screen name="AddIncome" component={AddIncome} />
                    <Stack.Screen name="IncomeList" component={IncomeList} />
                    <Stack.Screen name="AddNewIncome" component={AddNewIncome} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Changepassword" component={Changepassword} />
                    <Stack.Screen name="ExpenseData" component={ExpenseData} />
                    <Stack.Screen name="IncomeData" component={IncomeData} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
                  </>
                )}
              </>
            )
          }
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}