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
import { useCredentials } from '../context/credentialsContext';
import { MenuProvider } from 'react-native-popup-menu';
import MenuPages from './pages/MenuPages';
import TestPage from './pages/TestPage';
import PictureDetails from './pages/PictureDetails';
import ModalComments from './pages/ModalComments';
import ModalDataVotes from './pages/ModalDataVotes';
import { COLORS } from './constants/Colors';
const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
        placeholder: COLORS.GRAYLOGO
    },
};

const Stack = createNativeStackNavigator();
function Routes() {
    const { splashScreenLoader, authenticated } = useCredentials();
    return (
        <PaperProvider theme={theme}>
            <MenuProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={'SplashScreen'}>
                        {
                            splashScreenLoader ?
                                <Stack.Screen
                                    name="SplashScreen"
                                    component={SplashScreen}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                :
                                null
                        }
                        {authenticated ?
                            <>
                                <Stack.Screen
                                    name="Home"
                                    component={Home}
                                    options={{
                                        title: 'My pictures',
                                        headerLeft: null,
                                        headerStyle: {
                                            backgroundColor: COLORS.BLUE,
                                        },
                                        headerTintColor: COLORS.WHITE,
                                        headerTitleStyle: {
                                            fontWeight: 'normal',
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
                                            backgroundColor: COLORS.BLUE,
                                        },
                                        headerTintColor: COLORS.WHITE,
                                        headerTitleStyle: {
                                            fontWeight: 'normal',
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
                                        headerTintColor: COLORS.WHITE,
                                        headerTitleStyle: {
                                            fontWeight: 'normal',
                                        }
                                    }}
                                />
                                <Stack.Screen
                                    name="Picture Details"
                                    component={PictureDetails}
                                    options={{
                                        title: 'Details',
                                        headerStyle: {
                                            backgroundColor: COLORS.BLUE,
                                        },
                                        headerTintColor: COLORS.WHITE,
                                        headerTitleStyle: {
                                            fontWeight: 'normal',
                                        }
                                    }}
                                />
                                <Stack.Group
                                    screenOptions={{
                                        title: 'Notes',
                                        presentation: 'fullScreenModal',
                                        animation: "fade"
                                    }}
                                >
                                    <Stack.Screen
                                        name="My Modal Comments"
                                        component={ModalComments}
                                    />
                                </Stack.Group>
                                <Stack.Group
                                    screenOptions={{
                                        title: 'Votes Data',
                                        presentation: 'fullScreenModal',
                                        animation: "fade"
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
                                            backgroundColor: COLORS.BLUE,
                                        },
                                        headerTintColor: COLORS.WHITE,
                                        headerTitleStyle: {
                                            fontWeight: 'normal',
                                        },
                                    }}
                                />
                                <Stack.Screen
                                    name="Signup"
                                    component={Signup}
                                    options={{
                                        title: 'Sign Up',
                                        headerStyle: {
                                            backgroundColor: COLORS.BLUE,
                                        },
                                        headerTintColor: COLORS.WHITE,
                                        headerTitleStyle: {
                                            fontWeight: 'normal',
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
        </PaperProvider>
    )
}

export default Routes
