import axios from 'axios';
import { firestore } from '../firebase';

export const firebase_login = () => { 
    return () => { 
        return firestore.collection('boards').doc().delete()
        .then(() => { 
            console.log()
        }) 
    } 
};
