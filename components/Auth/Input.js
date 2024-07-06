import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

// Input component to render a labeled TextInput with validation styling
function Input({
  label,          // Label for the input field
  keyboardType,   // Type of keyboard to display
  secure,         // If true, hides the input text (for passwords)
  onUpdateValue,  // Handler to update the input value
  value,          // Current value of the input
  isInvalid,      // Flag indicating if the input value is invalid
}) {
  return (
    <View style={styles.inputContainer}>
      {/* Label for the input field */}
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      {/* TextInput field */}
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
