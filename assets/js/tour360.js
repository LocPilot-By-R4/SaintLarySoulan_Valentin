import { Viewer } from '@photo-sphere-viewer/core';

const viewerElement = document.querySelector('[data-tour-viewer]');
const stage = document.querySelector('[data-tour-stage]');
const modal = document.getElementById('tour-modal');

if (viewerElement && stage && modal) {
  let viewer = null;
  let pendingScene = null;

  const activeScene = () => {
    const button =
      document.querySelector('.tour-thumb.is-active[data-tour-scene]') ||
      document.querySelector('.tour-preview-thumb.is-active[data-tour-scene]') ||
      document.querySelector('[data-tour-scene]');
    return button ? {
      panorama: button.dataset.panorama || '',
      label: button.dataset.label || ''
    } : null;
  };

  const loadScene = async (scene) => {
    if (!scene?.panorama) return;
    pendingScene = scene;

    if (!viewer) {
      viewer = new Viewer({
        container: viewerElement,
        panorama: scene.panorama
      });

      viewer.addEventListener('ready', () => {
        stage.classList.add('is-viewer-ready');
      });
      return;
    }

    try {
      await viewer.setPanorama(scene.panorama);
    } catch (error) {
      console.warn('LocPilot 360°: panorama loading error', error);
    }
  };

  document.addEventListener('locpilot:tourSceneChange', (event) => {
    pendingScene = event.detail;
    if (modal.classList.contains('open') && viewer) {
      loadScene(event.detail);
    }
  });

  const initOnOpen = () => {
    const scene = pendingScene || activeScene();
    requestAnimationFrame(() => loadScene(scene));
  };

  document.querySelectorAll('[data-modal="tour-modal"], [data-open-tour]').forEach((button) => {
    button.addEventListener('click', initOnOpen);
  });
}
