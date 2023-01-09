import React from "react";

import FW from 'react-native-vector-icons/FontAwesome';
import AD from 'react-native-vector-icons/AntDesign';
import EN from 'react-native-vector-icons/Entypo';
import FW5 from 'react-native-vector-icons/FontAwesome5';
import FO from 'react-native-vector-icons/Fontisto';
import IC from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';

function IdientifyIcon(props) {
    family = props.family;
    icon = props.icon;
    siz = parseInt(props.size);
    colo = props.color;
    if (family === "FontAwesome") {
        return (
            <FW name={icon} size={siz} color={colo} />
        );
    } else if (family === "AntDesign") {
        return (
            <AD name={icon} size={siz} color={colo} />
        );
    } else if (family === "Entypo") {
        return (
            <EN name={icon} size={siz} color={colo} />
        );
    } else if (family === "FontAwesome5") {
        return (
            <FW5 name={icon} size={siz} color={colo} />
        );
    } else if (family === "Fontisto") {
        return (
            <FO name={icon} size={siz} color={colo} />
        );
    } else if (family === "Ionicons") {
        return (
            <IC name={icon} size={siz} color={colo} />
        );
    } else if (family === "MaterialCommunityIcons") {
        return (
            <MCI name={icon} size={siz} color={colo} />
        );
    } else if (family === "MaterialIcons") {
        return (
            <MI name={icon} size={siz} color={colo} />
        );
    }
}

export default IdientifyIcon;