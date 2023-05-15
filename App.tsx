import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {TitleEvent} from './src/components/TitleEvent';
import {Member} from './src/components/Member';

export default function App() {
  const [name, setName] = useState<string>(''); // Nome do participantes
  const [members, setMembers] = useState<string[]>([]); // Lista de participantes

  function handleSubmit() {
    if (name.trim().length <= 0) {
      return;
    }

    if (members.includes(name.trim())) {
      return Alert.alert(
        'Atenção',
        'O participante: ' + name + ' já foi adicionado!',
      );
    }

    setMembers(preState => [name, ...preState]);

    setName('');
  }

  function onMemberDestroi(member: string) {
    const newMembers = members.filter(m => m !== member);

    setMembers(newMembers);
  }

  function handleRemoveMember(member: string) {
    Alert.alert('Remover', 'Remover ' + member, [
      {
        text: 'Sim',
        isPreferred: true,
        onPress: () => {
          onMemberDestroi(member);
          console.log('removeu');
        },
      },
      {
        text: 'Não',
        isPreferred: false,
      },
    ]);
  }

  return (
    <View style={styled.container}>
      <TitleEvent
        key={12}
        subTitle="Sexta, 4 de Junho de 2023."
        title="Jogos internos IFTO"
      />
      <View style={styled.containerInput}>
        <TextInput
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          style={styled.input}
          onChangeText={setName}
          value={name}
        />

        <TouchableOpacity style={styled.buttonAdd} onPress={handleSubmit}>
          <Text style={styled.labelButton}>+</Text>
        </TouchableOpacity>
      </View>

      <Text key={3} style={styled.titleMembers}>
        Nome do evento
      </Text>

      {members.length > 0 ? (
        members.map((name, index) => (
          <Member
            id={name + index}
            name={name}
            onRemove={() => handleRemoveMember(name)}
          />
        ))
      ) : (
        <Text key={4} style={styled.paragraph}>
          Ninguém chegou no evento ainda? Adicione participantes a sua lista de
          presença.
        </Text>
      )}
    </View>
  );
}

const styled = StyleSheet.create({
  container: {
    backgroundColor: '#131016',
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 25,
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
    backgroundColor: '#31CF67',
  },
  buttonRemove: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 4,
    backgroundColor: '#E23C44',
  },
  labelButton: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '400',
  },
});