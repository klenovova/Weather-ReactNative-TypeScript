import { Pressable, HStack, VStack, Icon, Text, Switch } from '@gluestack-ui/themed-native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle: string;
  isChecked: boolean;
  onToggle: () => void;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  isChecked,
  onToggle,
}) => {
  return (
    <Pressable onPress={onToggle}>
        <HStack space={4} alignItems="center" py={4}>
          <Icon
            as={MaterialCommunityIcons}
            name={icon}
            size={6}
            color="primary.500"
          />
          <VStack flex={1}>
            <Text fontSize="md" fontWeight="semibold">
              {title}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {subtitle}
            </Text>
          </VStack>
          <Switch
            size="lg"
            isChecked={isChecked}
            onToggle={onToggle}
            colorScheme="primary"
          />
        </HStack>
    </Pressable>
  );
};
