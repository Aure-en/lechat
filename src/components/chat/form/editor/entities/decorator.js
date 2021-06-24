import { CompositeDecorator } from "draft-js";
import { Component as LinkComponent, strategy as linkStrategy } from "./Link";
import { Component as UrlComponent, strategy as UrlStrategy } from "./Url";

const decorator = new CompositeDecorator([
  {
    // Used to insert links
    strategy: linkStrategy,
    component: LinkComponent,
  },
  {
    // Detect urls and create a link from them
    strategy: UrlStrategy,
    component: UrlComponent,
  },
]);

export default decorator;
