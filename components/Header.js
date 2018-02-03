import React, {Component} from 'react';
import { View, Text } from 'react-native';

class Header extends Component {
    render() {
        return (
            <View>
                <View style={styles.header}/>
                <View style={styles.navbar}>
                    <Text style={styles.navbarTitle}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
};

const styles = {
    navbar: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
        height: 44,
        flexDirection: 'row'
    },
    navbarTitle: {
        color: '#444',
        fontSize: 16,
        fontWeight: "500"
    },
    header: {
        backgroundColor: '#fff',
        height: 22,
    }
};

export default Header;