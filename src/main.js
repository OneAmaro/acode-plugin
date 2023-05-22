import plugin from '../plugin.json';

class AcodePlugin {
  async init() {
    // Initialization logic goes here
function changeFontSize() {
  let presets = [10, 12, 14, 16]; // Initial preset numbers

  const currentFontSize = document.body.style.fontSize || '16px';
  const scale = parseFloat(window.prompt(`Current font size: ${currentFontSize}\nEnter the font size scale:`));

  if (!isNaN(scale)) {
    const newFontSize = `${scale * 16}px`; // Assuming 16px as the base font size

    const updatePresets = window.confirm(`Change font size to ${newFontSize}?\nUpdate presets?`);

    if (updatePresets) {
      const modifyPresets = window.confirm('Do you want to modify the presets?');

      if (modifyPresets) {
        const addOrRemove = window.prompt('Add or remove from presets? (a/r)');

        if (addOrRemove === 'a') {
          const presetNumber = parseFloat(window.prompt('Enter the number to add to presets:'));
          if (!isNaN(presetNumber)) {
            presets = [...presets, presetNumber];
          }
        } else if (addOrRemove === 'r') {
          const indexToRemove = parseFloat(window.prompt('Enter the index of the preset number to remove:'));
          if (!isNaN(indexToRemove) && indexToRemove >= 0 && indexToRemove < presets.length) {
            presets = presets.filter((_, index) => index !== indexToRemove);
          }
        }
      }
    }

    document.body.style.fontSize = newFontSize;
    console.log('Updated font size:', newFontSize);
    console.log('Presets:', presets);
  } else {
    console.log('Invalid scale entered.');
  }
}

// Check if the command to run the function is given
if (process.argv[2] === 'changeFontSize') {
  changeFontSize();
}

  }

  async destroy() {
    // Cleanup logic goes here
  }
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(plugin.id, (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    acodePlugin.baseUrl = baseUrl;
    acodePlugin.init($page, cacheFile, cacheFileUrl);
  });
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}
