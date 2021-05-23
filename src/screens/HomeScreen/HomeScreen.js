import React, {useEffect, useState} from 'react'
import { Button, Text, View, Image } from 'react-native'
import { firebase } from '../../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import styles from '../LoginScreen/styles';


export default function HomeScreen(props) {

    const [selectedImage, setSelectedImage] = useState(null)


    const pickAnImage = async() => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(permissionResult.granted === false) {
            alert('Permission to access camera roll is required')
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if(pickerResult.cancelled === true) {
            return;
        }
        console.log(pickerResult);
        setSelectedImage(pickerResult);
    }

    const uploadImage = async() => {

        const storageRef = firebase.storage().ref();
        const response = await fetch(selectedImage.uri);
        const blob = await response.blob();

        const metadata ={
            'contentType': "image/jpeg"
        }

        const snapshot = await storageRef.child('images/' + Date.now()).put(blob)

        console.log('Uploaded', snapshot.totalBytes, 'bytes');
            console.log('file metadata:', snapshot.metadata);
            //get download url
            snapshot.ref.getDownloadURL().then(function(url) {
                console.log('file available at async await', url);
            })

        //push to path
        //storageRef.child('images/' + Date.now()).put(blob).then(function(snapshot) {
        //     console.log('Uploaded', snapshot.totalBytes, 'bytes');
        //     console.log('file metadata:', snapshot.metadata);
        //     //get download url
        //     snapshot.ref.getDownloadURL().then(function(url) {
        //         console.log('file available at', url);
        //     })
        // }).catch(function(error) {
        //     console.error('upload failed:', error);
        // })
    }

    if(selectedImage !== null) {
        
        return (
            <View style={styles.container}>
                <Text>There should be an image here</Text>
                <Image 
                    source={{uri: selectedImage.uri}}
                    style={{
                        width: 300,
                        height: 300,
                        resizeMode: "contain"
                      }}
                />
                <Button 
                    title="Upload"
                    onPress={() => uploadImage()}
                />
            </View>
        )
    }
    return (
        <View>
            <Text>This is the home screen </Text>
            <Button 
                title='Pick an image'
                onPress={() => pickAnImage()}
                />
        </View>
    )
}