import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

const itemsImg = {
  logo: require('./assents/logo.png'),
  clipboard: require('./assents/clipboard.png'),
  delete: require('./assents/delete.png'),
  checked: require('./assents/checked.png'),
  circulo: require('./assents/icon-circulo.png'),
};

type TarefaType = {
  id: string;
  nome: string;
  feito: boolean;
};

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [listaDeTarefas, setListaDeTarefas] = useState<TarefaType[]>([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState<TarefaType[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {setIsFocused(true)};
  const handleBlur = () => {setIsFocused(false)};

  useEffect(() => {
    onTarefasConcluidas();
  }, [listaDeTarefas]);

  function handleSubmit() {
    if (!tarefa) {
      return Alert.alert('Por favor digite uma tarefa!');
    }

    const tarefaExiste = listaDeTarefas.some(t => t.nome === tarefa);

    if (tarefaExiste) {
      return Alert.alert(
        'Esta tarefa já existe em sua agenda',
        'Por favor digite outra tarefa!',
      );
    }

    const novaTarefa: TarefaType = {
      feito: false,
      id: Math.random().toString().split('.')[1],
      nome: tarefa,
    };

    setListaDeTarefas(m => [novaTarefa, ...m]);
    setTarefa('');
  }

  function handleDelete(id: string) {
    Alert.alert(
      'REMOVER',
      'Tem certeza que deseja excluir a tarefa?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            setListaDeTarefas(props => {
              return props.filter(t => t.id !== id);
            });
          },
        },
      ],
      {cancelable: false},
    );
  }

  function handleToggle(id: string) {
    setListaDeTarefas((props) => {
      return props.map((t) => (t.id === id ? {...t, feito: !t.feito} : t));
    });

    onTarefasConcluidas();
  }

  function onTarefasConcluidas() {
    const newTarefasConcluidas = listaDeTarefas.filter((t) => t.feito);

    setTarefasConcluidas(newTarefasConcluidas);
  }

  return (
    <View style={styled.container}>
      <View style={styled.header}>
        <Image style={styled.logo} source={itemsImg.logo} />
      </View>
      <View style={styled.content}>
        <View style={styled.containerinput}>
          <TextInput
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor={'#808080'}
            style={[
              styled.input,
              isFocused ? styled.inputFocused : null,
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={setTarefa}
            value={tarefa}
          />
          <TouchableOpacity style={styled.buttonadd} onPress={handleSubmit}>
            <Text key={1} style={styled.labelButton}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', height: 71}}>
          <View style={{flex: 1, flexDirection: 'row', top: 32, height: 19}}>
            <Text style={styled.criadas}>Criadas</Text>
            <View
              style={{
                height: 19,
                width: 25,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 999,
                backgroundColor: '#333333',
                left: 8,
              }}>
              <Text style={styled.numeroDeTarefas}>
                {listaDeTarefas.length}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              top: 32,
              height: 19,
              justifyContent: 'flex-end',
            }}>
            <Text style={styled.concluidas}>Concluídas</Text>
            <View
              style={{
                height: 19,
                width: 25,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 999,
                backgroundColor: '#333333',
              }}>
              <Text style={styled.numeroDeTarefas}>
                {tarefasConcluidas.length}
              </Text>
            </View>
          </View>
        </View>
        <View style={styled.contentlist}>
          {listaDeTarefas.length === 0 ? (
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image style={styled.clipboard} source={itemsImg.clipboard} />
              <Text style={styled.title3}>
                Você ainda não tem tarefas cadastradas{'\n'}
                Crie tarefas e organize seus itens a fazer.
              </Text>
            </View>
          ) : (
            listaDeTarefas.map(tarefa => {
              return (
                <View key={tarefa.id} style={[styled.containerlist, {
                  borderWidth: tarefa.feito ? 0 : 1,
                }]}>
                  <TouchableOpacity
                    style={styled.botaoFeito}
                    onPress={() => handleToggle(tarefa.id)}>
                    <Image
                      source={
                        tarefa.feito ? itemsImg.checked : itemsImg.circulo
                      }
                    />
                  </TouchableOpacity>
                  <View style={styled.list}>
                    <Text style={[styled.list, {
                      textDecorationLine: tarefa.feito ? 'line-through' : 'none',
                      color: tarefa.feito ? '#808080' : '#FDFCFE',
                    },]}>
                      {tarefa.nome}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styled.buttondelet}
                    onPress={() => handleDelete(tarefa.id)}>
                    <Image style={styled.delete} source={itemsImg.delete} />
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
    flex: 2,
  },
  header: {
    height: 143,
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
  logo: {
    height: 32,
    width: 110,
    top: 40,
  },
  delete: {
    height: 22,
    width: 22,
  },
  botaoFeito: {
    marginHorizontal: 16,
    width: 20,
    height: 20,
  },
  clipboard: {
    height: 56,
    width: 56,
    top: 48,
  },
  content: {
    backgroundColor: '#1A1A1A',
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    color: '#FDFCFE',
    fontSize: 24,
    lineHeight: 28.13,
    fontWeight: '700',
  },
  criadas: {
    color: '#4EA8DE',
    top: 3,
    fontSize: 14,
    lineHeight: 16.94,
    fontWeight: '700',
  },
  numeroDeTarefas: {
    color: '#D9D9D9',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 14.52,
    fontWeight: '700',
  },
  concluidas: {
    color: '#8284FA',
    top: 2,
    right: 8,
    fontSize: 14,
    lineHeight: 16.94,
    fontWeight: '700',
  },
  contentlist: {
    flex: 1,
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderColor: '#333333',
    gap: 16,
  },
  title3: {
    flex: 1,
    color: '#FDFCFE',
    fontSize: 14,
    lineHeight: 19.6,
    textAlign: 'center',
    fontWeight: '400',
    top: 64,
  },
  subtitle: {
    color: '#6B6B6B',
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: '400',
  },
  input: {
    flex: 1,
    height: 54,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0D0D0D',
    backgroundColor: '#262626',
    color: '#F2F2F2',
    alignItems: 'center',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: '#5E60CE',
  },
  list: {
    flex: 1,
    height: 64,
    textAlignVertical: 'center',
    color: '#FDFCFE',
    fontSize: 12,
    fontWeight: '400',
  },
  containerinput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -27,
    gap: 4,
  },
  containerlist: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#333333',
    backgroundColor: '#262626',
  },
  buttonadd: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: 54,
    borderRadius: 6,
    backgroundColor: '#1E6F9F',
  },
  buttondelet: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginHorizontal: 7,
  },
  labelButton: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '400',
  },
});
