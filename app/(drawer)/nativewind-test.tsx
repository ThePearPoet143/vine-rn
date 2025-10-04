import { View, Text, ScrollView, Pressable } from 'react-native';

export default function NativeWindTest() {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          NativeWind Test
        </Text>

        <Text className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Testing Tailwind CSS utility classes in React Native
        </Text>

        {/* Color Test */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Colors
          </Text>
          <View className="flex-row gap-2 flex-wrap">
            <View className="w-16 h-16 bg-red-500 rounded-lg" />
            <View className="w-16 h-16 bg-blue-500 rounded-lg" />
            <View className="w-16 h-16 bg-green-500 rounded-lg" />
            <View className="w-16 h-16 bg-yellow-500 rounded-lg" />
            <View className="w-16 h-16 bg-purple-500 rounded-lg" />
          </View>
        </View>

        {/* Typography Test */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Typography
          </Text>
          <Text className="text-xs text-gray-600 dark:text-gray-400">Extra Small Text</Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">Small Text</Text>
          <Text className="text-base text-gray-600 dark:text-gray-400">Base Text</Text>
          <Text className="text-lg text-gray-600 dark:text-gray-400">Large Text</Text>
          <Text className="text-xl text-gray-600 dark:text-gray-400">Extra Large Text</Text>
          <Text className="text-2xl text-gray-600 dark:text-gray-400">2XL Text</Text>
        </View>

        {/* Spacing Test */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Spacing & Layout
          </Text>
          <View className="gap-2">
            <View className="p-2 bg-blue-100 dark:bg-blue-900 rounded">
              <Text className="text-blue-900 dark:text-blue-100">Padding 2</Text>
            </View>
            <View className="p-4 bg-green-100 dark:bg-green-900 rounded">
              <Text className="text-green-900 dark:text-green-100">Padding 4</Text>
            </View>
            <View className="p-6 bg-purple-100 dark:bg-purple-900 rounded">
              <Text className="text-purple-900 dark:text-purple-100">Padding 6</Text>
            </View>
          </View>
        </View>

        {/* Border & Rounded */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Borders & Rounded
          </Text>
          <View className="gap-2">
            <View className="p-4 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800">
              <Text className="text-gray-900 dark:text-white">Rounded Small</Text>
            </View>
            <View className="p-4 border-2 border-blue-500 rounded-lg bg-white dark:bg-gray-800">
              <Text className="text-gray-900 dark:text-white">Rounded Large</Text>
            </View>
            <View className="p-4 border-4 border-green-500 rounded-full bg-white dark:bg-gray-800">
              <Text className="text-gray-900 dark:text-white text-center">Rounded Full</Text>
            </View>
          </View>
        </View>

        {/* Flexbox Test */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Flexbox
          </Text>
          <View className="flex-row justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-2">
            <Text className="text-gray-900 dark:text-white">Left</Text>
            <Text className="text-gray-900 dark:text-white">Center</Text>
            <Text className="text-gray-900 dark:text-white">Right</Text>
          </View>
          <View className="flex-row justify-center items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <View className="w-12 h-12 bg-blue-500 rounded" />
            <View className="w-12 h-12 bg-green-500 rounded" />
            <View className="w-12 h-12 bg-red-500 rounded" />
          </View>
        </View>

        {/* Button Test */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Buttons (Pressable)
          </Text>
          <View className="gap-2">
            <Pressable className="bg-blue-500 active:bg-blue-600 p-4 rounded-lg">
              <Text className="text-white text-center font-semibold">Primary Button</Text>
            </Pressable>
            <Pressable className="bg-green-500 active:bg-green-600 p-4 rounded-lg">
              <Text className="text-white text-center font-semibold">Success Button</Text>
            </Pressable>
            <Pressable className="border-2 border-blue-500 active:bg-blue-50 dark:active:bg-blue-950 p-4 rounded-lg">
              <Text className="text-blue-500 text-center font-semibold">Outline Button</Text>
            </Pressable>
          </View>
        </View>

        {/* Shadow Test */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Shadows
          </Text>
          <View className="gap-4">
            <View className="p-4 bg-white shadow-sm rounded-lg">
              <Text className="text-gray-900">Shadow Small</Text>
            </View>
            <View className="p-4 bg-white shadow-md rounded-lg">
              <Text className="text-gray-900">Shadow Medium</Text>
            </View>
            <View className="p-4 bg-white shadow-lg rounded-lg">
              <Text className="text-gray-900">Shadow Large</Text>
            </View>
          </View>
        </View>

        {/* Card Example */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Card Component Example
          </Text>
          <View className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Card Title
            </Text>
            <Text className="text-gray-600 dark:text-gray-300 mb-4">
              This is a card component built entirely with NativeWind Tailwind classes. No StyleSheet needed!
            </Text>
            <View className="flex-row gap-2">
              <Pressable className="flex-1 bg-blue-500 active:bg-blue-600 p-3 rounded-lg">
                <Text className="text-white text-center font-semibold">Action 1</Text>
              </Pressable>
              <Pressable className="flex-1 bg-gray-200 dark:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 p-3 rounded-lg">
                <Text className="text-gray-900 dark:text-white text-center font-semibold">Action 2</Text>
              </Pressable>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}
