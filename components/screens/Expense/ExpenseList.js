import React, { useEffect, useState, useRef } from "react";
import { Appbar, Button, Card, Title } from 'react-native-paper';
import { StyleSheet, FlatList, TouchableWithoutFeedback, Alert, View, Text } from "react-native";
import Animation from "../../otherComponents/LoadingScreen";

//Firebase
import firestore from '@react-native-firebase/firestore';

import { useFocusEffect } from '@react-navigation/native';

function ExpenseList({ navigation, route }) {

    const [User, setUser] = useState("");
    const [Data, setData] = useState({});
    const [loading, setloading] = useState(false);
    const [Info, setInfo] = useState();


    function formatDate(obj) {
        return Object.keys(obj).sort((a, b) => new Date(obj[a].Date + " " + obj[a].Time) - new Date(obj[b].Date + " " + obj[b].Time));
    }

    const getDoc = async () => {
        try {
            await firestore()
                .collection(route.params.UserId).doc(route.params.Id)
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        let val = documentSnapshot.data();
                        let del = val["Info"];
                        delete val.Info;
                        setInfo(del);
                        temp = formatDate(val);
                        let res = {};
                        temp.map((key) => {
                            res = { ...res, [key]: val[key] }
                        })
                        setData(res);
                    }
                });
            setloading(false);
        } catch (e) {
            console.log(e)
        }
    }

    const fatlistRef = useRef();

    useEffect(() => {
        setloading(true);
        setUser(route.params.UserId);
        getDoc();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            getDoc();
        }, [navigation])
    );

    const rmData = (id) => {
        delete Data[id];
        let res = {
            "Info": Info,
            ...Data
        }
        firestore()
            .collection(route.params.UserId)
            .doc(route.params.Id)
            .set(res)
            .then(() => {
                console.log('Successfull');
                getDoc();
            });
        console.log(res);
    }

    const DateFinder = (date) => {
        currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        givenDate = new Date(date);
        currentDate = new Date(year + "-" + month + "-" + day);
        var YesterDay = new Date();
        YesterDay.setDate(YesterDay.getDate() - 1);
        let Yday = currentDate.getDate();
        let Ymonth = currentDate.getMonth() + 1;
        let Yyear = currentDate.getFullYear();
        YesterDay = new Date(Yyear + "-" + Ymonth + "-" + Yday);
        console.log("YesterDay", YesterDay);

        if (currentDate.getDate() === givenDate.getDate()) {
            return "Today";
        } else if (YesterDay.getDate() === givenDate.getDate()) {
            return "Yesterday"
        }
        return date;
    }

    const ItemView = ({ item }) => {
        return (
            <View>
                <View style={{ paddingBottom: 25 }}>
                    <TouchableWithoutFeedback onLongPress={() => { createTwoButtonAlert(item) }}>
                        <Card style={{ width: 180, alignSelf: "flex-start", left: 10 }}>
                            <Card.Content >
                                <Title style={styles.title}>₹ {Data[item].Amount}</Title>
                                <View style={styles.content}>
                                    <Text style={{ color: "#707070", flexWrap: 'wrap', flexShrink: 1 }}>{Data[item].Note}</Text>
                                    <Text>{" "}</Text>
                                    <Text style={{ color: "#707070" }}>{DateFinder(Data[item].Date)}</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    };

    const ItemSeparatorView = () => {
        return (
            <View>
            </View>
        );
    };

    const createTwoButtonAlert = (val) =>
        Alert.alert(
            "Are you sure?",
            "You will not be able to recover this Data! ",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => { rmData(val) } }
            ]
        );

    const rmExpense = (exp, user) => {
        Alert.alert(
            "Are you sure?",
            "You will not be able to recover this Data! ",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        firestore()
                            .collection(user)
                            .doc(exp)
                            .delete()
                            .then(() => {
                                console.log('Expense Category Deleted Successfuly !');
                                navigation.navigate("Navbar")
                            });
                    }
                }
            ]
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header mode="small" elevated="false" style={[
                {
                    backgroundColor: "#1C1C1C"
                },
            ]}>
                <Appbar.BackAction color="white" onPress={() => { navigation.navigate("Navbar") }} />
                <Appbar.Content color="white" title={route.params.Id} />
                <Appbar.Action color="white" icon="delete-outline" onPress={() => { rmExpense(route.params.Id, route.params.UserId) }} />
            </Appbar.Header>
            {
                loading
                    ?
                    <Animation />
                    :
                    <FlatList
                        data={Object.keys(Data).reverse()}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={({ item }) => ItemSeparatorView(item)}
                        renderItem={ItemView}
                        ref={fatlistRef}
                    />
            }
            <Button style={styles.addbutton}
                onPress={() => {
                    navigation.navigate("AddNewExpense", { Icon: route.params.Icon, Iconfamily: route.params.Iconfamily, Id: route.params.Id, UserId: route.params.UserId })
                }
                }>
                <Text style={{ color: "white" }}>
                    Add
                </Text>
            </Button>

        </View>
    );
}

const styles = StyleSheet.create({

    title: {
        justifyContent: "flex-start",
        fontSize: 30,
        fontWeight: "bold"
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 15,
    },
    addbutton: {
        backgroundColor: "#34B27B",
        width: 80,
        alignSelf: "flex-end",
        position: 'absolute',
        bottom: 30,
        right: 20
    }
});

export default ExpenseList;
