import React, {useEffect, useState} from 'react';
import {Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native';
import ItemSeparator from './ItemSeparator';
import {enviroment} from '../enviroment';
import Location from '../models/location';
import {Error} from './Error';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Authorization from '../utils/Authorization';

const List = ({navigation}) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isDarkMode = useColorScheme() === 'dark';
    const textStyle = {
        color: isDarkMode ? Colors.lighter : Colors.darker,
    };
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setError(null);
        setLoading(true);
        fetch(enviroment.baseURL + 'api/locations', Authorization)
            .then(res => res.json())
            .then(data => {
                let locations = data?.map(l => new Location(l));
                setLocations(locations);
                setLoading(false);
            }).catch(e => setError(e));
    };

    const handleDetail = (location: Location) => {
        navigation.navigate('Detail', {id: location.id});
    }

    const renderItemComponent = (data) =>
        <TouchableOpacity style={[backgroundStyle,styles.container]} onPress={() => handleDetail(data.item)}>
            <Text style={[textStyle,styles.textTitle]}>{data.item.name}</Text>
            <Text style={[textStyle,styles.text]}>{data.item.contact}</Text>
        </TouchableOpacity>;

    const handleRefresh = () => {
        loadData();
    };

    if (error) {
        return <Error onRefresh={() => loadData()}></Error>;
    }
    return (
        <SafeAreaView style={[backgroundStyle,styles.container]}>
            <FlatList
                data={locations}
                renderItem={location => renderItemComponent(location)}
                keyExtractor={location => location.id.toString()}
                ItemSeparatorComponent={() => <ItemSeparator/>}
                refreshing={loading}
                onRefresh={handleRefresh}
            />
        </SafeAreaView>);
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