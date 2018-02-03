import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

class Button extends Component {
    render() {
        return (
            <View style={styles.action}>
                <TouchableHighlight onPress={this.props.onPress}>
                <Text style={styles.actionText}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        );
    };
};

const styles = {
    actionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    action: {
        backgroundColor: '#24CE84',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
};

export default Button;