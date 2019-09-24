/* eslint-disable */

function loadScript(scriptUrl, scriptElementId, callback) {
  const apiScriptElement = document.getElementById(scriptElementId);
  if (!apiScriptElement) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.id = scriptElementId;
    // script.async = true;
    // script.defer = true;
    // window.testur = callback;
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
}
const loadGapiScript = () => {
  return new Promise(resolve => {
    loadScript('https://apis.google.com/js/api.js', 'gapi-script', () => {
      resolve();
    });
  });
};
export { loadGapiScript };
export default {};
