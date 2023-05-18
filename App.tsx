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
import {Task} from './src/components/Tasks';

export default function App() {
  const [name, setName] = useState<string>(''); // Nome da tarefa
  const [tasks, setTasks] = useState<string[]>([]); // Lista de tarefas

  function handleSubmit() {
    if (name.trim().length <= 0) {
      return;
    }

    if (tasks.includes(name.trim())) {
      return Alert.alert(
        'Atenção',
        'A Tarefa: ' + name + ' já foi adicionada!',
      );
    }

    setTasks(preState => [name, ...preState]);

    setName('');
  }

  function onTaskDestroi(task: string) {
    const newTasks = tasks.filter(m => m !== task);

    setTasks(newTasks);
  }

  function handleRemoveTask(task: string) {
    Alert.alert('Remover', 'Remover ' + task, [
      {
        text: 'Sim',
        isPreferred: true,
        onPress: () => {
          onTaskDestroi(task);
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
        title="to"
        subTitle="do"
      />
      <View style={styled.containerInput}>
        <TextInput
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor="#808080"
          style={styled.input}
          onChangeText={setName}
          value={name}
        />

        <TouchableOpacity style={styled.buttonAdd} onPress={handleSubmit}>
          <Text style={styled.labelButton}>+</Text>
        </TouchableOpacity>
      </View>

      <Text key={3} style={styled.titleTasks}>
        Nome do evento
      </Text>

      {tasks.length > 0 ? (
        tasks.map((name, index) => (
          <Task
            id={name + index}
            name={name}
            onRemove={() => handleRemoveTask(name)}
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
  titleTasks: {
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
    height: 55,
    width: 271,
    borderRadius: 6,
    backgroundColor: '#1F1E25',
    color: '#FDFCFE',
    alignItems: 'center',
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 22.4,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 34,
    gap: 8,   

  },
  buttonAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 52,
    height: 52,
    borderRadius: 6,
    backgroundColor: '#1E6F9F',
    gap: 8,
    Top: 1,

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
    color: '#F2F2F2',
    position: 'absolute',  
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '400',
  },
});