import React from "react";
import { strategy as UrlStrategy } from "../form/editor/entities/Url";
import Bold from "./Bold";
import Italic from "./Italic";
import Strikethrough from "./Strikethrough";
import Underline from "./Underline";
import Code from "./Code";
import Unordered from "./Unordered";
import Ordered from "./Ordered";
import Quote from "./Quote";
import Link from "./Link";
import Spoiler from "./Spoiler";

// just a helper to add a <br /> after a block
const addBreaklines = (children) => children.map((child) => [child, <br />]);

/**
 * Define the renderers
 */
const renderers = {
  /**
   * Those callbacks will be called recursively to render a nested structure
   */
  inline: {
    // The key passed here is just an index based on rendering order inside a block
    BOLD: (children, { key }) => <Bold key={key}>{children}</Bold>,
    ITALIC: (children, { key }) => <Italic key={key}>{children}</Italic>,
    UNDERLINE: (children, { key }) => (
      <Underline key={key}>{children}</Underline>
    ),
    CODE: (children, { key }) => <span key={key}>{children}</span>,
    STRIKETHROUGH: (children, { key }) => (
      <Strikethrough key={key}>{children}</Strikethrough>
    ),
    SPOILER: (children, { key }) => <Spoiler key={key}>{children}</Spoiler>,
  },
  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
    unstyled: (children) => children.map((child) => <>{child}</>),
    blockquote: (children) => <Quote>{addBreaklines(children)}</Quote>,
    // You can also access the original keys of the blocks
    "code-block": (children, { keys }) => (
      <Code key={keys[0]}>{addBreaklines(children)}</Code>
    ),
    // or depth for nested lists
    "unordered-list-item": (children, { depth, keys }) => (
      <Unordered
        key={keys[keys.length - 1]}
        id={keys[keys.length - 1]}
        depth={depth}
      >
        {children}
      </Unordered>
    ),
    "ordered-list-item": (children, { depth, keys }) => (
      <Ordered key={keys.join("|")} id={keys.join("|")} depth={depth}>
        {children}
      </Ordered>
    ),
  },
  /**
   * Entities receive children and the entity data
   */
  entities: {
    // key is the entity key value from raw
    LINK: (children, data, { key }) => (
      <Link key={key} href={data}>
        {children}
      </Link>
    ),
  },
  /**
   * Array of decorators,
   * Entities receive children and the entity data,
   * inspired by https://facebook.github.io/draft-js/docs/advanced-topics-decorators.html
   * it's also possible to pass a custom Decorator class that matches the [DraftDecoratorType](https://github.com/facebook/draft-js/blob/master/src/model/decorators/DraftDecoratorType.js)
   */
  decorators: [
    {
      // strategy only receives first two arguments, contentState is yet not provided
      strategy: UrlStrategy,
      // component - a callback as with other renderers
      // decoratedText a plain string matched by the strategy
      // if your decorator depends on draft-js contentState you need to provide convertFromRaw in redraft options
      component: ({ children, decoratedText }) => (
        <Link href={decoratedText}>{children}</Link>
      ),
    },
  ],
};

export default renderers;
