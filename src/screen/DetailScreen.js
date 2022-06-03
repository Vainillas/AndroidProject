import {SafeAreaView} from 'react-native';
import React from 'react';
import Detail from '../components/Detail';

const DetailScreen = ({route}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Detail id={route.params.id}></Detail>
        </SafeAreaView>);
};
export default DetailScreen;