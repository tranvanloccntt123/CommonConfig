/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ApiRequest, ContentType } from './ApiRequest';
import { AppStyle } from './AppStyle';
import { gray, orange, red, violet, white } from './Colors';
import { Method } from 'axios';
import ListAPI from './src/components/ListAPI';
import ListMethod from './src/components/ListMethod';
import ListEncType from './src/components/ListEncType';
const style = StyleSheet.create({
  input: {
    borderWidth: 1, borderColor: gray, backgroundColor: white
  }
});
interface Agruments {
  title: string,
  value: string
}
const App = () => {
  //token = H3FizGTaUakQUQjlFAtki41lOjHOURTyXATmxsXV
  const [token, setToken] = React.useState<string>("");
  const [route, setRoute] = React.useState<string>("");
  const [agruments, setAgruments] = React.useState<Array<Agruments>>([]);
  const [enctype, setEncType] = React.useState<ContentType>("text/html");
  const [selectMethod, setSelectMethod] = React.useState<Method>('GET');
  const [response, setResponse] = React.useState<string>('');
  const onAddAgrument = () => {
    const agrument: Agruments = {
      title: "agrument name",
      value: ""
    }
    setAgruments((args: Array<Agruments>) => {
      let t = [...args];
      t.push(agrument);
      return t;
    });
  }
  const onRequest = async () => {
    ApiRequest.token = token;
    setResponse('Sending request...')
    let body = {};
    agruments.forEach(v => {
      body[`${v.title.toLowerCase()}`] = v.value;
    });
    let r = await ApiRequest.build(selectMethod, enctype)(route, body);
    setResponse(JSON.stringify(r.data))
  }
  return (
    <View style={[AppStyle.container]}>
      <SafeAreaView style={[AppStyle.container]}>
        <ScrollView style={[AppStyle.p3]}>
          <Text style={[AppStyle.h4, AppStyle.mb3]}>TEST API Module</Text>
          <View style={[AppStyle.mb3]}>
            <Text style={[AppStyle.pl3, AppStyle.mb1]}>Path *</Text>
            <TextInput
              style={[AppStyle.p3, AppStyle.mb1, { borderWidth: 1, borderColor: gray, borderRadius: 5 }]}
              placeholder={"example: https://localhost/api/auth/login"}
              value={route}
              onChangeText={(text) => setRoute(text)}
            />
          </View>
          <ListAPI setRoute={setRoute} />
          <ListMethod selectMethod={selectMethod} setSelectMethod={setSelectMethod} />
          <ListEncType selectType={enctype} setSelectType={setEncType} />
          <View style={[AppStyle.mb3]}>
            <Text style={[AppStyle.pl3, AppStyle.mb1]}>Authorization</Text>
            <TextInput
              style={[AppStyle.p3, { borderWidth: 1, borderColor: gray, borderRadius: 5 }]}
              placeholder={"Bearer xxx"}
              value={token}
              onChangeText={(text) => setToken(text)}
            />
          </View>
          <View style={[AppStyle.mb3]}>
            <Text style={[AppStyle.pl3, AppStyle.mb1]}>Body Request</Text>
            {
              agruments.map((value, index) => <View style={[{ flex: 1, flexDirection: 'row' }, AppStyle.mb3]} key={`[AGRUMMENTS] ${index}`}>
                <TextInput
                  value={value.title}
                  onChangeText={(text) => {
                    setAgruments((agrs: Array<Agruments>) => {
                      let t = [...agrs];
                      t[index].title = text;
                      return t;
                    });
                  }}
                  style={[AppStyle.p3, style.input, { flex: 1, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }]}
                />
                <TextInput
                  value={value.value}
                  style={[AppStyle.p3, style.input, { flex: 2, borderTopRightRadius: 5, borderBottomRightRadius: 5 }]}
                  onChangeText={(text) => {
                    setAgruments((agrs: Array<Agruments>) => {
                      let t = [...agrs];
                      t[index].value = text;
                      return t;
                    });
                  }}
                />
                <TouchableOpacity activeOpacity={0.9} onPress={() => {
                  setAgruments((agrs: Array<Agruments>) => {
                    let t = [...agrs];
                    t.splice(index, 1);
                    return t;
                  });
                }} style={[{backgroundColor: red, borderRadius: 15}, AppStyle.p3, AppStyle.center, AppStyle.ml1]}>
                  <Text style={[{color: white, fontWeight: 'bold'}]}>Del</Text>
                </TouchableOpacity>
              </View>)
            }
            <TouchableOpacity onPress={onAddAgrument} activeOpacity={0.8} style={[{ borderWidth: 1, borderRadius: 8, borderColor: gray }, AppStyle.p3, AppStyle.center]}>
              <Text style={[AppStyle.p]}>Add Agruments +</Text>
            </TouchableOpacity>
          </View>

          <View style={[AppStyle.mb3]}>
            <Text>Response</Text>
            <TextInput 
              value={response}
              textAlign='left'
              style={{width: '100%', height: 300, borderWidth: 1, borderColor: gray, borderRadius: 5, backgroundColor: white, padding: 3}}
              multiline
            />
          </View>
          <TouchableOpacity onPress={onRequest} activeOpacity={0.8} style={[AppStyle.p3, AppStyle.mb3, AppStyle.center, { backgroundColor: orange, borderRadius: 15 }]}>
            <Text style={[AppStyle.h5, { color: white }]}>SEND</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default App;
