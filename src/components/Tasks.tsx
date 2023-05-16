import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

type TaskProps = {
  id: string;
  name: string;
  onRemove: () => void;
};

export function Task({id, name, onRemove}: TaskProps) {
  return (
    <View key={id} style={styled.task}>
      <Text style={styled.taskLabel}>{name}</Text>

      <TouchableOpacity style={styled.buttonRemove} onPress={onRemove}>
        <Text style={styled.labelButton}>-</Text>
      </TouchableOpacity>
    </View>
  );
}

const styled = StyleSheet.create({
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
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingStart: 16,
    width: '100%',
    height: 60,
    marginTop: 16,
    borderRadius: 4,
    backgroundColor: '#1F1E25',
  },
  taskLabel: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 18.75,
  },
});