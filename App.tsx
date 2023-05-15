import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [members, setMembers] = useState<string[]>([]);

  function handleSubmit() {
    if (name.length <= 0) {
      return;
    }

    // if (members.includes(name.trim())) {
    //   return Alert.alert(
    //     'Ateção',
    //     'O participante: ' + name + ' já foi adicionado!',
    //   );
    // }

    setMembers(parms => [name, ...parms]);

    setName('');
  }

  function onMemberDestroi(memberDetroi: string) {
    const newMembers = members.filter(m => m !== memberDetroi);

    setMembers(newMembers);
  }

  function handleRemoveMember(member: string) {
    Alert.alert('Remover', 'Remover o ' + member, [
      {
        
        onPress: () => {
          onMemberDestroi(member);
          console.log('removeu');
        },
      },
    ]);
  }

  return (
    <View style={styled.container}>
      <Text key={1} style={styled.titleEvent}>
        to do
      </Text>
      

      <View style={styled.containerInput}>
        <TextInput
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor="#6B6B6B"
          style={styled.input}
          onChangeText={setName}
          value={name}
        />

        <TouchableOpacity style={styled.buttonAdd} onPress={handleSubmit}>
          <Text style={styled.labelButton}>o</Text>
        </TouchableOpacity>
      </View>

      <Text style={styled.check}>
        Criadas:  Concluidas:
      </Text>
      
      <Text style={styled.lineLabel}>
        
      </Text>



      {members.length > 0 ? (
        members.map((name, index) => (
          <View key={name + index} style={styled.member}>
            <Text style={styled.memberLabel}>{name}</Text>

            <TouchableOpacity
              style={styled.buttonRemove}
              onPress={() => handleRemoveMember(name)}>
              <Text style={styled.labelButton}>-</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text key={4} style={styled.paragraph}>
          Você ainda não tem tarefas cadastradas. Crie tarefas e organize seus itens a fazer
        </Text>
        
      )}
    </View>
  );
}

const styled = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 25,
  },
  titleEvent: {
    color: 'blue',
    fontSize: 24,
    lineHeight: 28.13,
    fontWeight: '700',    
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center', 
    gap: 7,   
  },
  titleMembers: {
    color: '#FDFCFE',
    fontSize: 20,
    lineHeight: 23.44,
    fontWeight: '700',
    marginTop: 42,
  },
  paragraph: {
    color: '#FDFCFE',
    fontSize: 14,
    lineHeight: 16.41,
    fontWeight: '400',
    marginTop: 42,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  check: {
    color: 'blue',
    lineHeight: 18.75,
    fontSize: 16,
    fontWeight: '400',
    flexDirection: 'row',
    marginTop: 34,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 56,
    borderRadius: 4,
    backgroundColor: '#1F1E25',
    color: '#FDFCFE',
    alignItems: 'center',
    paddingHorizontal: 16,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    borderColor: 'blue',
    borderWidth: 1
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 34,
    gap: 7,
  },
  buttonAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 4,
    backgroundColor: 'blue',
  },
  buttonRemove: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 4,
    backgroundColor: 'gray',
  },
  labelButton: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '400',
  },
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingStart: 16,
    width: '85%',
    height: 60,
    marginTop: 16,
    borderRadius: 4,
    backgroundColor: '#1F1E25',
  },
  memberLabel: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 18.75,
  },
  lineLabel: {
    fontSize: 16,
    borderTopWidth: 3,
    borderColor: 'gray',
    paddingBottom:4,
    marginTop:20,
  },
});