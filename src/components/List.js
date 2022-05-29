import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native';
import ItemSeparator from './ItemSeparator';
import Location from '../models/location';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {enviroment} from '../enviroments/enviroment';
import autorization from '../util/Autorization';
import Loading from './Loading';
import {Error} from './Error';

const List = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const textStyle = {
        color: isDarkMode ? Colors.lighter : Colors.darker,
    };

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const handleRefresh = () => {
        loadData();
    };

    const loadData = () => {
        setLoading(true);
        setError(null)
        fetch(enviroment.baseURL + 'api/locations', autorization)
            .then(res => res.json())
            .then(data =>{
                let locations = data?.map(l => new Location(l));
                setLocations(locations);
                setLoading(false)
            })
            .catch(e =>{
                setError(e);
                setLoading(false)
            })
    };

    const renderItemComponent = (location) =>
        <TouchableOpacity style={styles.container}>
            <Text style={[textStyle, styles.textTitle]}>{location.name}</Text>
            <Text style={[textStyle, styles.textTitle]}>{location.contact}</Text>
            <Text style={[textStyle, styles.text]}>{location.latitude} </Text>
            <Text style={[textStyle, styles.text]}>{location.longitude} </Text>
        </TouchableOpacity>;


    if(error != null){
        return <Error onRefresh={handleRefresh}></Error>
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={locations}
                      renderItem={info => renderItemComponent(info.item)}
                      keyExtractor={location => location.id}
                      ItemSeparatorComponent={() => <ItemSeparator/>}
                      refreshing={loading}
                      onRefresh={handleRefresh}
            ></FlatList>

        </SafeAreaView>
    );
};

export default List;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 8,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
    },
    text: {
        flex: 1,
        textAlign: 'justify',
    },
});
