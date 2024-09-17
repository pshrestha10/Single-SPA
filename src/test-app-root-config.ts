import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();

window.addEventListener('navigate-to', (event: Event) => {
  const customEvent = event as CustomEvent;
  const { path } = customEvent.detail;
  
  if (path) {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  }
});
