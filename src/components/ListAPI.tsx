import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LOGIN_API_SIGNIN, LOGIN_API_SIGNUP, CHAT_API_GET_LIST, CHAT_API_GET_MESSAGES, CHAT_API_SEND_MESSAGE, PROFILE_API_VISIT, PROFILE_API_RELATION_LIST, PROFILE_API_RELATION_REQUEST } from "../../ApiRoute";
import { AppStyle } from "../../AppStyle";
import { orange } from "../../Colors";
export default function ListAPI(props: { setRoute: Function }) {
    const { setRoute } = props;
    return <View style={[AppStyle.pl3, AppStyle.pr3, AppStyle.mb3]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setRoute(LOGIN_API_SIGNIN)}>
            <Text style={[AppStyle.mb1, { color: orange }]}>{LOGIN_API_SIGNIN}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setRoute(LOGIN_API_SIGNUP)}>
            <Text style={[AppStyle.mb1, { color: orange }]}>{LOGIN_API_SIGNUP}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setRoute(CHAT_API_GET_LIST)}>
            <Text style={[AppStyle.mb1, { color: orange }]}>{CHAT_API_GET_LIST}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setRoute(CHAT_API_GET_MESSAGES)}>
            <Text style={[AppStyle.mb1, { color: orange }]}>{CHAT_API_GET_MESSAGES}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setRoute(CHAT_API_SEND_MESSAGE)}>
            <Text style={[AppStyle.mb1, { color: orange }]}>{CHAT_API_SEND_MESSAGE}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setRoute(PROFILE_API_VISIT)}>
            <Text style={[AppStyle.mb1, { color: orange }]}>{PROFILE_API_VISIT}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setRoute(PROFILE_API_RELATION_LIST)}>
            <Text style={[AppStyle.mb1, { color: orange }]}>{PROFILE_API_RELATION_LIST}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setRoute(PROFILE_API_RELATION_REQUEST)}>
            <Text style={[AppStyle.mb1, { color: orange }]}>{PROFILE_API_RELATION_REQUEST}</Text>
        </TouchableOpacity>
    </View>
}