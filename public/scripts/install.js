/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);// CODELAB: Add event listener for beforeinstallprompt event


/**
 * Event handler for beforeinstallprompt event.
 *   Saves the event & shows install button.
 *
 * @param {Event} evt
 */
function saveBeforeInstallPromptEvent(evt) {
  deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');// CODELAB: Add code to save event & show the install button.

}


/**
 * Event handler for butInstall - Does the PWA installation.
 *
 * @param {Event} evt
 */
function installPWA(evt) {
  deferredInstallPrompt.prompt();
// Hide the install button, it can't be called twice.
evt.srcElement.setAttribute('hidden', true);// CODELAB: Add code show install prompt & hide the install button.

  deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });// CODELAB: Log user response to prompt.

}

window.addEventListener('appinstalled', logAppInstalled);// CODELAB: Add event listener for appinstalled event

/**
 * Event handler for appinstalled event.
 *   Log the installation to analytics or save the event somehow.
 *
 * @param {Event} evt
 */
function logAppInstalled(evt) {
  console.log('Weather App was installed.', evt);// CODELAB: Add code to log the event

}
