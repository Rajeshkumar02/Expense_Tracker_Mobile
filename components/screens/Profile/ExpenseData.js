import { NativeBaseProvider, View, Text, ScrollView } from "native-base";
import React, { useEffect, useState, useRef } from "react";
import { Appbar, Button, Card, Title, DataTable } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from "react-native";
import Animation from "../../otherComponents/LoadingScreen";
import {
    LineChart
} from "react-native-chart-kit";
// import DatePicker from 'react-native-date-picker'

//Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import DatePicker from 'react-native-neat-date-picker'


function ExpenseData({ navigation }) {

    const [Data, setData] = useState({});
    const [startDate, setstartDate] = useState("")
    const [endDate, setendDate] = useState("")

    const [chartLable, setChartLable] = useState([]);
    const [chartData, setChartData] = useState([]);


    const GetData = async (userId) => {
        await firestore()
            .collection(userId)
            .get()
            .then(querySnapshot => {
                let temp = {};
                querySnapshot.forEach(documentSnapshot => {
                    delete documentSnapshot.data()["Info"];
                    temp[documentSnapshot.id] = documentSnapshot.data();
                });
                setData(temp);
            });
    }

    useEffect(() => {
        GetData((auth()._user.email.split("@")[0] + "-Expense").toString());
    }, []);

    useEffect(() => {
        if (chartData.length === 0) {
            setinitialData();
        }
    }, [Data]);

    const setinitialData = () => {

        let res = [];
        const temp = {};
        Object.entries(Data).map(([key, value]) => {
            Object.entries(value).map(([inkey, invalue]) => {
                delete invalue["Note"];
                delete invalue["Time"];
                invalue["Id"] = key;
                res.push(invalue);
            });
            temp[key] = 0;
        });

        res.map(item => {
            temp[item.Id] = parseInt(temp[item.Id]) + parseInt(item.Amount);
        })

        let lable = [];
        let dataset = [];

        Object.entries(temp).map(([key, value]) => {
            lable.push(key);
            dataset.push(value);
            console.log(chartData)
        })

        setChartLable(lable);
        setChartData(dataset);
    }

    const FilterDate = () => {
        if (startDate !== "" && endDate !== "") {
            let res = [];
            const temp = {};
            Object.entries(Data).map(([key, value]) => {
                Object.entries(value).map(([inkey, invalue]) => {
                    delete invalue["Note"];
                    delete invalue["Time"];
                    invalue["Id"] = key;
                    res.push(invalue);
                });
                temp[key] = 0;
            });

            const filteredItems = res.filter(item => {
                const itemDate = new Date(item.Date);
                return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
            });

            filteredItems.map(item => {
                temp[item.Id] = parseInt(temp[item.Id]) + parseInt(item.Amount);
            })

            let lable = [];
            let dataset = [];

            Object.entries(temp).map(([key, value]) => {
                lable.push(key);
                dataset.push(value);
            })

            setChartLable(lable);
            setChartData(dataset);
        }
        else {
            console.log("Enter Date");
        }
    }

    const [showDatePickerRange, setShowDatePickerRange] = useState(false);

    const openDatePickerRange = () => setShowDatePickerRange(true)

    const onCancelRange = () => {
        setShowDatePickerRange(false)
    }

    const onConfirmRange = (output) => {
        setShowDatePickerRange(false)
        setstartDate(output.startDateString)
        setendDate(output.endDateString)
    }

    return (
        <NativeBaseProvider>
            <Appbar.Header mode="small" elevated="false" style={[
                {
                    backgroundColor: "#1C1C1C"
                },
            ]}>
                <Appbar.BackAction color="white" onPress={() => { navigation.goBack() }} />
                <Appbar.Content color="white" title={"Expense Data"} />
            </Appbar.Header>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <View style={{ flexDirection: "column" }}>
                        <Button onPress={openDatePickerRange} style={{ backgroundColor: "#34B27B" }}><Text color="white">Select Date</Text></Button>
                        <View style={{ paddingTop: 10 }}><Text style={{ color: "white" }}>Start Date : {startDate ? startDate : "YYYY-MM-DD"}</Text><Text style={{ color: "white" }}>End Date : {endDate ? endDate : "YYYY-MM-DD"}</Text></View>
                    </View>

                    <View style={{ flexDirection: "column" }} >
                        <Button title="Filter" style={{ backgroundColor: "#34B27B", width: 100, stop: 20, height: 40 }} onPress={() => { FilterDate() }}><Text color="white">Filter</Text></Button>
                        <Button title="Filter" style={{ backgroundColor: "#34B27B", width: 100, top: 20, height: 40 }} onPress={() => { setstartDate(""); setendDate(""); setinitialData() }}><Text color="white">Reset</Text></Button>
                    </View>
                </View>
                <DatePicker
                    isVisible={showDatePickerRange}
                    mode={'range'}
                    onCancel={onCancelRange}
                    onConfirm={onConfirmRange}
                    maxDate={new Date()}
                />

                {
                    chartData.length !== 0 ?
                        <View>
                            <ScrollView horizontal={true} style={{ paddingTop: 30, alignSelf: "center" }}>
                                <LineChart
                                    data={{
                                        labels: chartLable,
                                        datasets: [
                                            {
                                                data: chartData
                                            }
                                        ]
                                    }}
                                    width={chartData.length * 100}
                                    height={220}
                                    yAxisLabel="₹"
                                    yAxisInterval={1}
                                    chartConfig={{
                                        backgroundColor: "#34B27B",
                                        backgroundGradientFrom: "#34B27B",
                                        backgroundGradientTo: "#34B27B",
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "4",
                                            strokeWidth: "1",
                                            stroke: "white"
                                        }
                                    }}
                                    bezier
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16
                                    }}
                                />
                            </ScrollView>
                            <Card style={{ width: 85 + "%", alignSelf: "center" }}>
                                <Card.Content>
                                    <Title>Total Spent</Title>
                                    <View>
                                        <DataTable>
                                            <DataTable.Header>
                                                <DataTable.Title>Category</DataTable.Title>
                                                <DataTable.Title numeric>Total Amount</DataTable.Title>
                                            </DataTable.Header>

                                            {
                                                chartData.map((key, value) => (
                                                    <DataTable.Row key={value}>
                                                        <DataTable.Cell>{chartLable[value]}</DataTable.Cell>
                                                        <DataTable.Cell numeric>{key}</DataTable.Cell>
                                                    </DataTable.Row>
                                                ))
                                            }

                                            <DataTable.Row>
                                                <DataTable.Cell><Text style={{ fontWeight: "bold", fontSize: 20 }}>Total</Text></DataTable.Cell>
                                                <DataTable.Cell numeric><Text style={{ fontWeight: "bold" }}>₹ {chartData.reduce(function (x, y) {
                                                    return x + y;
                                                }, 0)}</Text></DataTable.Cell>
                                            </DataTable.Row>

                                        </DataTable>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                        :
                        <Animation />
                }
            </ScrollView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
});

export default ExpenseData;
