import React, {useEffect, useState} from 'react';
import {enviroment} from '../enviroments/enviroment';
import autorization from '../util/Autorization';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Error} from './Error';
import Loading from './Loading';
import Location from '../models/location';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Detail = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const textStyle = {
        color: isDarkMode ? Colors.lighter : Colors.darker,
    };
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const handleRefresh = () => {
        loadData();
    };
    const loadData = () => {
        setLoading(true);
        setError(null);
        fetch(enviroment.baseURL + 'api/locations/' + 24, autorization)
            .then(res => res.json())
            .then(data => {
                let location = new Location(data);
                setLocation(location);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                setError(e);
            });
    };

    if (error != null) {
        return <Error onRefresh={handleRefresh}></Error>;
    }
    if (loading || location == null) {
        return <Loading></Loading>;
    }
    return <View style={styles.container}>
        <Text style={[textStyle, styles.textTitle]}>{location.name}</Text>
        <Text style={[textStyle, styles.text]}>{location.contact}</Text>
        <Text style={[textStyle, styles.text]}>{location.latitude} </Text>
        <Text style={[textStyle, styles.text]}>{location.longitude} </Text>
    </View>;
};
export default Detail;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 8,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    text: {
        textAlign: 'justify',
    },
});
