import React from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { Typography } from '@/components/ui/typography';

export default function DesignSystemScreen() {
  const { width } = useWindowDimensions();

  return (
    <ScrollView className="flex-1 bg-ios-grouped-bg dark:bg-ios-grouped-bg-dark">
      <View className="p-ios-md">
        {/* Header */}
        <View className="mb-ios-lg">
          <Typography variant="large-title" weight="bold" className="mb-ios-xs">
            Design System
          </Typography>
          <Typography variant="body" color="secondary">
            Apple HIG-compliant components built with NativeWind v4
          </Typography>
        </View>

        {/* Device Info */}
        <Card variant="inset-grouped" className="mb-ios-md">
          <Typography variant="title-3" weight="semibold" className="mb-ios-sm">
            Device Information
          </Typography>
          <View className="gap-ios-xs">
            <Text className="text-ios-body text-ios-secondary-label dark:text-ios-secondary-label-dark">
              <Text className="font-ios-semibold text-ios-label dark:text-ios-label-dark">Screen Width:</Text>{' '}
              {width.toFixed(0)}px
            </Text>
            <Text className="text-ios-body text-ios-secondary-label dark:text-ios-secondary-label-dark">
              <Text className="font-ios-semibold text-ios-label dark:text-ios-label-dark">Typography:</Text> SF Pro
              (Dynamic Type)
            </Text>
            <Text className="text-ios-body text-ios-secondary-label dark:text-ios-secondary-label-dark">
              <Text className="font-ios-semibold text-ios-label dark:text-ios-label-dark">Color System:</Text> iOS
              Semantic Colors
            </Text>
          </View>
        </Card>

        {/* Typography */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            SF Pro Typography
          </Typography>
          <Card variant="inset-grouped" className="gap-ios-sm">
            <Typography variant="large-title" weight="bold">
              Large Title
            </Typography>
            <Typography variant="title-1">Title 1</Typography>
            <Typography variant="title-2">Title 2</Typography>
            <Typography variant="title-3">Title 3</Typography>
            <Typography variant="headline" weight="semibold">
              Headline (Semibold)
            </Typography>
            <Typography variant="body">Body - The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="callout">Callout text for emphasis</Typography>
            <Typography variant="subheadline" color="secondary">
              Subheadline - Secondary information
            </Typography>
            <Typography variant="footnote" color="secondary">
              Footnote - Additional details
            </Typography>
            <Typography variant="caption-1" color="tertiary">
              Caption 1
            </Typography>
            <Typography variant="caption-2" color="tertiary">
              Caption 2
            </Typography>
          </Card>
        </View>

        {/* iOS System Colors */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            iOS System Colors
          </Typography>
          <Card variant="inset-grouped" className="gap-ios-md">
            <View>
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                Primary Colors
              </Typography>
              <View className="flex-row flex-wrap gap-ios-xs">
                <View className="w-12 h-12 bg-ios-blue dark:bg-ios-blue-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-green dark:bg-ios-green-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-indigo dark:bg-ios-indigo-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-orange dark:bg-ios-orange-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-pink dark:bg-ios-pink-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-purple dark:bg-ios-purple-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-red dark:bg-ios-red-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-teal dark:bg-ios-teal-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-yellow dark:bg-ios-yellow-dark rounded-ios-sm" />
              </View>
              <View className="flex-row flex-wrap gap-ios-xs mt-ios-xs">
                <Typography variant="caption-2" color="tertiary">
                  Blue
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Green
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Indigo
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Orange
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Pink
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Purple
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Red
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Teal
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Yellow
                </Typography>
              </View>
            </View>

            <View>
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                Gray Scale
              </Typography>
              <View className="flex-row flex-wrap gap-ios-xs">
                <View className="w-12 h-12 bg-ios-gray dark:bg-ios-gray-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-gray-2 dark:bg-ios-gray-2-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-gray-3 dark:bg-ios-gray-3-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-gray-4 dark:bg-ios-gray-4-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-gray-5 dark:bg-ios-gray-5-dark rounded-ios-sm" />
                <View className="w-12 h-12 bg-ios-gray-6 dark:bg-ios-gray-6-dark rounded-ios-sm" />
              </View>
            </View>
          </Card>
        </View>

        {/* Buttons */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            iOS Buttons
          </Typography>
          <Card variant="inset-grouped" className="gap-ios-sm">
            <Typography variant="headline" weight="semibold" className="mb-ios-xs">
              Button Styles
            </Typography>
            <Button style="filled">Filled Button</Button>
            <Button style="tinted">Tinted Button</Button>
            <Button style="bordered">Bordered Button</Button>
            <Button style="plain">Plain Button</Button>

            <Typography variant="headline" weight="semibold" className="mt-ios-md mb-ios-xs">
              Button Roles
            </Typography>
            <Button style="filled" role="normal">
              Normal
            </Button>
            <Button style="filled" role="destructive">
              Destructive
            </Button>
            <Button style="filled" role="cancel">
              Cancel
            </Button>

            <Typography variant="headline" weight="semibold" className="mt-ios-md mb-ios-xs">
              Button Sizes (44pt minimum touch)
            </Typography>
            <Button size="sm">Small (36pt)</Button>
            <Button size="md">Medium (44pt)</Button>
            <Button size="lg">Large (50pt)</Button>

            <Typography variant="headline" weight="semibold" className="mt-ios-md mb-ios-xs">
              Button States
            </Typography>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </Card>
        </View>

        {/* Badges */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            Badges
          </Typography>
          <Card variant="inset-grouped">
            <View className="flex-row flex-wrap gap-ios-xs">
              <Badge color="blue">Blue</Badge>
              <Badge color="green">Green</Badge>
              <Badge color="red">Red</Badge>
              <Badge color="orange">Orange</Badge>
              <Badge color="purple">Purple</Badge>
              <Badge color="gray">Gray</Badge>
            </View>
          </Card>
        </View>

        {/* Alerts */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            Alerts
          </Typography>
          <View className="gap-ios-sm">
            <Alert type="success" title="Success">
              Your changes have been saved successfully.
            </Alert>
            <Alert type="warning" title="Warning">
              This action cannot be undone. Please proceed with caution.
            </Alert>
            <Alert type="error" title="Error">
              An error occurred while processing your request.
            </Alert>
            <Alert type="info" title="Information">
              This is an informational message with helpful details.
            </Alert>
          </View>
        </View>

        {/* Cards */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            Cards
          </Typography>
          <View className="gap-ios-sm">
            <Card variant="grouped">
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                Grouped Card
              </Typography>
              <Typography variant="subheadline" color="secondary">
                Standard iOS grouped background style
              </Typography>
            </Card>

            <Card variant="inset-grouped">
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                Inset Grouped Card
              </Typography>
              <Typography variant="subheadline" color="secondary">
                iOS inset grouped style with margins
              </Typography>
            </Card>

            <Card variant="plain">
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                Plain Card
              </Typography>
              <Typography variant="subheadline" color="secondary">
                Plain background for minimal designs
              </Typography>
            </Card>
          </View>
        </View>

        {/* Spacing System */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            iOS Spacing System
          </Typography>
          <Card variant="inset-grouped" className="gap-ios-xs">
            <Typography variant="footnote" color="secondary" className="mb-ios-sm">
              Standard iOS spacing values
            </Typography>
            <View className="flex-row items-center gap-ios-sm">
              <View className="w-ios-xs h-4 bg-ios-blue dark:bg-ios-blue-dark rounded-ios-sm" />
              <Typography variant="caption-1" color="secondary">
                xs (4px)
              </Typography>
            </View>
            <View className="flex-row items-center gap-ios-sm">
              <View className="w-ios-sm h-4 bg-ios-blue dark:bg-ios-blue-dark rounded-ios-sm" />
              <Typography variant="caption-1" color="secondary">
                sm (8px)
              </Typography>
            </View>
            <View className="flex-row items-center gap-ios-sm">
              <View className="w-ios-md h-4 bg-ios-blue dark:bg-ios-blue-dark rounded-ios-sm" />
              <Typography variant="caption-1" color="secondary">
                md (16px - iPhone margins)
              </Typography>
            </View>
            <View className="flex-row items-center gap-ios-sm">
              <View className="w-ios-lg h-4 bg-ios-blue dark:bg-ios-blue-dark rounded-ios-sm" />
              <Typography variant="caption-1" color="secondary">
                lg (24px - iPad margins)
              </Typography>
            </View>
            <View className="flex-row items-center gap-ios-sm">
              <View className="w-ios-touch h-4 bg-ios-green dark:bg-ios-green-dark rounded-ios-sm" />
              <Typography variant="caption-1" color="secondary">
                touch (44px - minimum tap target)
              </Typography>
            </View>
          </Card>
        </View>

        {/* Border Radius */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            iOS Border Radius
          </Typography>
          <Card variant="inset-grouped">
            <View className="flex-row flex-wrap gap-ios-sm">
              <View className="w-16 h-16 bg-ios-blue dark:bg-ios-blue-dark rounded-ios-sm" />
              <View className="w-16 h-16 bg-ios-blue dark:bg-ios-blue-dark rounded-ios-md" />
              <View className="w-16 h-16 bg-ios-blue dark:bg-ios-blue-dark rounded-ios-lg" />
              <View className="w-16 h-16 bg-ios-blue dark:bg-ios-blue-dark rounded-ios-xl" />
              <View className="w-16 h-16 bg-ios-blue dark:bg-ios-blue-dark rounded-full" />
            </View>
            <View className="flex-row flex-wrap gap-ios-sm mt-ios-xs">
              <Typography variant="caption-2" color="tertiary">
                sm (8px)
              </Typography>
              <Typography variant="caption-2" color="tertiary">
                md (10px)
              </Typography>
              <Typography variant="caption-2" color="tertiary">
                lg (12px)
              </Typography>
              <Typography variant="caption-2" color="tertiary">
                xl (16px)
              </Typography>
              <Typography variant="caption-2" color="tertiary">
                full
              </Typography>
            </View>
          </Card>
        </View>

        {/* HIG Compliance */}
        <View className="mb-ios-xl">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            Apple HIG Compliance
          </Typography>
          <Alert type="info">
            This design system follows Apple's Human Interface Guidelines including semantic colors, SF Pro typography,
            44pt minimum touch targets, and iOS-native spacing patterns. All components automatically adapt to Dark Mode.
          </Alert>
        </View>
      </View>
    </ScrollView>
  );
}
