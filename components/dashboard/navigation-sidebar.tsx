import { MENU_SECTIONS } from '@/constants/navigation-menu';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface NavigationSidebarProps {
  visible: boolean;
  onClose: () => void;
  onMenuItemPress: (itemId: string) => void;
}

/**
 * Navigation sidebar component
 * Slides in from the right with a dark overlay
 * Contains organized menu sections
 */
export function NavigationSidebar({
  visible,
  onClose,
  onMenuItemPress,
}: NavigationSidebarProps) {
  // Animation values
  const slideAnim = useRef(new Animated.Value(300)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Run overlay fade and sidebar slide animations in parallel
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: visible ? 0 : 300,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: visible ? 0.5 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, slideAnim, overlayOpacity]);

  // Don't render anything when not visible
  if (!visible) return null;

  return (
    <>
      {/* Dark overlay - tapping closes the sidebar */}
      <Animated.View
        style={[styles.overlay, { opacity: overlayOpacity }]}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Sidebar panel */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        {/* Close button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="times" size={24} color="#11181C" />
        </TouchableOpacity>

        {/* Menu sections */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => onMenuItemPress(item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItem}>
                  <FontAwesome5
                    name={item.icon}
                    size={18}
                    color="#789F80"
                    solid
                  />
                  <Text style={styles.menuText}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    zIndex: 999,
  },
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#11181C',
    marginTop: 24,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#11181C',
  },
});
