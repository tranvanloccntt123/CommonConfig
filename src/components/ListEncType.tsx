import React from "react";
import { FlatList, Text, View } from "react-native";
import { ContentType } from "../../ApiRequest";
import { AppStyle } from "../../AppStyle";
import CheckBox from "./CheckBox";
export default function ListEncType(props: {selectType: ContentType, setSelectType: Function}){
    const listEncType: Array<ContentType> = ['application/json', 'multipart/form-data', 'text/html', 'x-www-form-urlencoded'];
    return <View style={[AppStyle.mb3]}>
    <Text style={[AppStyle.pl3, AppStyle.mb1]}>Type</Text>
    <FlatList
      data={listEncType}
      keyExtractor={(item, index) => `[KEY TYPE] ${item}`}
      renderItem={(itemProps) => {
        return <CheckBox value={props.selectType == itemProps.item} setValue={(state: boolean) => {
          if (state) props.setSelectType(itemProps.item)
        }} title={itemProps.item} />
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  </View>
}