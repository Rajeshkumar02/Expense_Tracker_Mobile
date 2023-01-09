import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

//Validation
import { Formik } from "formik";
import * as yup from "yup";

//Firebase
import auth from '@react-native-firebase/auth';

//toast
import Toast from 'react-native-toast-message'

function Forgotpassword({ navigation }) {

    const [error, seterror] = useState("");

    const Forgotpasswordfun = (val) => {
        auth().sendPasswordResetEmail(val.email)
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
                    console.log(error,"Error has occured");
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
            <Center>
                <Center w="100%" height="100%">
                    <Toast />
                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                        <Heading size="xl" fontWeight="800" color="#EDEDED">
                            Reset Your Password
                        </Heading>
                        <Heading mt="1" color="#BBBBBB" fontWeight="medium" size="xs">
                            Type in your email and we'll send you a link to reset your password
                        </Heading>
                        <Formik
                            initialValues={{ email: '' }}
                            onSubmit={(values) => { Forgotpasswordfun(values) }}
                            validationSchema={yup.object().shape({
                                email: yup
                                    .string()
                                    .email()
                                    .required('Email id is required')
                            })}
                        >
                            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                                <VStack space={3} mt="5">
                                    <FormControl>
                                        <FormControl.Label><Text style={{ color: "#BBBBBB" }}>Email</Text></FormControl.Label>
                                        <TextInput
                                            onChangeText={handleChange('email')}
                                            onBlur={() => setFieldTouched('email')}
                                            value={values.email}
                                            style={styles.input}
                                            placeholder="you@example.com"
                                            placeholderTextColor="#707070" />
                                        {touched.email && errors.email &&
                                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
                                        }
                                    </FormControl>
                                    {error ? <Text style={{ fontSize: 15, color: '#FF0D10', textAlign: "center" }}>{error}</Text> : ""}
                                    <Button
                                        style={styles.button}
                                        mt="2"
                                        onPress={handleSubmit}>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Send Reset Email</Text>
                                    </Button>
                                    <HStack mt="6" justifyContent="center">
                                        <Text fontSize="sm" color="#7E7E7E">
                                            Already have an account ? {" "}
                                        </Text>
                                        <Text style={{ color: "#EDEDED", textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Login')}>Log in</Text>
                                    </HStack>
                                </VStack>
                            )}
                        </Formik>
                    </Box>
                </Center>
            </Center>
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

export default Forgotpassword;