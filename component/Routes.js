import React from 'react';

import Login from './pages/Login';
import SplashScreen from './pages/SplashScreen';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddPicture from './pages/AddPicture';
import Vote from './pages/Vote';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { CredentialsContext } from '../context/credentialsContext';
import { MenuProvider } from 'react-native-popup-menu';

import MenuPages from './pages/MenuPages';
import TestPage from './pages/TestPage';
import PictureDetails from './pages/PictureDetails';
import ModalPicture from './pages/ModalPicture';
import ModalComments from './pages/ModalComments';
import ModalDataVotes from './pages/ModalDataVotes';
const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
        placeholder: '#b5b5b5'
    },
};

const Stack = createNativeStackNavigator();
function Routes() {
    return (
        <CredentialsContext.Consumer>
            {(value) => {
                //  console.log("ggggggg",value);
                return (
                    <PaperProvider theme={theme}>
                        <MenuProvider>
                            <NavigationContainer>
                                <Stack.Navigator initialRouteName={'SplashScreen'}>
                                    {
                                       value.splashScreenLoader?
                                            <Stack.Screen
                                                name="SplashScreen"
                                                component={SplashScreen}
                                                options={{
                                                    headerShown :false,
                                                }}
                                            />
                                            :
                                            null 
                                    }
                                    {value.authenticated?
                                        <>
                                            <Stack.Screen
                                                name="Home"
                                                component={Home}
                                                options={{
                                                    title: 'Home',
                                                    headerLeft: null,
                                                    headerStyle: {
                                                        backgroundColor: '#257efa',
                                                    },
                                                    headerTintColor: '#fff',
                                                    headerTitleStyle: {
                                                        fontWeight: 'bold',
                                                    },
                                                    headerRight: () => (
                                                        <MenuPages />
                                                    ),
                                                }}
                                            />
                                            <Stack.Screen
                                                name="New Test"
                                                component={AddPicture}
                                                options={{
                                                    title: 'New Test',
                                                    headerStyle: {
                                                        backgroundColor: '#257efa',
                                                    },
                                                    headerTintColor: '#fff',
                                                    headerTitleStyle: {
                                                        fontWeight: 'bold',
                                                    }
                                                }}
                                            />
                                            <Stack.Screen
                                                name="Vote"
                                                component={Vote}
                                                options={{
                                                    title: 'Vote',
                                                    headerStyle: {
                                                        backgroundColor: '#40494f',
                                                    },
                                                    headerTintColor: '#fff',
                                                    headerTitleStyle: {
                                                        fontWeight: 'bold',
                                                    }
                                                }}
                                            />
                                            <Stack.Screen
                                                name="Picture Details"
                                                component={PictureDetails}
                                                options={{
                                                    title: 'Details',
                                                    headerStyle: {
                                                        backgroundColor: '#257efa',
                                                    },
                                                    headerTintColor: '#fff',
                                                    headerTitleStyle: {
                                                        fontWeight: 'bold',
                                                    }
                                                }}
                                            />
                                            <Stack.Group 
                                                screenOptions={{ 
                                                    headerShown :false,
                                                    presentation: 'fullScreenModal', 
                                                    animation : "slide_from_bottom" 
                                                    }}
                                            >
                                                <Stack.Screen 
                                                name="My Modal" 
                                                component={ModalPicture}
                                                />
                                            </Stack.Group>
                                            <Stack.Group 
                                                screenOptions={{ 
                                                    title:'Notes',
                                                    presentation: 'fullScreenModal', 
                                                    animation : "fade" 
                                                    }}
                                            >
                                                <Stack.Screen 
                                                name="My Modal Comments" 
                                                component={ModalComments}
                                                />
                                            </Stack.Group>
                                            <Stack.Group 
                                                screenOptions={{ 
                                                    title:'Votes Data',
                                                    presentation: 'fullScreenModal', 
                                                    animation : "fade" 
                                                    }}
                                            >
                                                <Stack.Screen 
                                                name="My Modal Votes" 
                                                component={ModalDataVotes}
                                                />
                                            </Stack.Group>
                                        </>
                                        :
                                        <>
                                            <Stack.Screen
                                                name="Login"
                                                component={Login}
                                                options={{
                                                    title: 'LOG IN',
                                                    headerLeft: null,
                                                    headerStyle: {
                                                        backgroundColor: '#257efa',
                                                    },
                                                    headerTintColor: '#fff',
                                                    headerTitleStyle: {
                                                        fontWeight: 'bold',
                                                    },
                                                }}
                                            />
                                            <Stack.Screen
                                                name="Signup"
                                                component={Signup}
                                                options={{
                                                    title: 'Sign Up',
                                                    headerStyle: {
                                                        backgroundColor: '#257efa',
                                                    },
                                                    headerTintColor: '#fff',
                                                    headerTitleStyle: {
                                                        fontWeight: 'bold',
                                                    }
                                                }}
                                            />
                                             <Stack.Screen
                                                name="test page"
                                                component={TestPage}
                                               
                                            />
                                        </>
                                    }
                                </Stack.Navigator>
                            </NavigationContainer>
                        </MenuProvider>
                    </PaperProvider>)
            }}
        </CredentialsContext.Consumer>

    )
}

export default Routes
