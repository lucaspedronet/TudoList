import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';

export default function App(){
  const [name, setName] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  function handleSubmit() {
    if (!name) {
        Alert.alert('Por favor digite um nome!');
        return;
    }
    else {
      const memberExists = members.some(member => member === name);
      if (memberExists) {
        Alert.alert('Este nome já existe na lista de membros!', 'Por favor digite outro nome!');
        return;
      } else {
        setMembers(m => [name, ...m]);
        setName('');
      }
    }
  }
  function handleDelete(index: number) {
    Alert.alert(
      'Tem certeza que deseja excluir o membro "' + members[index]+ '"?',
      'Esta ação não pode ser desfeita',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            const newMembers = [...members];
            newMembers.splice(index, 1);
            setMembers(newMembers);  
            Alert.alert('O membro "' + members[index]+ '" foi excluído com sucesso!');
          },
        },
      ],
      { cancelable: false }
    );
  }
  return (
    <View style={styled.container}>
      <View style={styled.header}>
        <Image style={styled.logo} source={require('./assents/logo.png')}/>
      </View>
      <View style={styled.content}>
        <View style={styled.containerinput}>
          <TextInput placeholder='Adicione uma nova tarefa' placeholderTextColor={'#808080'} style={styled.input} onChangeText={setName} value={name}/>
          <TouchableOpacity style={styled.buttonadd}onPress={handleSubmit}>
            <Text key={1} style={styled.labelButton}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', height: 71}}>
          <View style={{flex: 1, flexDirection: 'row', top: 32, height: 19}}>
            <Text style={styled.criadas}>
              Criadas
            </Text>
            <View style={{height: 19, width: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 999, backgroundColor: '#333333', left: 8}}>
              <Text style={styled.cont}>
                0
              </Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', top: 32, height: 19, justifyContent: 'flex-end'}}>
            <Text style={styled.concluidas}>
              Concluídas
            </Text>
            <View style={{height: 19, width: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 999, backgroundColor: '#333333'}}>
              <Text style={styled.cont}>
                0
              </Text>
            </View>
          </View>
        </View>
        <View style={styled.contentlist}>
          {members.length === 0 ? (
            <View style={{flex: 1, alignItems: 'center'}}>
            <Image style={styled.clipboard} source={require('./assents/clipboard.png')}/>
            <Text style={styled.title3}>
              Você ainda não tem tarefas cadastradas{'\n'}
              Crie tarefas e organize seus itens a fazer.
            </Text>
            </View>
          ):(
            members.map((name, index) => {
              return (
                <View key={index} style={styled.containerlist}>
                  <View key={index} style={styled.list}>
                    <Text key={name + index} style={styled.list}>
                      {name}
                    </Text>
                  </View>
                  <TouchableOpacity style={styled.buttondelet} onPress={() => handleDelete(index)}>
                    <Text key={2} style={styled.labelButton}>
                      -
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
      </View>
    </View>
  );
}

const styled = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 143, alignItems: 'center', backgroundColor: '#0D0D0D'
  },
  logo: {
    height: 32, width: 110, top: 40
  },
  clipboard: {
    height: 56, width: 56,
  },
  content: {
    backgroundColor: '#1A1A1A', flex: 1, paddingHorizontal: 24
  },
  title: {
    color: '#FDFCFE', fontSize: 24, lineHeight: 28.13, fontWeight: '700'
  },
  criadas: {
    color: '#4EA8DE', top: 3, fontSize: 14, lineHeight: 16.94, fontWeight: '700'
  },  
  cont: {
    color: '#D9D9D9', textAlign: 'center', fontSize: 12, lineHeight: 14.52, fontWeight: '700'
  },
  concluidas: {
    color: '#8284FA', top: 2, right: 8, fontSize: 14, lineHeight: 16.94, fontWeight: '700'
  },
  contentlist: {
    height: 209, borderTopWidth: 1, borderColor: '#333333', paddingHorizontal: 20, paddingVertical: 48, gap: 16
  },
  title3: {
    flex: 1, color: '#FDFCFE', fontSize: 14, lineHeight: 19.6, textAlign: 'center', fontWeight: '400', top: 16, marginBottom: 45
  },
  subtitle: {
    color: '#6B6B6B', fontSize: 16, lineHeight: 18.75, fontWeight: '400'
  },
  input: {
    flex: 1, height: 54, borderRadius: 6, borderWidth: 1, borderColor: '#0D0D0D', backgroundColor: '#1F1E25', color: '#262626', alignItems: 'center',paddingHorizontal: 16, fontSize: 14,
  },
  list: {
    flex: 1, height: 56, textAlignVertical: 'center', color: '#FDFCFE', paddingHorizontal: 8, fontSize: 16, fontWeight: '400',
  },
  containerinput: {
    flexDirection: 'row', alignItems: 'center', marginTop: -27, gap: 4
  },
  containerlist: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 4, backgroundColor: '#1F1E25', marginTop: 10, gap: 7
  },
  buttonadd: {
    alignItems: 'center', justifyContent: 'center', width: 54, height: 54, borderRadius: 6, backgroundColor: '#1E6F9F'
  },
  buttondelet: {
    alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 6, backgroundColor: '#E23C44'
  },
  labelButton: {
    color: '#fff', fontSize: 24, lineHeight: 24, fontWeight: '400'
  },
})