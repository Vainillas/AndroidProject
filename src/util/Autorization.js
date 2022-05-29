import {enviroment} from '../enviroments/enviroment';

const Authorization = {
    headers: {
        'Authorization': enviroment.authorization,
    },
};

export default Authorization;
