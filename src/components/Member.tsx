import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

type MemberProps = {
  id: string;
  name: string;
  onRemove: () => void;
};

export function Member({id, name, onRemove}: MemberProps) {
  return (
    <View key={id} style={styled.member}>
      <Text style={styled.memberLabel}>{name}</Text>

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
  member: {
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
  memberLabel: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 18.75,
  },
});