import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 100,
    },
    glassEffect: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 8,
    },
    backButton: {
      padding: 8,
      marginRight: 8,
    },
    locationContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 8,
    },
    locationIcon: {
      marginRight: 8,
    },
    locationText: {
      flex: 1,
    },
    refreshButton: {
      padding: 8,
    },
  });