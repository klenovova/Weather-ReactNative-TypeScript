import { Box } from '@gluestack-ui/themed-native-base';
import { styles } from '@/src/styles/weather.styles';
import { Platform } from 'react-native';

const GlassBox = ({ children }: { children: React.ReactNode }) => (
    <Box
        bg={Platform.OS === 'ios' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.25)'}
        rounded="3xl"
        p={6}
        style={Platform.OS === 'ios' ? styles.glassEffect : null}
    >
        {children}
    </Box>
);

export default GlassBox;