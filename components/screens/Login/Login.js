import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import { TextInput, View, StyleSheet, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

//Firebase
import auth from '@react-native-firebase/auth';

//Validation
import { Formik } from "formik";
import * as yup from "yup";

function Login({ navigation }) {

    const [hidePass, setHidePass] = useState([true, false]);
    const [fonticon, setfonticon] = useState(["eye", "eye-slash"]);
    const [passcount, setpasscount] = useState(0);
    const [error, seterror] = useState("");

    const Loginfun = (val) => {
        auth()
            .signInWithEmailAndPassword(val.email, val.password)
            .then(() => {
                console.log('signed in Successfull!');
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    console.log('Email id or Password is incorrect!');
                    seterror("Email id or Password is incorrect!");
                } else if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    seterror("Email address is invalid!");
                } else {
                    seterror("Error has occured!")
                }

                console.error(error);
            });
    }

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <NativeBaseProvider>
                <Center>
                    <Center w="100%" height="100%">
                        <Box safeArea p="2" py="8" w="90%" maxW="290">
                            <Heading size="xl" fontWeight="800" color="#EDEDED">
                                Welcome back
                            </Heading>
                            <Heading mt="1" color="#BBBBBB" fontWeight="medium" size="xs">
                                Sign in to your account
                            </Heading>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                onSubmit={(values) => { Loginfun(values) }}
                                validationSchema={yup.object().shape({
                                    email: yup
                                        .string()
                                        .email()
                                        .required('Email id is required'),
                                    password: yup
                                        .string()
                                        .required('Password is required'),
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
                                        <FormControl>
                                            <FormControl.Label><Text style={{ color: "#BBBBBB" }}>Password</Text></FormControl.Label>
                                            <View>
                                                <TextInput
                                                    onChangeText={handleChange('password')}
                                                    onBlur={() => setFieldTouched('password')}
                                                    value={values.password}
                                                    placeholderTextColor="#707070"
                                                    style={styles.input}
                                                    placeholder="••••••••"
                                                    secureTextEntry={hidePass[passcount % 2]} />
                                                <Text style={{ position: 'absolute', right: 20, top: 9 }} onPress={(e) => { setpasscount(passcount + 1) }}><Icon name={fonticon[passcount % 2]} size={20} color="#34b27b" /></Text>
                                            </View>
                                            {touched.password && errors.password &&
                                                <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                                            }
                                            <Link _text={{
                                                fontSize: "xs",
                                                fontWeight: "500",
                                                color: "#3fcf8e"
                                            }} alignSelf="flex-end" mt="1">
                                                <Text style={{ color: "#BBBBBB" }} onPress={() => navigation.navigate('Forgotpassword')}>Forgot Password ?</Text>
                                            </Link>
                                        </FormControl>
                                        {error ? <Text style={{ fontSize: 15, color: '#FF0D10', textAlign: "center" }}>{error}</Text> : ""}
                                        <Button
                                            style={styles.button}
                                            mt="2"
                                            onPress={handleSubmit}
                                            disabled={!isValid}>
                                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>Login</Text>
                                        </Button>
                                        <HStack mt="6" justifyContent="center">
                                            <Text fontSize="sm" color="#7E7E7E">
                                                Don't have an account ?{" "}
                                            </Text>
                                            <Text style={{ color: "#EDEDED", textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Signup')}>Sign Up Now</Text>
                                        </HStack>
                                    </VStack>
                                )}
                            </Formik>
                        </Box>
                    </Center>
                </Center>
            </NativeBaseProvider>
        </ScrollView>
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

export default Login;