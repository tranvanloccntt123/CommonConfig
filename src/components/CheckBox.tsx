import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AppStyle } from "../../AppStyle";
import { grayPrimary, violet, white } from "../../Colors";
const style = StyleSheet.create({
    containerCheckBox: { padding: 2, borderWidth: 1, borderRadius: 25, borderColor: grayPrimary, width: 25, height: 25 }
})
export default function CheckBox(props: {value: boolean, setValue: Function, title: string}) {
    const onPress = () => {
        props.setValue(!props.value)
    }
    return <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
        <View style={[style.containerCheckBox, AppStyle.mr1]}>
            <TouchableOpacity style={{flex: 1}} onPress={onPress}>
                <View style={{ flex: 1, backgroundColor: props.value ? violet : white, borderRadius: 25 }}>

                </View>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onPress}>
            <Text>{props.title}</Text>
        </TouchableOpacity>
    </View>
}