import React, { useState } from "react";
import { TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
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
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.headingtext}>Welcome back</Text>
                    <Text style={styles.subtext}>Sign in to your account</Text>
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
                                <View>
                                    <Text style={styles.labletext}>Password</Text>
                                    <View>
                                        <TextInput
                                            onChangeText={handleChange('password')}
                                            onBlur={() => setFieldTouched('password')}
                                            value={values.password}
                                            placeholderTextColor="#707070"
                                            style={styles.input}
                                            placeholder="••••••••"
                                            secureTextEntry={hidePass[passcount % 2]} />
                                        <Text style={{ position: 'absolute', left: 260, top: 9 }} onPress={(e) => { setpasscount(passcount + 1) }}><Icon name={fonticon[passcount % 2]} size={20} color="#34b27b" /></Text>
                                        {touched.password && errors.password &&
                                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                                        }
                                    </View>
                                    <Text style={{ color: "#BBBBBB", textAlign: "right", paddingRight: "7%", paddingTop: 5 }} onPress={() => navigation.navigate('Forgotpassword')}>Forgot Password ?</Text>
                                </View>
                                {error ? <Text style={{ fontSize: 15, color: '#FF0D10', textAlign: "center", top: 10 }}>{error}</Text> : ""}
                                <View style={{ paddingTop: 30 }}>
                                    <TouchableOpacity style={styles.button} onPress={handleSubmit}
                                        disabled={!isValid}>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: 25 }}>
                                    <Text style={{ color: "#7E7E7E" }}>
                                        Don't have an account ?{" "}
                                    </Text>
                                    <Text style={{ color: "#EDEDED", textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Signup')}>
                                        Sign Up Now
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
        paddingTop: 3
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

export default Login;