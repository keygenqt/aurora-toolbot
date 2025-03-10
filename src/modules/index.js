import { MethodsDbus } from './dbus/methods';
import { MethodsWeb } from './web/methods';

// Modules for type app
export let Methods = undefined;

// Add check is open mini-app
window.isMiniApp = window.Telegram.WebApp.initData !== '';

if (window.isTauri) {
    Methods = MethodsDbus
} else {
    Methods = MethodsWeb
}
