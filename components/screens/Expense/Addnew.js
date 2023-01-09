import { NativeBaseProvider, Box, Divider, Heading, FormControl, Center, } from "native-base";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView } from "react-native";
import IconPicker from "react-native-icon-picker";
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import FW from 'react-native-vector-icons/FontAwesome';
import AD from 'react-native-vector-icons/AntDesign';
import EN from 'react-native-vector-icons/Entypo';
import FW5 from 'react-native-vector-icons/FontAwesome5';
import FO from 'react-native-vector-icons/Fontisto';
import IC from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';

//toast
import Toast from 'react-native-toast-message'

//Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


function AddExpense() {

    const navigation = useNavigation();

    const [showIconPicker, setShowIconPicker] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState("");
    const [Category, setCategory] = useState("");
    const [cate, setcate] = useState("");
    const [Error, setError] = useState("");
    const [User, setUser] = useState("");
    const [Amount, setAmount] = useState("");
    const [Note, setNote] = useState("");

    const getDoc = async () => {
        firestore()
            .collection((auth()._user.email.split("@")[0] + "-Expense").toString())
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    setCategory(prevArray => [...prevArray, documentSnapshot.id])
                });
            });
        // console.log(User)
    }

    useEffect(() => {
        setUser((auth()._user.email.split("@")[0] + "-Expense").toString());
        // console.log((auth()._user.email.split("@")[0] + "-Expense").toString());
        getDoc();
    }, [])

    const SetValCat = (val) => {
        let categ = [];
        if (Category !== "") {
            categ = Category.map(el => el.trim());
        }
        setError(categ.includes(val.trim()));
        setcate(val);
    }

    const IdientifyIcon = () => {
        val = selectedIcon;
        siz = 35;
        colo = "white";
        if (val.family === "FontAwesome") {
            return (
                <FW name={val.icon} size={siz} color={colo} />
            );
        } else if (val.family === "AntDesign") {
            return (
                <AD name={val.icon} size={siz} color={colo} />
            );
        } else if (val.family === "Entypo") {
            return (
                <EN name={val.icon} size={siz} color={colo} />
            );
        } else if (val.family === "FontAwesome5") {
            return (
                <FW5 name={val.icon} size={siz} color={colo} />
            );
        } else if (val.family === "Fontisto") {
            return (
                <FO name={val.icon} size={siz} color={colo} />
            );
        } else if (val.family === "Ionicons") {
            return (
                <IC name={val.icon} size={siz} color={colo} />
            );
        } else if (val.family === "MaterialCommunityIcons") {
            return (
                <MCI name={val.icon} size={siz} color={colo} />
            );
        } else if (val.family === "MaterialIcons") {
            return (
                <MI name={val.icon} size={siz} color={colo} />
            );
        }
        return (
            <Text>Hello</Text>
        );
    }

    const checkAll = () => {
        if (selectedIcon !== "") {
            if (!Error && cate !== "") {
                if (Amount !== "") {
                    if (Note !== "") {
                        var date = new Date().getDate();
                        var month = new Date().getMonth() + 1;
                        var year = new Date().getFullYear();
                        let res = year + '-' + month + '-' + date;

                        var hours = new Date().getHours();
                        var min = new Date().getMinutes();
                        var sec = new Date().getSeconds();
                        let time = hours + ":" + min + ":" + sec;
                        let resvalues = { "Note": Note, "Date": res, "Amount": Amount, "Time": time }
                        let dictkey = date + '-' + month + '-' + year + "-" + hours + "-" + min + "-" + sec;

                        let info = { "Icon": selectedIcon.icon, "Date": res, "Amount": Amount, "IconFamily": selectedIcon.family, "Id": cate, "Time": time }
                        firestore()
                            .collection((auth()._user.email.split("@")[0] + "-Expense").toString())
                            .doc(cate)
                            .set({
                                "Info": info
                            })
                            .then(() => {
                                firestore()
                                    .collection((auth()._user.email.split("@")[0] + "-Expense").toString())
                                    .doc(cate)
                                    .update({
                                        [dictkey]: resvalues
                                    })
                                    .then(() => {
                                        Toast.show({
                                            type: 'success',
                                            text1: 'Success',
                                            text2: 'Category Added Successfully'
                                        });
                                        setAmount("");
                                        setNote("");
                                    });
                            });
                    } else {
                        console.log("Enter Note");
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: 'Please Enter the Note'
                        });
                    }
                } else {
                    console.log("Enter Amount");
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Please Enter the  Amount'
                    });
                }
            } else {
                console.log("Enter Name");
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Please Enter the Category Name'
                });
            }
        } else {
            console.log("Enter Icon");
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please Select the Icon'
            });
        }
    }

    return (
        <NativeBaseProvider>
            <SafeAreaView style={{ backgroundColor: "#1C1C1C" }} width="100%" height="100%">
                <Toast />
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <Box safeArea p="4" py="8" w="100%" maxW="290">
                        <Heading size="md" fontWeight="800" color="#EDEDED">
                            Add Expences Category
                        </Heading>
                    </Box>
                    <View style={{ paddingTop: 100 }}>
                        <View style={{ alignItems: "center", paddingBottom: 40 }}>
                            {
                                selectedIcon ? <IdientifyIcon /> : ""
                            }
                        </View>
                        <IconPicker
                            headerTitle={"Select Your Icon"}
                            showIconPicker={showIconPicker}
                            toggleIconPicker={() => setShowIconPicker(!showIconPicker)}
                            iconDetails={[
                                {
                                    family: "AntDesign",
                                    color: "blue",
                                    icons: [
                                        "wallet",
                                        "user",
                                    ],
                                },
                                { family: "Entypo", icons: ["wallet"] },
                                { family: "FontAwesome", icons: ["google-wallet"] },
                                {
                                    family: "FontAwesome5",
                                    icons: [
                                        "wallet",
                                        "hospital-user",
                                        "user-md",
                                        "user-tag",
                                        "user-slash",
                                    ],
                                },
                                { family: "Fontisto", icons: ["wallet"] },
                                {
                                    family: "MaterialCommunityIcons",
                                    icons: ["wallet-membership"],
                                },
                                {
                                    family: "MaterialIcons",
                                    icons: ["wallet-travel", "supervised-user-circle", "verified-user"],
                                },
                            ]}
                            content={
                                <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                                    <AD name="select1" size={20} color="white" />
                                    <Text style={{ color: "white", fontSize: 15, paddingHorizontal: 6 }}>Select Your Icon</Text>
                                </View>
                            }
                            onSelect={(e) => {
                                setSelectedIcon(e);
                                setShowIconPicker(false);
                            }}
                        />
                        <FormControl style={{ alignItems: "center", paddingTop: 30 }}>
                            <TextInput
                                onChangeText={(e) => { SetValCat(e) }}
                                style={styles.input}
                                placeholder="Enter your Category Name"
                                placeholderTextColor="#707070" />
                        </FormControl>
                        {
                            Error ?
                                <Text style={{ fontSize: 15, color: "red", textAlign: "center", paddingTop: 10 }}>Category name is already Present</Text>
                                :
                                ""
                        }
                        <FormControl style={{ alignItems: "center", paddingTop: 20 }}>
                            <TextInput
                                onChangeText={setAmount}
                                style={styles.input}
                                value={Amount}
                                keyboardType="numeric"
                                placeholder="Enter Amount"
                                placeholderTextColor="#707070" />
                        </FormControl>
                        <FormControl style={{ alignItems: "center", paddingTop: 20 }}>
                            <TextInput
                                onChangeText={setNote}
                                value={Note}
                                maxLength={11}
                                style={styles.input}
                                placeholder="Enter Short Note"
                                placeholderTextColor="#707070" />
                        </FormControl>
                    </View>
                    <View style={styles.Finalbtn}>
                        <View style={{ paddingRight: 60 }}>
                            <Button textColor="white" borderColor="white" mode="outlined" onPress={() => navigation.goBack(null)}>
                                Back
                            </Button>
                        </View>
                        <Button buttonColor="#34B27B" mode="contained" onPress={checkAll}>
                            Add Category
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    textBox: {
        fontSize: 18,
    },
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
    Finalbtn: {
        flexDirection: "row",
        justifyContent: "space-around",
        top: 20 + "%",
    }
})

export default AddExpense;
