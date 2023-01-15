import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { FAB, Avatar } from 'react-native-paper';
import { TextInput, StyleSheet, Button, ScrollView, SafeAreaView, Image, FlatList, TouchableWithoutFeedback, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import IdientifyIcon from '../../otherComponents/Icon';
import Animation from "../../otherComponents/LoadingScreen";


//Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useFocusEffect } from '@react-navigation/native';

function Expense() {
    const navigation = useNavigation();

    const [User, setUser] = useState("");
    const [ExpenseData, setExpenseData] = useState([]);
    const [Infotag, setInfotag] = useState();

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    const [loading, setloading] = useState(false);

    function formatDate(obj) {
        return Object.keys(obj).sort((a, b) => new Date(obj[b].Date + " " + obj[b].Time) - new Date(obj[a].Date + " " + obj[a].Time));
    }

    const getDoc = async () => {
        try {
            await firestore()
                .collection((auth()._user.email.split("@")[0] + "-Expense").toString())
                .get()
                .then(querySnapshot => {
                    const res = [];
                    let homeval = [];
                    querySnapshot.forEach(documentSnapshot => {
                        let val = documentSnapshot.data();
                        res.push(val.Info);
                        delete val["Info"];
                        homeval[documentSnapshot.id] = val[formatDate(val)[0]];
                    });
                    setInfotag(homeval);
                    temp = formatDate(res);
                    let data = [];
                    temp.map((key) => {
                        data.push(res[key]);
                    })
                    setExpenseData(data);
                    setFilteredDataSource(data);
                });
            setloading(false);
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        setloading(true);
        setUser((auth()._user.email.split("@")[0] + "-Expense").toString());
        getDoc();
    }, [navigation])

    useFocusEffect(
        React.useCallback(() => {
            getDoc();
        }, [navigation])
    );

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = ExpenseData.filter(function (item) {
                const itemData = item.Id
                    ? item.Id.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(ExpenseData);
            setSearch(text);
        }
    };

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
            <TouchableWithoutFeedback onPress={() => getItem(item)}>
                <View key={item.Id}>
                    <View style={styles.summary}>
                        <IdientifyIcon family={item.IconFamily} icon={item.Icon} size="24" color="white" />
                        <View>
                            <Text style={styles.summaryText}>
                                {item.Id}
                            </Text>
                            <Text style={styles.summarysecondaryText}>Rs. {Infotag[item.Id] ? Infotag[item.Id].Amount : "----"}</Text>
                        </View>
                        <Text style={{ fontSize: 12, right: 10, position: "absolute", color: "#BBBBBB" }}>{Infotag[item.Id] ? DateFinder(Infotag[item.Id].Date) : "----"}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    const ItemSeparatorView = () => {
        return (
            <View />
        );
    };

    const getItem = (item) => {
        navigation.navigate('ExpenseList', { Id: item.Id, UserId: (auth()._user.email.split("@")[0] + "-Expense").toString(), Icon: item.Icon, Iconfamily: item.IconFamily });
    };

    return (
        <SafeAreaView style={{ backgroundColor: "#1C1C1C" }} width="100%" height="100%">
            <View style={{ width: "90%", paddingTop: "10%", paddingBottom: "8%" }}>
                <Text style={{ fontSize: 30, fontWeight: "bold", color: "white", paddingLeft: 15 }}>Expense</Text>
            </View>
            <View style={styles.inputContainer}>
                <Icon style={styles.icon} name="ios-search" size={20} color="#34b27b" />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor="white"
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                />
            </View>
            {
                loading ?
                    <Animation />
                    :
                    ExpenseData.length === 0
                        ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.noExpense, { color: "#34b27b" }]}>Click + to add New Category</Text>
                        </View>
                        :
                        <View style={styles.screen}>
                            <FlatList
                                data={filteredDataSource}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={ItemSeparatorView}
                                renderItem={ItemView}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                overScrollMode={"never"}
                            />

                        </View>
            }
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => { navigation.navigate("AddExpense") }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: 320,
        height: 40,
        justifyContent: 'center',
    },
    input: {
        backgroundColor: "#FFFFFF07",
        borderColor: "white",
        color: "#EDEDED",
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 13,
        width: 100 + "%",
        height: 100 + "%",
        left: 5 + "%",
        paddingLeft: 40,
        paddingVertical: 0,
    },
    icon: {
        position: 'absolute',
        left: 25,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    screen: {
        margin: 20,
        paddingBottom: 110
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        padding: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 10,
        backgroundColor: "#1C1C1C",
    },
    summaryText: {
        fontFamily: "openSansBold",
        fontSize: 15,
        paddingLeft: 10,
        color: "white"
    },
    summarysecondaryText: {
        fontFamily: "openSansBold",
        fontSize: 15,
        paddingLeft: 12,
        color: "#BBBBBB"
    },
});


export default Expense;