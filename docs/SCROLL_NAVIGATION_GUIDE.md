# Scroll-to-Next-Page Navigation Implementation

## Overview
This implementation adds a smooth page transition effect where scrolling to the bottom of any page automatically navigates to the next page in the sequence.

## How It Works

### Page Sequence
The pages are linked in this order:
1. **Home** (`/`) → scrolls to bottom → goes to **About**
2. **About** (`/about`) → scrolls to bottom → goes to **Projects**
3. **Projects** (`/projects`) → scrolls to bottom → goes to **Research**
4. **Research** (`/research`) → scrolls to bottom → goes to **Technical Skills**
5. **Technical Skills** (`/technicalskills`) → scrolls to bottom → goes to **Contact**
6. **Contact** (`/contact`) → no navigation (last page)

### Hook: `useScrollNavigation`
Located in: `src/hooks/useScrollNavigation.js`

**Parameters:**
- `nextPagePath` (string): The route to navigate to when scrolling reaches the threshold
- `enabled` (boolean, default: true): Enable/disable the navigation
- `triggerPercentage` (number, default: 85): Percentage of page scroll before triggering (0-100)

**Example Usage:**
```javascript
import useScrollNavigation from '../../hooks/useScrollNavigation';

const About = () => {
  // Navigate to /projects when user scrolls to 85% of the page
  useScrollNavigation('/projects', true, 85);
  
  // ... rest of component
};
```

## Features

✅ **Smooth Scrolling**: Uses `window.scrollTo({ behavior: 'smooth' })` for smooth transitions  
✅ **Debounced**: Prevents multiple rapid triggers (500ms debounce)  
✅ **Customizable Threshold**: Change when navigation triggers  
✅ **Toggleable**: Can be disabled per component  
✅ **No Route Changes During Scroll**: Waits for smooth scroll animation (300ms delay)

## Customization

### Change Trigger Percentage
To make it trigger earlier (e.g., at 75% instead of 85%):
```javascript
useScrollNavigation('/projects', true, 75);
```

### Change Page Sequence
Edit the `nextPagePath` in each component:
```javascript
// Current: About → Projects
useScrollNavigation('/projects', true, 85);

// Change to: About → Research (skip Projects)
useScrollNavigation('/research', true, 85);
```

### Disable for Specific Pages
Set `enabled` to `false`:
```javascript
// This page won't auto-navigate
useScrollNavigation(null, false);
```

### Adjust Debounce Delay
Edit `useScrollNavigation.js` to change the `debounceDelay`:
```javascript
const debounceDelay = 1000; // Change from 500ms to 1000ms
```

### Adjust Scroll Animation Delay
Edit `useScrollNavigation.js` to change navigation timing:
```javascript
setTimeout(() => {
  navigate(nextPagePath);
}, 500); // Change from 300ms to 500ms
```

## Implementation Details

### Files Modified
1. `src/components/Home/index.js` - Added hook
2. `src/components/About/index.js` - Added hook
3. `src/components/Projects/index.js` - Added hook
4. `src/components/Research/index.js` - Added hook
5. `src/components/Technicalskills/index.js` - Added hook
6. `src/components/Contact/index.js` - Added hook (disabled)

### Files Created
1. `src/hooks/useScrollNavigation.js` - The custom hook

## User Experience

1. User scrolls down the current page
2. When they reach ~85% down the page, they'll see the smooth scroll animation to the top
3. After 300ms, they're navigated to the next page
4. The new page loads with scroll position at the top
5. Animation completes smoothly

## Technical Details

**Scroll Calculation:**
```javascript
const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
const scrolled = window.scrollY;
const scrollPercentage = (scrolled / scrollableHeight) * 100;
```

**Debounce Logic:**
Prevents navigation from being triggered multiple times within 500ms window.

**Event Cleanup:**
Hook properly removes event listeners on unmount to prevent memory leaks.

## Browser Compatibility
Works in all modern browsers that support:
- ES6 React Hooks
- `window.scrollTo()` with `behavior: 'smooth'`
- Standard DOM APIs

## Testing
To test:
1. Start your dev server
2. Navigate to the Home page
3. Scroll down until you reach near the bottom
4. Should automatically transition to About page
5. Repeat for other pages

## Troubleshooting

**Not triggering navigation?**
- Check if component has the hook imported
- Verify `enabled` parameter is `true`
- Check browser console for errors
- Ensure page height is greater than viewport (scrollable)

**Navigation triggering too early/late?**
- Adjust `triggerPercentage` value
- Try values like 75, 80, 90

**Jittery scrolling?**
- Check for conflicting scroll event listeners
- Increase `debounceDelay` value

## Future Enhancements
- Add keyboard shortcut (e.g., Page Down key)
- Add visual indicator of scroll progress
- Add animation/transition effects
- Add ability to go to previous page (scroll up detection)
- Add skip navigation option
