import { NativeBaseProvider, View, Text } from "native-base";
import React from "react";

function List() {

    return (
        <NativeBaseProvider>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>List Page</Text>
            </View>
        </NativeBaseProvider>
    );
}

export default List;