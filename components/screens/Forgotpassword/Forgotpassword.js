import { TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

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
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <Toast />
                <View style={styles.container}>
                    <Text style={styles.headingtext}>Reset Your Password</Text>
                    <Text style={styles.subtext}>Type in your email and we'll send you a link to reset your password</Text>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => { Forgotpasswordfun(values) }}
                        validationSchema={yup.object().shape({
                            email: yup
                                .string()
                                .email()
                                .required('Email id is required'),
                        })}
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                            <View>
                                <View>
                                    <Text style={styles.labletext}>Email</Text>
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
                                </View>
                                {error ? <Text style={{ fontSize: 15, color: '#FF0D10', textAlign: "center", top: 10 }}>{error}</Text> : ""}
                                <View style={{ paddingTop: 30 }}>
                                    <TouchableOpacity style={styles.button} onPress={handleSubmit}
                                        disabled={!isValid}>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>Send Reset Email</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: 25 }}>
                                    <Text style={{ color: "#7E7E7E" }}>
                                        Already have an account ?{" "}
                                    </Text>
                                    <Text style={{ color: "#EDEDED", textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Login')}>
                                        Log in
                                    </Text>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </View>
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
        borderRadius: 10,
        width: 300,
        height: 40,
        backgroundColor: "#34B27B",
        alignItems: "center",
        justifyContent: "center"
    },
    headingtext: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    subtext: {
        color: "#BBBBBB",
        fontSize: 15,
        paddingTop: 3,
        width: "85%"
    },
    labletext: {
        color: "#BBBBBB",
        fontSize: 15,
        paddingTop: 25,
        paddingBottom: 5
    },
    container: {
        paddingLeft: "12%",
        top: "25%"
    }
});

export default Forgotpassword;