import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, TabBarTop } from 'react-navigation';

import Colors from '../constants/Colors';

import CodeScreen from '../screens/CodeScreen';
import KeyboardScreen from '../screens/KeyboardScreen';
import OutputScreen from '../screens/OutputScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default TabNavigator(
    {
	Settings: {
	    screen: SettingsScreen,
	},
	Keyboard: {
	    screen: KeyboardScreen,
	},
	Output: {
	    screen: OutputScreen,
	},
	Code: {
	    screen: CodeScreen,
	}
    },
    {
	navigationOptions: ({ navigation }) => ({
	    tabBarIcon: ({ focused }) => {
		const { routeName } = navigation.state;
		let iconName;
		switch (routeName) {
		    case 'Keyboard':
			iconName =
			    Platform.OS === 'ios'
			    ? `ios-grid${focused ? '' : '-outline'}`
			    : 'md-grid';
			break;
		    case 'Code':
			iconName =
			    Platform.OS === 'ios'
			    ? `ios-menu${focused ? '' : '-outline'}`
			    : 'md-menu';
			break;
		    case 'Output':
			iconName =
			    Platform.OS === 'ios'
			    ? `ios-phone-portrait${focused ? '' : '-outline'}`
			    : 'md-phone-portrait';
			break;
		    case 'Settings':
			iconName =
			    Platform.OS === 'ios'
			    ? `ios-bulb${focused ? '' : '-outline'}`
			    : 'md-settings';
			break;

		}
		return (
		    <Ionicons
			name={iconName}
			size={28}
			style={{ marginBottom: -3 }}
			color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
		    />
		);
	    },
	}),
	tabBarComponent: TabBarBottom,
	tabBarPosition: 'top',
	animationEnabled: false,
	swipeEnabled: false,
    }
);
