import { MethodsDbus } from './dbus/methods';
import { MethodsWeb } from './web/methods';

// Modules for type app
export let Methods = undefined;

if (window.isTauri) {
    Methods = MethodsDbus
} else {
    Methods = MethodsWeb
}
