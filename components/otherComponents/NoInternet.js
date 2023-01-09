import React from 'react';
import Lottie from 'lottie-react-native';

export default function NoInternet() {
    return (
        <Lottie source={require('../../assets/No Internet.json')} autoPlay loop />
    );
}