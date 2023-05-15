import {Text, StyleSheet} from 'react-native';

type TitleEventProps = {
  title: string;
  subTitle: string;
};

export function TitleEvent({subTitle, title}: TitleEventProps) {
  return (
    <>
      <Text style={styled.titleEvent}>{title}</Text>
      <Text style={styled.subTitle}>{subTitle}</Text>
    </>
  );
}

const styled = StyleSheet.create({
  titleEvent: {
    color: '#FDFCFE',
    fontSize: 24,
    lineHeight: 28.13,
    fontWeight: '700',
  },
  subTitle: {
    color: '#6B6B6B',
    lineHeight: 18.75,
    fontSize: 16,
    fontWeight: '400',
  },
});