import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider, ScrollView } from "native-base";
import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Appbar } from 'react-native-paper';

//Validation
import { Formik } from "formik";
import * as yup from "yup";

//Firebase
import auth from '@react-native-firebase/auth';

//toast
import Toast from 'react-native-toast-message'

function Changepassword({ navigation }) {

    const [email, setEmail] = useState(auth()._user.email);

    const Changepasswordfun = (val) => {
        auth().sendPasswordResetEmail(val)
            .then((user) => {
                console.log("success");
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Please check your email '
                });
            }).catch(error => {
                if (error.code === 'auth/user-not-found') {
                    console.log('No user Found');
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'No user Found'
                    });
                } else {
                    console.log(error, "Error has occured");
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Error has occured'
                    });
                }
                console.error(error);
            })
    }

    return (
        <NativeBaseProvider>
            <Appbar.Header mode="small" elevated="false" style={[
                {
                    backgroundColor: "#1C1C1C"
                },
            ]}>
                <Appbar.BackAction color="white" onPress={() => { navigation.goBack() }} />
            </Appbar.Header>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <Center w="100%" height="100%">
                    <Toast />
                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                        <Heading size="xl" fontWeight="800" color="#EDEDED">
                            Change Your Password
                        </Heading>
                        <Heading mt="1" color="#BBBBBB" fontWeight="medium" size="xs">
                            We'll send you a link to Change your password to your email id
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label><Text style={{ color: "#BBBBBB" }}>Email</Text></FormControl.Label>
                                <TextInput
                                    defaultValue={email}
                                    style={styles.input}
                                    editable={false}
                                    placeholder="you@example.com"
                                    placeholderTextColor="#707070" />
                            </FormControl>
                            <Button
                                style={styles.button}
                                mt="2"
                                onPress={() => { Changepasswordfun(email) }}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Send Email</Text>
                            </Button>
                        </VStack>
                    </Box>
                </Center>
            </ScrollView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        height: 40,
        backgroundColor: "#FFFFFF07",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: "#707070",
        color: "#EDEDED",
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#34B27B',
        borderRadius: 10,
        width: 300,
        height: 40,
    },
});

export default Changepassword;