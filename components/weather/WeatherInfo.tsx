import { VStack, Icon, Text } from '@gluestack-ui/themed-native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WeatherInfo = ({ label, value, icon }: { label: string; value: string; icon: string }) => (
    <VStack space={2} alignItems="center">
      <Icon as={MaterialCommunityIcons} name={icon} size={6} color="white" />
      <Text color="white" fontSize="sm">{label}</Text>
      <Text color="white" fontSize="lg" fontWeight="bold">{value}</Text>
    </VStack>
  );

export default WeatherInfo;