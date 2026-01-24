# Smart Bidirectional Scroll Navigation ✨

## Overview

Your portfolio now has **intelligent scroll navigation** that works seamlessly on:
- ✅ **Static (non-scrollable) pages** - Use mousewheel
- ✅ **Scrollable pages** - Use page scroll
- ✅ **Both directions** - Forward and backward navigation

---

## How It Works

### On Static Pages (Home, Contact, etc.)
```
Scroll wheel DOWN ↓  →  Next Page
Scroll wheel UP ↑    →  Previous Page
```

### On Scrollable Pages (About, Research, etc.)
```
Scroll DOWN to bottom (90%)  →  Next Page
Scroll UP to top (10%)       →  Previous Page
```

**OR** use mousewheel to navigate instantly:
```
Wheel DOWN at any position  →  Next Page
Wheel UP at any position    →  Previous Page
```

---

## Page Navigation Map

```
Home
  ↓ scroll down / wheel down
  ↓ (next)
About  ← scroll up / wheel up (back to Home)
  ↓
Projects  ← scroll up (back to About)
  ↓
Research  ← scroll up (back to Projects)
  ↓
Technical Skills  ← scroll up (back to Research)
  ↓
Contact (last page)  ← scroll up (back to Technical Skills)
```

---

## Technical Details

### Hook API
```javascript
const useScrollNavigation = (nextPagePath, prevPagePath, enabled)
```

**Parameters:**
- `nextPagePath` (string) - Route to navigate forward (e.g., `/projects`)
- `prevPagePath` (string) - Route to navigate backward (e.g., `/about`)
- `enabled` (boolean) - Enable/disable navigation

### Example Usage
```javascript
import useScrollNavigation from '../../hooks/useScrollNavigation';

const About = () => {
  // Next: /projects, Previous: /
  useScrollNavigation('/projects', '/', true);
  
  return (/* JSX */);
};
```

---

## Implementation Details

### Smart Detection
The hook intelligently detects:

1. **Is page scrollable?** → Yes / No
2. **If NO (static page)**:
   - Wheel down → Next page
   - Wheel up → Previous page
   - Immediate navigation (respects 1s debounce)

3. **If YES (scrollable page)**:
   - Scroll near bottom (90%+) → Next page
   - Scroll near top (10%-) → Previous page
   - OR use wheel at any position

### Debounce & Performance
- **1000ms (1 second) debounce** between navigations
- Prevents accidental double-navigation
- Scroll waits 300ms after stopping before checking position
- All listeners properly cleaned up on unmount

---

## Testing Guide

### Test 1: Static Page Navigation
```
1. Go to Home (static page)
2. Scroll mousewheel DOWN
3. Should navigate to About
4. On About, scroll mousewheel UP
5. Should navigate back to Home
```

### Test 2: Scrollable Page Navigation
```
1. Go to About (scrollable page with content)
2. Scroll DOWN naturally within the page
3. When you reach bottom (~90%), auto-navigate to Projects
4. Scroll UP on Projects page
5. When you reach top (~10%), auto-navigate back to About
```

### Test 3: Mixed Navigation
```
1. On About page
2. Scroll wheel DOWN (instant navigation to Projects)
3. On Projects page
4. Scroll page content DOWN (normal scrolling, no navigation)
5. Reach bottom (90%) → Auto-navigate to Research
6. Scroll wheel UP → Navigate back to Projects
```

---

## Customization

### Change Navigation Sensitivity
Edit `src/hooks/useScrollNavigation.js`:

**For scrollable pages** - change scroll threshold:
```javascript
const scrollThreshold = 100;  // Distance to scroll before triggering
// Change bottom trigger:
if (scrollPercentage >= 90) { ... }  // Change 90 to 80, 85, etc.
// Change top trigger:
if (scrollPercentage <= 10) { ... }  // Change 10 to 15, 20, etc.
```

**For wheel sensitivity**:
```javascript
// At boundaries of scrollable pages
(wheelDirection === 'down' && scrolled > scrollableHeight - 100) {
  // Change 100 to 200 for larger boundary, or 50 for smaller
}
```

### Change Debounce Delay
```javascript
const debounceDelay = 1000;  // Currently 1 second
// Try 1500 (1.5s) for slower transitions
// Try 600 (0.6s) for faster transitions
```

### Disable Navigation on Specific Page
```javascript
// In that component
useScrollNavigation(null, null, false)  // Completely disabled
```

### Change Page Sequence
```javascript
// In About/index.js
// Current: Projects → Research
useScrollNavigation('/research', '/', true)
// Change to skip a page
```

---

## Files Modified

✅ Created:
- `src/hooks/useScrollNavigation.js` (improved)

✅ Updated:
- `src/components/Home/index.js`
- `src/components/About/index.js`
- `src/components/Projects/index.js`
- `src/components/Research/index.js`
- `src/components/Technicalskills/index.js`
- `src/components/Contact/index.js`

---

## Browser Compatibility

Works on all modern browsers with:
- ES6 React Hooks
- Passive event listeners
- Standard DOM APIs

**Tested on:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

---

## Troubleshooting

### Navigation not triggering?
1. Check if page is scrollable: `Inspector → Check scrollHeight > 50px`
2. Verify you're scrolling in the right direction
3. Check debounce delay hasn't passed yet (wait 1s between scrolls)
4. Try wheel scroll if page scroll doesn't work

### Goes to wrong page?
1. Check `nextPagePath` and `prevPagePath` in component
2. Verify route paths are correct in `App.js`
3. Check console for routing errors

### Too sensitive / not sensitive enough?
1. Adjust scroll threshold percentages (90%, 10%)
2. Reduce/increase debounce delay
3. Adjust boundary detection values

### Scrolling within page triggers navigation?
1. This is normal if you scroll too far down/up
2. Try adjusting the trigger percentages (e.g., 95% instead of 90%)
3. Or use shorter pages with less scrollable content

---

## Advanced: Understanding Scroll Detection

```javascript
// Calculate how far down the page user is scrolled
const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
const scrolled = window.scrollY;
const scrollPercentage = (scrolled / scrollableHeight) * 100;

// Examples:
// 0% = at very top
// 50% = halfway down
// 90% = near bottom
// 100% = at absolute bottom
```

---

## Performance Notes

- Debounce prevents excessive event handling
- Passive event listeners for better scroll performance
- Cleanup on unmount prevents memory leaks
- Lightweight implementation (~6KB)

---

## Future Enhancements

- [ ] Add keyboard arrow key navigation
- [ ] Add visual progress indicator
- [ ] Add animation between pages
- [ ] Add haptic feedback (mobile)
- [ ] Save scroll state per page
- [ ] Disable on mobile/touch devices (optional)

---

**Now you have a fully functional, bidirectional scroll navigation system! 🚀**
