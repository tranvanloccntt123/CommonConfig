import { Method } from "axios";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { AppStyle } from "../../AppStyle";
import CheckBox from "./CheckBox";
export default function ListMethod(props: {selectMethod: Method, setSelectMethod: Function}){
    const listMethod: Array<Method> = ['DELETE', 'GET', 'HEAD', 'LINK', 'OPTIONS', 'PATCH', 'POST', 'PURGE', 'PUT', 'UNLINK'];
    return <View style={[AppStyle.mb3]}>
    <Text style={[AppStyle.pl3, AppStyle.mb1]}>Method</Text>
    <FlatList
      data={listMethod}
      keyExtractor={(item, index) => `[KEY METHOD] ${item}`}
      renderItem={(itemProps) => {
        return <CheckBox value={props.selectMethod == itemProps.item} setValue={(state: boolean) => {
          if (state) props.setSelectMethod(itemProps.item)
        }} title={itemProps.item} />
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  </View>
}